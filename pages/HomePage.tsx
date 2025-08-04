import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BagIcon from '../components/common/BagIcon.tsx';
import { useNavigate, Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const processSteps = [
        { id: 1, title: "01", text: "Production & Quality Control" },
        { id: 2, title: "02", text: "Design & Prototyping" },
        { id: 3, title: "03", text: "Material Sourcing & Sustainability" },
        { id: 4, title: "04", text: "Logistics & Delivery" }
    ];

    const teamMembers = [
        {
            imgSrc: 'https://i.postimg.cc/hPkqwShZ/unnamed.jpg',
            name: 'Barr Joseph Onaze',
            role: 'CEO and Cofounder',
            isColor: true,
        },
        {
            imgSrc: 'https://placehold.co/160',
            name: 'Jane Doe',
            role: 'Lead Designer',
            isColor: false,
        },
        {
            imgSrc: 'https://placehold.co/160',
            name: 'John Smith',
            role: 'Operations Manager',
            isColor: false,
        },
        {
            imgSrc: 'https://placehold.co/160',
            name: 'Emily White',
            role: 'Marketing Head',
            isColor: false,
        },
    ];

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            const elementsToAnimate = gsap.utils.toArray<HTMLElement>('.animate-on-scroll');
            elementsToAnimate.forEach(element => {
                gsap.set(element, { opacity: 0, y: 50 });

                ScrollTrigger.create({
                    trigger: element,
                    start: "top 85%",
                    end: "bottom center",
                    onEnter: () => {
                        gsap.to(element, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power2.out"
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(element, {
                            opacity: 0,
                            y: 50,
                            duration: 0.5,
                            ease: "power2.in"
                        });
                    }
                });
            });
        }, mainRef);
        
        return () => ctx.revert();
    }, []);

    const handleGetInTouch = () => {
        navigate('/custom-order');
    };

    return (
        <main ref={mainRef}>
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 bg-[#FDFDFD] overflow-hidden">
                <BagIcon theme="light" positionClasses="top-10 left-10 transform -rotate-12" />
                <BagIcon theme="light" positionClasses="bottom-20 right-20 transform rotate-45" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                        <p className="text-neutral-600 text-lg mb-4 animate-on-scroll">Your Vision, Our Expertise. Unmatched Quality in Every Bag.</p>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-neutral-800 hero-heading animate-on-scroll">
                            QUALITY<br className="md:hidden" />
                            <span className="text-neutral-500"> CRAFTED</span>
                        </h1>
                        <p className="text-neutral-600 text-lg mt-6 max-w-lg mx-auto md:mx-0 animate-on-scroll">
                            From durable nylon bags for industrial use to elegant, custom-branded shopping totes, we bring your packaging ideas to life. Our commitment to excellence and sustainable practices makes us the preferred partner for businesses across the globe. Let's create something exceptional together.
                        </p>
                        <button onClick={() => navigate('/custom-order')} className="mt-8 px-8 py-4 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center md:justify-start mx-auto md:mx-0 animate-on-scroll">
                            Place an Order
                            <i className="fas fa-arrow-right ml-3"></i>
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <div className="w-full animate-on-scroll">
                            <img src="https://i.postimg.cc/SxKyFyhW/unnamed.png" alt="Jondu Global Services Custom Bags" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Process/Services Overview Section */}
            <section className="relative py-16 md:py-24 bg-[#FDFDFD]">
                <BagIcon theme="light" positionClasses="top-1/4 right-1/4 transform rotate-12" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 flex flex-col md:flex-row items-center">
                    <div className="md:w-3/5 flex justify-center md:justify-start mb-10 md:mb-0">
                        <img src="https://i.postimg.cc/0Qmhkpnt/jondumaufacturingimage.png" alt="Manufacturing process" className="rounded-xl shadow-xl w-full max-w-2xl animate-on-scroll" />
                    </div>
                    <div className="md:w-2/5 md:pl-16 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800 mb-6 animate-on-scroll">
                            Advanced CAD and rapid prototyping for optimal results
                        </h2>
                        <p className="text-neutral-600 text-lg mb-8 animate-on-scroll">
                            Our streamlined process ensures precision and efficiency from concept to delivery. We leverage cutting-edge technology to bring your designs to life.
                        </p>
                        <button onClick={() => navigate('/custom-order')} className="px-8 py-4 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center md:justify-start mx-auto md:mx-0 animate-on-scroll">
                            Learn More About Our Process
                            <i className="fas fa-arrow-right ml-3"></i>
                        </button>
                        <div className="flex flex-wrap justify-center md:justify-start mt-10 gap-4 animate-on-scroll">
                           {processSteps.map(step => (
                             <Link to="/inquiries" key={step.id} 
                                className="group relative px-5 py-3 rounded-full font-semibold transition-colors duration-300 bg-neutral-200 text-neutral-700 hover:bg-[#748873] hover:text-white w-32 h-12 flex items-center justify-center text-center"
                             >
                               <span className="transition-opacity duration-300 group-hover:opacity-0">{step.title}</span>
                               <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium leading-tight px-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">{step.text}</span>
                             </Link>
                           ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="relative py-16 md:py-24 bg-[#FDFDFD]">
                <BagIcon theme="light" positionClasses="top-20 left-1/3 transform rotate-6" />
                <BagIcon theme="light" positionClasses="bottom-10 right-10 transform -rotate-24" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
                    <span className="accent-tag mb-4 inline-block animate-on-scroll">About Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800 mb-10 animate-on-scroll">
                        Trusted partner for over 20 years <br /> <span className="text-neutral-500">of industry excellence</span>
                    </h2>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 mb-10 md:mb-0 md:w-3/5">
                            {teamMembers.map((member, i) => (
                                <div key={i} className="flex flex-col items-center text-center animate-on-scroll">
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg mb-4">
                                        <img
                                            src={member.imgSrc}
                                            alt={member.name}
                                            className={`w-full h-full object-cover ${!member.isColor ? 'grayscale' : ''} hover:grayscale-0 transition-all duration-300`}
                                        />
                                    </div>
                                    <h4 className="font-semibold text-neutral-800">{member.name}</h4>
                                    <p className="text-sm text-neutral-500">{member.role}</p>
                                </div>
                            ))}
                        </div>
                        <div className="md:w-2/5 md:pl-16 text-center md:text-left">
                            <p className="text-neutral-600 text-lg mb-6 animate-on-scroll">
                                We're committed to quality, innovation, and customer satisfaction. Our extensive experience in plastic manufacturing ensures that we deliver products that meet the highest industry standards.
                            </p>
                            <p className="text-neutral-600 text-lg animate-on-scroll">
                                Our company specializes in delivering precision manufacturing services tailored to meet the diverse needs of industries, from packaging to retail solutions. We pride ourselves on sustainable practices and efficient production.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="relative py-16 md:py-24 dark-section-bg text-white dark-background-section">
                <BagIcon theme="dark" positionClasses="top-10 right-10 transform rotate-24" />
                <BagIcon theme="dark" positionClasses="bottom-20 left-20 transform -rotate-12" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
                    <span className="accent-tag mb-4 inline-block animate-on-scroll">Our Services</span>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-12 animate-on-scroll">
                        Comprehensive Manufacturing Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Service Items */}
                        <div className="bg-neutral-800 rounded-xl p-8 flex items-start space-x-6 shadow-lg animate-on-scroll">
                            <div className="service-icon-bg w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"><i className="fas fa-cogs text-[#748873] text-2xl"></i></div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">Custom Nylon/Plastic Bag Manufacturing</h3>
                                <p className="text-neutral-400">Tailored solutions for complex plastic bag designs with precise specifications and material requirements.</p>
                            </div>
                        </div>
                        <div className="bg-neutral-800 rounded-xl p-8 flex items-start space-x-6 shadow-lg animate-on-scroll">
                            <div className="service-icon-bg w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"><i className="fas fa-shopping-bag text-[#748873] text-2xl"></i></div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">Shopping Bag Production</h3>
                                <p className="text-neutral-400">High-volume production of various shopping bags, including paper, fabric, and custom branded options.</p>
                            </div>
                        </div>
                        <div className="bg-neutral-800 rounded-xl p-8 flex items-start space-x-6 shadow-lg animate-on-scroll">
                            <div className="service-icon-bg w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"><i className="fas fa-recycle text-[#748873] text-2xl"></i></div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">Material Sourcing & Innovation</h3>
                                <p className="text-neutral-400">Expert sourcing of eco-friendly and durable materials, with a focus on sustainable and innovative solutions.</p>
                            </div>
                        </div>
                        <div className="bg-neutral-800 rounded-xl p-8 flex items-start space-x-6 shadow-lg animate-on-scroll">
                            <div className="service-icon-bg w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"><i className="fas fa-print text-[#748873] text-2xl"></i></div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">Custom Printing & Branding</h3>
                                <p className="text-neutral-400">Enhance your brand visibility with our high-quality custom printing services for all bag types.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* CTA Section */}
            <section className="relative py-16 md:py-24 bg-[#FDFDFD]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800 mb-6 animate-on-scroll">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-neutral-600 text-lg mb-8 max-w-2xl mx-auto animate-on-scroll">
                        Let's build something great together. Contact us for a free consultation and quote.
                    </p>
                    <button onClick={handleGetInTouch} className="px-8 py-4 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center mx-auto animate-on-scroll">
                        Get In Touch
                        <i className="fas fa-arrow-right ml-3"></i>
                    </button>
                </div>
            </section>
        </main>
    );
};

export default HomePage;