import React, { useState, useEffect } from 'react';
import { Shield, UserCheck, Eye, AlertTriangle, MessageSquare, Ban } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doSignInWithGoogle } from "../firebase/auth";
import { auth } from "../firebase/firebase";



export default function Terms() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleRandomChat = () => {
    toast.error('Please sign in first', {
      style: {
        background: '#1e1b4b',
        color: '#e9d5ff',
        border: '1px solid rgba(139, 92, 246, 0.1)',
      },
      iconTheme: {
        primary: '#f43f5e',
        secondary: '#e9d5ff',
      },
    });
  };

  const handleAgree = () => {
    if (user) {
      navigate('/Landing');
    } else {
      handleRandomChat();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 text-gray-200">
      <ToastContainer position="top-center" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 mb-8">
            Terms & Conditions
          </h1>
          
          <div className="space-y-8">
            <section className="bg-slate-900/50 p-6 rounded-2xl border border-violet-500/10">
              <p className="text-lg leading-relaxed">
                Welcome to VibeMeet! By using our service, you agree to these terms and conditions. 
                Please read them carefully before using the platform.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-violet-500/10 hover:bg-slate-800/50 transition-all duration-200">
                <Shield className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold text-violet-200 mb-2">Privacy & Security</h3>
                <p className="text-gray-400">We prioritize your privacy and implement strong security measures to protect your data.</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-2xl border border-violet-500/10 hover:bg-slate-800/50 transition-all duration-200">
                <UserCheck className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold text-violet-200 mb-2">User Conduct</h3>
                <p className="text-gray-400">Users must be 18+ and agree to follow our community guidelines.</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-2xl border border-violet-500/10 hover:bg-slate-800/50 transition-all duration-200">
                <Eye className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold text-violet-200 mb-2">Monitoring</h3>
                <p className="text-gray-400">Chats may be monitored for safety and compliance with our guidelines.</p>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-2xl border border-violet-500/10 hover:bg-slate-800/50 transition-all duration-200">
                <MessageSquare className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold text-violet-200 mb-2">Content Rights</h3>
                <p className="text-gray-400">You retain rights to your content while granting us license to use it on the platform.</p>
              </div>
            </div>

            <section className="bg-slate-900/50 p-6 rounded-2xl border border-violet-500/10">
              <div className="flex items-center mb-4">
                <Ban className="w-8 h-8 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-red-200">Prohibited Activities</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Harassment or bullying of any kind</li>
                <li>Sharing explicit or inappropriate content</li>
                <li>Impersonating others or creating fake accounts</li>
                <li>Spam or commercial solicitation</li>
                <li>Sharing personal information of others</li>
                <li>Any illegal activities or content</li>
              </ul>
            </section>

            <section className="bg-red-950/20 p-6 rounded-2xl border border-red-500/10">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-red-200">Important Notice</h2>
              </div>
              <p className="text-gray-300">
                Violation of these terms may result in immediate account termination. 
                We reserve the right to report any illegal activities to relevant authorities.
              </p>
            </section>

            <div className="text-center pt-8">
              <button 
                className="px-8 py-4 text-xl font-semibold rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-violet-500/20"
                onClick={handleAgree}
              >
                I Agree to Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
