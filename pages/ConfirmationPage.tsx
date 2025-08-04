import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="bg-[#FDFDFD] py-32 md:py-48">
      <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-xl shadow-2xl border border-neutral-200">
        <i className="fas fa-paper-plane text-6xl text-[#748873] mb-8"></i>
        <h2 className="text-4xl font-bold text-neutral-800 mb-4">Confirm Your Email</h2>
        <p className="text-neutral-600 text-lg">
          We've sent a confirmation link to your email address:
        </p>
        {email && (
            <p className="text-lg font-semibold text-[#748873] my-4">{email}</p>
        )}
        <p className="text-neutral-600 text-lg">
          Please check your inbox (and spam folder) and click the link to complete your registration.
        </p>
        <p className="text-sm text-neutral-500 mt-8">
            Didn't receive an email? <Link to="/inquiries" className="font-semibold text-[#748873] hover:underline">Contact support</Link>.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
