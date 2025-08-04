import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-[#FDFDFD] py-32">
            <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
                        Privacy Policy
                    </h2>
                     <p className="text-neutral-500 text-sm mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose lg:prose-lg max-w-none text-neutral-700 space-y-6">
                    <p>Jondu Global Services ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">1. Information We Collect</h3>
                    <p>We may collect personal information from you in a variety of ways, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Data:</strong> Information such as your name, email address, phone number, and business address that you voluntarily give to us when you register for an account or place an order.</li>
                        <li><strong>Order Information:</strong> Details related to your custom orders, including bag specifications, quantity, and pricing.</li>
                        <li><strong>Uploaded Files:</strong> Artwork and other files you upload for custom printing and branding services.</li>
                        <li><strong>Usage Data:</strong> Information automatically collected when you access the website, such as your IP address, browser type, and pages visited.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                     <ul className="list-disc pl-6 space-y-2">
                        <li>Create and manage your account.</li>
                        <li>Fulfill and manage your orders.</li>
                        <li>Communicate with you regarding your account or orders.</li>
                        <li>Respond to your inquiries and offer customer support.</li>
                        <li>Improve our website and services.</li>
                        <li>Comply with legal and regulatory requirements.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">3. Data Sharing and Third Parties</h3>
                    <p>We do not sell, trade, or rent your personal information to others. We may share your information with third-party service providers that perform services for us or on our behalf, including:</p>
                     <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Supabase:</strong> Our backend and database provider, which stores your account information and order data.</li>
                        <li><strong>FormSubmit.co:</strong> Our email form processor for handling inquiries from non-authenticated users.</li>
                        <li><strong>Shipping Carriers:</strong> To deliver your orders.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">4. Data Security</h3>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. We rely on the robust security infrastructure of our cloud provider, Supabase, to safeguard your data.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">5. Your Rights</h3>
                    <p>You have the right to review, update, or delete your personal information. You can manage your account details through your user dashboard. For any other requests regarding your data, please contact us.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">6. Contact Us</h3>
                    <p>If you have questions or comments about this Privacy Policy, please contact us through our <Link to="/inquiries" className="text-[#748873] hover:underline">inquiries page</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;