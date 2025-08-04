import React from 'react';

const faqData = [
    {
        question: "What is your Minimum Order Quantity (MOQ)?",
        answer: "Our standard MOQ for most custom orders is 5,000 units. For specific products or complex designs, this may vary. Please contact us for details regarding your specific needs."
    },
    {
        question: "What types of materials do you offer?",
        answer: "We offer a wide range of materials including High-Density Polyethylene (HDPE), Low-Density Polyethylene (LDPE), Polypropylene (PP), and various biodegradable and compostable options to meet your sustainability goals."
    },
    {
        question: "Can I get a sample before placing a large order?",
        answer: "Yes, we can provide samples of our previous work to demonstrate quality. For custom-prototyped samples based on your design, fees may apply. This fee is often credited towards your full order upon placement."
    },
    {
        question: "What is the turnaround time for custom orders?",
        answer: "Turnaround time typically ranges from 2 to 4 weeks, depending on order complexity, quantity, and current production schedules. We will provide a more precise delivery timeline with your official quote."
    },
    {
        question: "What artwork file formats do you accept?",
        answer: "For the best printing quality, we prefer vector file formats such as Adobe Illustrator (.AI), Encapsulated PostScript (.EPS), or Portable Document Format (.PDF). High-resolution raster images (e.g., .JPG, .PNG) at 300 DPI or higher may also be acceptable."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to many locations globally. Shipping costs and delivery times will vary based on the destination. Please provide your full delivery address when requesting a quote for an accurate estimate."
    }
];

const FaqPage: React.FC = () => {
    return (
        <div className="bg-[#FDFDFD] py-32">
            <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-8">
                <div className="text-center mb-16">
                    <span className="accent-tag mb-4 inline-block">Support</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-neutral-600 text-lg mt-4 max-w-2xl mx-auto">
                        Find answers to common questions about our products, services, and processes.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <details key={index} className="group bg-white p-6 rounded-xl shadow-lg border border-neutral-200" name="faq-accordion">
                            <summary className="font-bold text-lg text-neutral-800 cursor-pointer list-none flex justify-between items-center">
                                {item.question}
                                <i className="fas fa-chevron-down transition-transform duration-300 group-open:rotate-180"></i>
                            </summary>
                            <p className="text-neutral-600 mt-4">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;