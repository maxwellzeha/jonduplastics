import React from 'react';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="bg-[#FDFDFD] py-32">
            <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
                        Terms of Service
                    </h2>
                    <p className="text-neutral-500 text-sm mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose lg:prose-lg max-w-none text-neutral-700 space-y-6">
                    <p>Welcome to Jondu Global Services! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">1. User Accounts</h3>
                    <p>To access certain features, such as placing custom orders, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">2. Orders and Payment</h3>
                    <p>All orders placed through our website are subject to our acceptance. We may, in our sole discretion, refuse or cancel any order. The pricing displayed on our custom order tool is an estimate and may be subject to change upon final review of your specifications. We will provide a final quote for your approval before proceeding with production. Payment must be made according to the terms specified in the invoice.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">3. Artwork and Intellectual Property</h3>
                    <p>By uploading artwork or any other content ("Your Content") to our website, you grant Jondu Global Services a non-exclusive, worldwide, royalty-free license to use, reproduce, and display Your Content for the purpose of fulfilling your order. You represent and warrant that you own or have the necessary rights and permissions to use and submit Your Content, and that it does not infringe on the intellectual property rights of any third party.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">4. Shipping and Delivery</h3>
                    <p>Shipping and delivery dates are estimates only and cannot be guaranteed. We are not liable for any delays in shipments. Risk of loss and title for all products ordered by you pass to you on our delivery to the shipping carrier.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">5. Limitation of Liability</h3>
                    <p>To the fullest extent permitted by law, Jondu Global Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">6. Governing Law</h3>
                    <p>These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.</p>

                    <h3 className="text-2xl font-bold text-neutral-800 pt-4">7. Changes to Terms</h3>
                    <p>We reserve the right to modify these Terms at any time. We will provide notice of any significant changes by posting the new Terms on our website. Your continued use of the services after any such changes constitutes your acceptance of the new Terms.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;