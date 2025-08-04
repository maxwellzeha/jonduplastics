import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../types.ts';
import { useAuth } from '../components/common/AuthContext.tsx';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Heavy-Duty Nylon T-Shirt Bags',
    description: 'Durable and reusable, perfect for retail and grocery stores. High-density polyethylene.',
    imageUrl: 'https://i.postimg.cc/52tfgR98/images.jpg',
    category: 'Nylon',
    price: 0.10,
  },
  {
    id: 2,
    name: 'Custom Printed Shopping Bags',
    description: 'Promote your brand with our high-quality, custom-printed shopping bags. Available in various sizes.',
    imageUrl: 'https://i.postimg.cc/L4BRppnz/unnamed.png',
    category: 'Shopping',
    price: 0.25,
  },
  {
    id: 3,
    name: 'Eco-Friendly Biodegradable Bags',
    description: 'A sustainable choice for your business. Made from compostable materials without sacrificing strength.',
    imageUrl: 'https://i.postimg.cc/9QBqRS8T/images.jpg',
    category: 'Custom',
    price: 0.18,
  },
  {
    id: 4,
    name: 'Clear Polypropylene Bags',
    description: 'High-clarity bags perfect for showcasing products. FDA approved for food contact.',
    imageUrl: 'https://i.postimg.cc/V6mG93m8/download.jpg',
    category: 'Nylon',
    price: 0.08,
  },
   {
    id: 5,
    name: 'Luxury Paper Shopping Totes',
    description: 'Elegant and sturdy paper bags with rope handles, ideal for high-end retail and boutiques.',
    imageUrl: 'https://i.postimg.cc/Kz0NPj0P/download.jpg',
    category: 'Shopping',
    price: 0.75,
  },
   {
    id: 6,
    name: 'Industrial Grade Gusseted Bags',
    description: 'Extra-large and tough bags for industrial use, box liners, and waste disposal.',
    imageUrl: 'https://i.postimg.cc/Xv7xp98j/images.jpg',
    category: 'Nylon',
    price: 0.35,
  },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { user } = useAuth();
    const isAuthenticated = !!user;
    const navigate = useNavigate();
    const location = useLocation();

    const handlePlaceOrder = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
        } else {
            // Navigate to custom order page with product info
            navigate('/custom-order', { state: { product } });
        }
    };
    
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 flex flex-col hover:shadow-2xl transition-shadow duration-300">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-6 flex-grow flex flex-col">
          <span className="accent-tag text-xs mb-2 self-start">{product.category}</span>
          <h3 className="text-xl font-bold text-neutral-800 mb-2">{product.name}</h3>
          <p className="text-neutral-600 text-sm flex-grow mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-[#748873] mb-4">
             From ${product.price.toFixed(2)} / unit
          </p>
          <button onClick={handlePlaceOrder} className="mt-auto w-full px-6 py-2 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300">
            Place Order
          </button>
        </div>
      </div>
    );
};


const ProductsPage: React.FC = () => {
  return (
    <div className="bg-[#FDFDFD] py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="text-center mb-16">
          <span className="accent-tag mb-4 inline-block">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
            Explore Our Product Range
          </h2>
          <p className="text-neutral-600 text-lg mt-4 max-w-2xl mx-auto">
            We offer a wide variety of high-quality bags to meet the needs of any industry.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;