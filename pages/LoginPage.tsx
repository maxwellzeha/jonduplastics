
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.ts';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        setError(error.message);
        setLoading(false);
    } else {
        navigate(from, { replace: true });
    }
  };

  return (
    <div className="bg-[#FDFDFD] py-32 md:py-48">
      <div className="max-w-md mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-neutral-200">
        <h2 className="text-4xl font-bold text-center text-neutral-800 mb-2">Welcome Back</h2>
        <p className="text-center text-neutral-500 mb-8">Login to your account</p>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-100 border border-black text-black focus:outline-none focus:ring-2 focus:ring-[#748873] transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-100 border border-black text-black focus:outline-none focus:ring-2 focus:ring-[#748873] transition"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full mt-4 px-8 py-4 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-neutral-600 mt-8">
          Don't have an account? <Link to="/signup" state={{ from: from }} className="font-semibold text-[#748873] hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;