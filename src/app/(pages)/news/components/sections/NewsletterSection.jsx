import { useState } from 'react';
import toast from 'react-hot-toast';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      toast.success("Subscribed!");
      setEmail('');
    } else {
      toast.error('Something went wrong. Try again.');
    }
    setLoading(false);
  };
  
  return(
    <section className="bg-[#E9F2FC] py-12 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Subscribe to our newsletter to receive the latest news and event updates directly in your inbox.
        </p>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${loading ? "bg-gray-100" : "bg-white"} flex-grow px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              disabled={loading}
              required
            />
            <button 
              type="submit" 
              className={`${loading ? "bg-slate-400" : "bg-[#1A384F] btn hover:bg-[#0d141a]"} text-white px-6 py-3 rounded-md transition-colors`}
              disabled={loading}
            >
              {loading ? "Processing" : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewsLetter;