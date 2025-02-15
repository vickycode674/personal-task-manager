"use client";

import Link from "next/link";
import { useUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const user = useUserStore((state) => state.user); // 🔥 Get user from Zustand
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleLogout = () => {
    console.log("User in Header:==================", user);
    setUser(null); // ✅ Remove user from Zustand
    router.push("/frontend/login"); // ✅ Redirect to login page
  };


  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">My App</h1>
      <div>
  {!user ? (
    <>
      <Link href="/frontend/signup" className="mr-4 hover:underline">Sign Up</Link>
      <Link href="/frontend/login" className="hover:underline">Login</Link>
    </>
  ) : (
    <>
    <p>Welcome {user.name}</p>
      <Link href="/" className="mr-4 hover:underline">Home</Link> {/* ✅ Home link */}
      <Link href="/page1" className="mr-4 hover:underline">Page 1</Link> {/* ✅ Additional page link */}
      <Link href="/page2" className="mr-4 hover:underline">Page 2</Link> {/* ✅ Another page link */}
      <button 
        onClick={handleLogout} 
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </>
  )}
</div>

    </nav>
  );
}
