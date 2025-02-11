import Link from "next/link";

export default function Header() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">My App</h1>
      <div>
        <Link href="/frontend/signup" className="mr-4 hover:underline">Sign Up</Link>
        <Link href="/frontend/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
}
