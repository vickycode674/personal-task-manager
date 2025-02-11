const Features = () => {
    return (
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <div className="flex justify-center space-x-6 mt-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Fast & Efficient</h3>
            <p>Track and manage tasks seamlessly.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Collaboration</h3>
            <p>Work together in real-time.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Secure</h3>
            <p>Your data is safe with us.</p>
          </div>
        </div>
      </section>
    );
  };
  export default Features;
  