



import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/common/AuthContext.tsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.ts';
import { Database } from '../lib/database.types.ts';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderStatus = Database['public']['Enums']['order_status'];

const statusColors: { [key in OrderStatus]: string } = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

type Tab = 'All' | OrderStatus;

const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void }> = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 text-2xl">&times;</button>
                 <h3 className="text-3xl font-bold text-neutral-800 mb-6">Order Details</h3>
                 <p className="text-sm text-neutral-500 mb-4 -mt-4">ID: {order.id}</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Left Column */}
                    <div>
                        <h4 className="font-semibold text-neutral-700 mb-2 border-b pb-1">Summary</h4>
                        <ul className="space-y-2 text-neutral-600 mt-2">
                            <li><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</li>
                            <li><strong>Status:</strong> <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>{order.status}</span></li>
                            <li><strong>Total Price:</strong> ${order.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</li>
                            <li><strong>Quantity:</strong> {order.quantity.toLocaleString()}</li>
                        </ul>

                        <h4 className="font-semibold text-neutral-700 mb-2 mt-4 border-b pb-1">Delivery Address</h4>
                        <p className="text-neutral-600 bg-neutral-50 p-3 rounded-lg mt-2">{order.businessAddress}</p>
                    </div>

                    {/* Right Column */}
                    <div>
                         <h4 className="font-semibold text-neutral-700 mb-2 border-b pb-1">Specifications</h4>
                        <ul className="space-y-2 text-neutral-600 bg-neutral-50 p-3 rounded-lg mt-2">
                             <li><strong>Type:</strong> {order.bagType}</li>
                             <li><strong>Material:</strong> {order.material}</li>
                             <li><strong>Size:</strong> {order.width}" x {order.height}"</li>
                             <li><strong>Color:</strong> <div className="inline-block w-4 h-4 rounded-full border" style={{backgroundColor: order.color}}></div> {order.color}</li>
                             <li><strong>Handle:</strong> {order.handleType}</li>
                        </ul>

                        {order.artworkUrl && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-neutral-700 mb-2 border-b pb-1">Artwork</h4>
                                <img src={order.artworkUrl} alt={order.artworkName || 'Artwork'} className="rounded-lg border border-neutral-200 max-h-32 w-auto mt-2"/>
                            </div>
                        )}
                    </div>
                 </div>
            </div>
        </div>
    )
}


const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
        if (user) {
          setLoading(true);
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('userId', user.id)
            .order('date', { ascending: false });

          if (error) {
            console.error('Error fetching orders:', error);
          } else {
            setOrders(data || []);
          }
          setLoading(false);
        }
    };

    fetchOrders();
  }, [user, location.key]); // Re-fetch when location.key changes (i.e., on navigation)
  
  const filteredOrders = orders.filter(order => activeTab === 'All' || order.status === activeTab);
  const savedDesigns = orders.filter(order => order.artworkUrl || order.color !== '#FFFFFF').slice(0, 9);

  return (
    <div className="bg-[#FDFDFD] py-32">
      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
                Welcome, {user?.firstName || 'User'}!
            </h2>
            <p className="text-neutral-600 text-lg mt-2">Here's your account overview.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order History */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 lg:col-span-2">
                 <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#e9ebe9]">
                        <i className="fas fa-receipt text-[#748873] text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-800">Order History</h3>
                 </div>

                 {/* Tabs */}
                <div className="mb-4 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {(['All', 'Pending', 'Completed', 'Cancelled'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                            activeTab === tab
                                ? 'border-[#748873] text-[#748873]'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            {tab}
                        </button>
                        ))}
                    </nav>
                </div>

                 <div className="space-y-4 min-h-[300px]">
                    {loading ? (
                         <div className="flex justify-center items-center h-full pt-10">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#748873]"></div>
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <div key={order.id} onClick={() => setSelectedOrder(order)} className="p-4 rounded-lg border bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center gap-2">
                                    <div>
                                        <p className="font-bold text-neutral-800 truncate max-w-[200px] md:max-w-xs" title={order.id}>{order.id}</p>
                                        <p className="text-sm text-neutral-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-neutral-800">${order.totalPrice.toFixed(2)}</p>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-full">
                            <i className="fas fa-box-open text-4xl text-neutral-400 mb-4"></i>
                            <p className="text-neutral-500">You have no {activeTab !== 'All' ? activeTab.toLowerCase() : ''} orders.</p>
                            <button onClick={() => navigate('/products')} className="mt-4 px-6 py-2 rounded-full text-white btn-accent-gradient shadow-md hover:shadow-lg transition duration-300">
                                Browse Products
                            </button>
                        </div>
                    )}
                 </div>
            </div>

            {/* Account Details & Actions */}
            <div className="space-y-8">
                 {/* Account Details */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#e9ebe9]">
                            <i className="fas fa-user-cog text-[#748873] text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800">Account Details</h3>
                    </div>
                    <div className="space-y-3 text-sm text-neutral-700">
                        <p><strong className="font-medium">Name:</strong> {user?.firstName} {user?.lastName}</p>
                        <p><strong className="font-medium">Email:</strong> {user?.email}</p>
                        <p><strong className="font-medium">Phone:</strong> {user?.phone}</p>
                        <p><strong className="font-medium">Business Address:</strong> {user?.businessAddress}</p>
                    </div>
                </div>
                {/* Saved Designs */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#e9ebe9]">
                            <i className="fas fa-save text-[#748873] text-3xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800">Recent Designs</h3>
                    </div>
                     {savedDesigns.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {savedDesigns.map(design => (
                                <div key={design.id} onClick={() => setSelectedOrder(design)} className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer border hover:border-[#748873]">
                                   {design.artworkUrl ? (
                                        <img src={design.artworkUrl} alt={design.artworkName || 'Artwork'} className="w-full h-full object-cover"/>
                                   ) : (
                                        <div style={{backgroundColor: design.color}} className="w-full h-full"></div>
                                   )}
                                </div>
                            ))}
                        </div>
                     ) : (
                         <div className="text-center py-10 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
                             <i className="fas fa-palette text-4xl text-neutral-400 mb-4"></i>
                            <p className="text-neutral-500">You have no saved designs.</p>
                            <button onClick={() => navigate('/custom-order')} className="mt-4 px-6 py-2 rounded-full text-white btn-accent-gradient shadow-md hover:shadow-lg transition duration-300">
                                Create a Custom Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;