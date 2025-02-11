"use client";

import { useState } from "react";
import { useUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleLogin = async () => {
    if (!name.trim()) return;

    // Simulating API login (In real case, fetch from DB)
    const userData = { id: Date.now(), name };

    setUser(userData); // ✅ Store user in Zustand
    router.push("/dashboard"); // ✅ Redirect to dashboard
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="border p-2 mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </div>
  );
}
