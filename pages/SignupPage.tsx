import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.ts';

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!firstName || !lastName || !email || !password || !phone || !businessAddress) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    
    // The redirect URL should point to the route the user was trying to access.
    // For HashRouter, we construct it to work with the hash.
    const redirectURL = `${window.location.origin}/#${from === '/' ? '' : from}`;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        emailRedirectTo: redirectURL,
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          business_address: businessAddress.trim(),
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else if (data.user) {
      // On successful signup request, navigate to the confirmation page.
      // The user is not yet logged in. They need to confirm their email.
      navigate('/confirmation', { state: { email: email.trim() } });
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg bg-neutral-100 border border-black text-black focus:outline-none focus:ring-2 focus:ring-[#748873] transition";

  return (
    <div className="bg-[#FDFDFD] py-32 md:py-48">
      <div className="max-w-md mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-neutral-200">
        <h2 className="text-4xl font-bold text-center text-neutral-800 mb-2">Create an Account</h2>
        <p className="text-center text-neutral-500 mb-8">Start your journey with Jondu Global Services</p>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClasses} placeholder="John" required />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClasses} placeholder="Doe" required />
            </div>
          </div>
           <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} placeholder="+234 8146632632" required />
          </div>
          <div>
            <label htmlFor="businessAddress" className="block text-sm font-medium text-neutral-700 mb-1">Business Address</label>
            <input type="text" id="businessAddress" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} className={inputClasses} placeholder="123 Manufacturing Way" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} placeholder="you@example.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="w-full mt-4 px-8 py-4 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center disabled:opacity-50">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-neutral-600 mt-8">
          Already have an account? <Link to="/login" className="font-semibold text-[#748873] hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;