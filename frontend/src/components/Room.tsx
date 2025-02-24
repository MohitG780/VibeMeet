import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { Video, VideoOff, Mic, MicOff, PhoneOff } from "lucide-react";

const URL = "http://localhost:3000";

export const Room = ({
  name,
  localAudioTrack,
  localVideoTrack
}: {
  name: string,
  localAudioTrack: MediaStreamTrack,
  localVideoTrack: MediaStreamTrack
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lobby, setLobby] = useState(true);
  const [socket, setSocket] = useState<null | Socket>(null);
  const [sendingPc, setSendingPc] = useState<null | RTCPeerConnection>(null);
  const [receivingPc, setReceivingPc] = useState<null | RTCPeerConnection>(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const remoteVideoRef = useRef<HTMLVideoElement | undefined>();
  const localVideoRef = useRef<HTMLVideoElement>();

  const toggleAudio = () => {
    if (localAudioTrack) {
      localAudioTrack.enabled = !localAudioTrack.enabled;
      setIsAudioEnabled(localAudioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
      localVideoTrack.enabled = !localVideoTrack.enabled;
      setIsVideoEnabled(localVideoTrack.enabled);
    }
  };

  const handleLeaveCall = () => {
    // Clean up tracks
    if (localAudioTrack) localAudioTrack.stop();
    if (localVideoTrack) localVideoTrack.stop();
    if (remoteAudioTrack) remoteAudioTrack.stop();
    if (remoteVideoTrack) remoteVideoTrack.stop();

    // Close peer connections
    if (sendingPc) {
      sendingPc.close();
      setSendingPc(null);
    }
    if (receivingPc) {
      receivingPc.close();
      setReceivingPc(null);
    }

    // Disconnect socket
    if (socket) {
      socket.disconnect();
    }

    // Redirect to home
    window.location.href = '/';
  };

  useEffect(() => {
    const socket = io(URL);
    socket.on('send-offer', ({ roomId }) => {
      console.log("sending offer")
      setLobby(false);
      const pc = new RTCPeerConnection();
      window.pcs = pc;
      if (localVideoTrack) {
        pc.addTrack(localVideoTrack);
      }
      if (localAudioTrack) {
        pc.addTrack(localAudioTrack);
      }
      setSendingPc(pc);

      pc.onicecandidate = async (e) => {
        console.log("receiving ice candidate locally")
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "sender",
            roomId
          })
        }
      }

      pc.onnegotiationneeded = async () => {
        console.log("on negotiation needed,sending offer")
        const sdp = await pc.createOffer();
        pc.setLocalDescription(sdp)
        socket.emit("offer", {
          sdp,
          roomId
        });
      }
    });

    socket.on('offer', async ({ roomId, sdp: remoteSdp }) => {
      console.log("received offer")
      setLobby(false);
      const pc = new RTCPeerConnection();
      pc.setRemoteDescription(remoteSdp)
      const sdp = await pc.createAnswer();
      pc.setLocalDescription(sdp)
      const stream = new MediaStream();
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
      window.pcr = pc;
      setRemoteMediaStream(stream);
      setReceivingPc(pc);

      pc.onicecandidate = async (e) => {
        if (!e.candidate) {
          return;
        }
        console.log("on ice candidate on receiving sender")
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "receiver",
            roomId
          })
        }
      }

      pc.onconnectionstatechange = (e) => {
        console.error(e);
        console.log(pc.iceConnectionState)
      }

      socket.emit("answer", {
        roomId,
        sdp: sdp
      });

      setTimeout(() => {
        const track1 = pc.getTransceivers()[0].receiver.track;
        const track2 = pc.getTransceivers()[1].receiver.track;

        console.log(track1);
        if (track1.kind == "video") {
          setRemoteAudioTrack(track1);
          setRemoteVideoTrack(track2);
        } else {
          setRemoteAudioTrack(track1);
          setRemoteVideoTrack(track2);
        }
        remoteVideoRef.current.srcObject.addTrack(track1);
        remoteVideoRef.current.srcObject.addTrack(track2);
        remoteVideoRef.current.play();
      }, 5000)
    });

    socket.on('answer', ({ roomId, sdp: remoteSdp }) => {
      setLobby(false);
      setSendingPc(pc => {
        pc?.setRemoteDescription(remoteSdp)
        return pc;
      });
      console.log("loop closed");
    })

    socket.on("lobby", () => {
      setLobby(true);
    })

    socket.on("add-ice-candidate", ({ candidate, type }) => {
      console.log("add ice candidate from remote");
      console.log({ candidate, type });
      if (type == "sender") {
        setReceivingPc(pc => {
          pc?.addIceCandidate(candidate)
          return pc;
        })
      } else {
        setSendingPc(pc => {
          pc?.addIceCandidate(candidate)
          return pc;
        })
      }
    })
    setSocket(socket)
  }, [name])

  useEffect(() => {
    if (localVideoRef.current) {
      if (localVideoTrack) {
        localVideoRef.current.srcObject = new MediaStream([localVideoTrack]);
        localVideoRef.current.play();
      }
    }
  }, [localVideoRef])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-semibold">{name[0].toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-white font-semibold">{name}</h1>
              <p className="text-gray-400 text-sm">
                {lobby ? "Waiting for someone to join..." : "Connected"}
              </p>
            </div>
          </div>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            onClick={handleLeaveCall}
          >
            <PhoneOff className="w-4 h-4" />
            Leave Call
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Local Video */}
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover mirror ${!isVideoEnabled ? 'hidden' : ''}`}
              />
              {!isVideoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-2xl text-white font-semibold">{name[0].toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button 
                onClick={toggleAudio}
                className={`p-2 rounded-lg transition-colors ${isAudioEnabled ? 'bg-gray-900/80 hover:bg-gray-700/80' : 'bg-red-500/80 hover:bg-red-600/80'}`}
              >
                {isAudioEnabled ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
              </button>
              <button 
                onClick={toggleVideo}
                className={`p-2 rounded-lg transition-colors ${isVideoEnabled ? 'bg-gray-900/80 hover:bg-gray-700/80' : 'bg-red-500/80 hover:bg-red-600/80'}`}
              >
                {isVideoEnabled ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
              </button>
            </div>
            <div className="absolute top-4 left-4 bg-gray-900/80 px-3 py-1 rounded-lg">
              <p className="text-white text-sm">You</p>
            </div>
          </div>

          {/* Remote Video */}
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              {lobby ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-pulse bg-indigo-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white">Waiting for someone to join...</p>
                  </div>
                </div>
              ) : (
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {!lobby && (
              <>
                
                  
                <div className="absolute top-4 left-4 bg-gray-900/80 px-3 py-1 rounded-lg">
                  <p className="text-white text-sm">Remote User</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Connection Status */}
        {lobby && (
          <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              <p className="text-indigo-300">Waiting to connect you with someone...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};