import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/common/AuthContext.tsx';

const InquiriesPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const isAuthenticated = !!user;

    const recipientEmail = 'onazejoesy342@gmail.com';
    // Use regex to remove any existing query parameters from the URL before adding our own.
    const redirectUrl = window.location.href.replace(/(\?.*)?$/, '?submitted=true');

    useEffect(() => {
        if (searchParams.get('submitted') === 'true') {
            setSubmitted(true);
        }
        if (user) {
            setName(`${user.firstName} ${user.lastName}`);
            setEmail(user.email || '');
        }
    }, [searchParams, user]);

    const inputClasses = "w-full p-3 rounded-lg bg-neutral-100 border border-black text-black focus:outline-none focus:ring-2 focus:ring-[#748873] transition disabled:bg-neutral-200 disabled:text-neutral-500";

    if (submitted) {
        return (
             <div className="bg-[#FDFDFD] py-32 md:py-48">
                <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-xl shadow-2xl border border-neutral-200">
                     <h2 className="text-4xl font-bold text-neutral-800 mb-4">Thank You!</h2>
                     <p className="text-neutral-600 text-lg">Your inquiry has been sent successfully. Our team will get back to you shortly.</p>
                     <i className="fas fa-check-circle text-6xl text-[#748873] mt-8"></i>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#FDFDFD] py-32">
            <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-8">
                <div className="text-center mb-16">
                    <span className="accent-tag mb-4 inline-block">Contact Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
                        Get in Touch
                    </h2>
                    <p className="text-neutral-600 text-lg mt-4 max-w-2xl mx-auto">
                        Have a question or a project in mind? We'd love to hear from you.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-neutral-200">
                    <form action={`https://formsubmit.co/${recipientEmail}`} method="POST" className="space-y-6">
                        {/* formsubmit.co hidden inputs */}
                        <input type="hidden" name="_next" value={redirectUrl} />
                        <input type="hidden" name="_subject" value={`New Jondu Global Services Inquiry: ${subject}`} />
                        <input type="hidden" name="_captcha" value="false" /> 

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required disabled={isAuthenticated} className={inputClasses}/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isAuthenticated} className={inputClasses}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject-input" className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
                            <input type="text" id="subject-input" name="subject" value={subject} onChange={e => setSubject(e.target.value)} required className={inputClasses}/>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                            <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)} rows={6} required className={inputClasses}></textarea>
                        </div>
                        <button type="submit" className="w-full mt-4 px-8 py-4 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center">
                           Send Inquiry
                           <i className="fas fa-paper-plane ml-3"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InquiriesPage;