import { useNavigate } from "react-router-dom"
import { ArrowLeft, Shield, Video, Heart, Users, Globe } from 'lucide-react';
import { Toaster, toast } from "react-hot-toast"
import { useAuthState } from "react-firebase-hooks/auth"
import { doSignInWithGoogle } from "../firebase/auth";
import { auth } from "../firebase/firebase";

export function LearnMore() {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const handleRandomChat = async () => {
    if (user) {
      navigate("/terms")
    } else {
      try {
        await doSignInWithGoogle()
        navigate("/terms")
      } catch (error) {
        toast.error("Failed to sign in. Please try again.", {
          style: {
            background: "#1e1b4b",
            color: "#e9d5ff",
            border: "1px solid rgba(139, 92, 246, 0.1)",
          },
          iconTheme: {
            primary: "#f43f5e",
            secondary: "#e9d5ff",
          },
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#ECEFFD]">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigate("/")} className="flex items-center text-blue-600 hover:text-indigo-700 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 leading-tight">Connect with People Worldwide</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            VibeMeet brings people together through meaningful conversations and genuine connections.
            Discover new friendships and perspectives from around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-6">
              <Video className="h-7 w-7 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold mb-4">High-Quality Video Chat</h2>
            <p className="text-gray-600">
              Crystal clear video and audio quality ensures smooth conversations with people from anywhere in the world.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-14 h-14 bg-rose-100 rounded-full mb-6">
              <Shield className="h-7 w-7 text-rose-600" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Safe and Secure</h2>
            <p className="text-gray-600">
              Advanced safety features and moderation tools keep our community safe and welcoming for everyone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-6">
              <Globe className="h-7 w-7 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Global Community</h2>
            <p className="text-gray-600">
              Connect with people from different cultures and backgrounds, expanding your worldview.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Why Choose VibeMeet?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Genuine Connections</h3>
                    <p className="mt-2 text-gray-600">Our matching algorithm connects you with people who share your interests and values.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Active Community</h3>
                    <p className="mt-2 text-gray-600">Join millions of users worldwide who are ready to chat, share, and connect.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="People connecting online"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>


        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Start Meeting New People?</h2>
          <button
            onClick={handleRandomChat}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Start Chatting Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default LearnMore

