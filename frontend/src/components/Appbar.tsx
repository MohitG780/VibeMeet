import { useEffect, useState } from "react";

import { Video } from "lucide-react";
import { PrimaryButton } from "./Button";
import { doSignInWithGoogle, doSignOut } from "../firebase/auth";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export const Appbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="relative z-10 px-6 py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Video className="w-8 h-8" aria-label="Vibemeet Logo" />
          <span className="text-2xl font-bold">Vibemeet</span>
        </div>

        <PrimaryButton onClick={user ? doSignOut : doSignInWithGoogle}>
          {user ? "Logout" : "Sign In"}
        </PrimaryButton>
      </div>
    </nav>
  );
};
