"use client"

import { useEffect, useRef, useState } from "react"

import { Room } from "./Room"

export const Landing = () => {
  const [name, setName] = useState("")
  const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null)
  const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)

  const [joined, setJoined] = useState(false)

  const getCam = async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      const audioTrack = stream.getAudioTracks()[0]
      const videoTrack = stream.getVideoTracks()[0]
      setLocalAudioTrack(audioTrack)
      setlocalVideoTrack(videoTrack)
      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play()
      }
      setError(null)
    } catch (err) {
      console.error("Error accessing media devices:", err)
      setError("Failed to access camera and microphone. Please check your permissions.")
    }
  }

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam()
    }
  }, [videoRef])

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome to VibeMeet</h1>
          <div className="mb-4">
            <video autoPlay muted ref={videoRef} className="w-[400px] h-[300px] bg-black rounded-lg"></video>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md mb-4"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button
            onClick={() => {
              if (name.trim()) {
                setJoined(true)
              } else {
                setError("Please enter your name")
              }
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Join
          </button>
        </div>
      </div>
    )
  }

  return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}

