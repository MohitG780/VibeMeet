import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Corrected: Using react-router-dom for React projects
import { Toaster, toast } from "react-hot-toast";
import { doSignInWithGoogle } from "../firebase/auth";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth"; // ✅ Correct import of User type

export const Hero: React.FC = () => {
  const router = useNavigate(); // ✅ Using react-router-dom's useNavigate
  const [user, setUser] = useState<User | null>(null); // ✅ Explicitly type `user`

  // ✅ Check Firebase authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // ✅ Clean up on unmount
  }, []);

  const handleRandomChat = () => {
    if (!user) {
      toast.error("Please sign in first", {
        style: {
          background: "#1e1b4b",
          color: "#e9d5ff",
          border: "1px solid rgba(139, 92, 246, 0.1)",
        },
        iconTheme: {
          primary: "#f43f5e",
          secondary: "#e9d5ff",
        },
      });
      return;
    }
    router("/terms"); // ✅ Corrected navigation for React Router
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully!");
      })
      .catch((error: Error) => {
        toast.error(`Error signing out: ${error.message}`);
      });
  };

  const googleSignIn = () => {
    doSignInWithGoogle()
      .then(() => {
        toast.success("Signed in with Google!");
      })
      .catch((error: Error) => {
        toast.error(`Error signing in with Google: ${error.message}`);
      });
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
      <Toaster position="top-center" />
      <h1 className="text-6xl md:text-7xl font-bold leading-tight max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
        Connect with people around the world{" "}
        <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 leading-tight">
          instantly
        </span>
      </h1>
      <p className="text-xl mt-6 max-w-2xl text-gray-300">
        Meet new friends, practice languages, or just have fun conversations with people from different cultures.
      </p>
      <div className="mt-12 flex flex-wrap gap-4">
        <button
          className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors text-lg"
          onClick={handleRandomChat}
        >
          Start Random Chat
        </button>
        <button
          className="border border-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors text-lg"
          onClick={() => router("/Learnmore")} // ✅ Corrected navigation
        >
          Learn More
        </button>
      </div>
    </div>
  );
};
