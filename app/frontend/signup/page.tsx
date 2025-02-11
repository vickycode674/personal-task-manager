export default function SignupPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form className="bg-white p-6 rounded shadow-md">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </form>
      </div>
    );
  }
  