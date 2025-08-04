



import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../components/common/AuthContext.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../types.ts';
import { supabase } from '../lib/supabaseClient.ts';

// Pricing Constants
const MATERIAL_PRICES: { [key: string]: number } = {
  'HDPE': 0.02,
  'LDPE': 0.025,
  'PP': 0.03,
  'Biodegradable': 0.05,
};
const DIMENSION_PRICE_PER_SQ_IN = 0.0005;
const ARTWORK_PRICE_PER_BAG = 0.03;


const CustomOrderPage: React.FC = () => {
  const [bagType, setBagType] = useState('Nylon Bag');
  const [material, setMaterial] = useState('HDPE');
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(15);
  const [color, setColor] = useState('#FFFFFF');
  const [handleType, setHandleType] = useState('Die-cut');
  const [quantity, setQuantity] = useState(5000);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessAddress, setBusinessAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
        navigate('/login', { state: { from: location } });
        return;
    }
    setBusinessAddress(user.businessAddress || '');

    const state = location.state as { product: Product } | undefined;
    if (state?.product) {
        const { category } = state.product;
        if(category === 'Nylon') setBagType('Nylon Bag');
        else if(category === 'Shopping') setBagType('Shopping Bag');
        else if(category === 'Custom') setBagType('Eco-Friendly Bag');
    }
  }, [location.state, user, navigate]);

  const totalPrice = useMemo(() => {
    const materialCost = MATERIAL_PRICES[material] || 0;
    const dimensionCost = width * height * DIMENSION_PRICE_PER_SQ_IN;
    const artworkCost = artwork ? ARTWORK_PRICE_PER_BAG : 0;
    const pricePerBag = materialCost + dimensionCost + artworkCost;
    return pricePerBag * quantity;
  }, [material, width, height, artwork, quantity]);

  const handleArtworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArtwork(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtworkPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setArtwork(null);
        setArtworkPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!user) {
        navigate('/login', { state: { from: location } });
        return;
    }

    let artworkUrl: string | undefined = undefined;
    if (artwork) {
        const filePath = `${user.id}/${Date.now()}_${artwork.name}`;
        const { error: uploadError } = await supabase.storage
            .from('artworks')
            .upload(filePath, artwork);
        
        if (uploadError) {
            setErrorMessage(`Artwork upload failed: ${uploadError.message}`);
            setIsSubmitting(false);
            return;
        }

        const { data: urlData } = supabase.storage
            .from('artworks')
            .getPublicUrl(filePath);
        
        artworkUrl = urlData.publicUrl;
    }
    
    const orderToInsert = {
        userId: user.id,
        date: new Date().toISOString(),
        status: 'Pending' as const,
        bagType,
        material,
        width,
        height,
        color,
        handleType,
        quantity,
        artworkUrl: artworkUrl ?? null,
        artworkName: artwork?.name ?? null,
        businessAddress,
        totalPrice,
    };

    const { data: newOrder, error: insertError } = await supabase.from('orders').insert(orderToInsert).select().single();

    if (insertError) {
        setErrorMessage(`Failed to place order: ${insertError.message}`);
        setIsSubmitting(false);
    } else {
        setSuccessMessage('Your order has been placed successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
    }
  };

  const inputClasses = "w-full p-3 rounded-lg bg-neutral-100 border border-black text-black focus:outline-none focus:ring-2 focus:ring-[#748873] transition";

  return (
    <div className="bg-[#FDFDFD] py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="text-center mb-16">
          <span className="accent-tag mb-4 inline-block">Custom Orders</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
            Design Your Perfect Bag
          </h2>
          <p className="text-neutral-600 text-lg mt-4 max-w-2xl mx-auto">
            Use our interactive tool to create a bag that meets your exact specifications.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="lg:w-2/3 bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
            {successMessage && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 text-center">{successMessage}</div>}
            {errorMessage && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Bag Type & Material */}
              <fieldset>
                <legend className="text-2xl font-bold text-neutral-800 mb-4 border-b pb-2">1. Bag Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Bag Type</label>
                    <select value={bagType} onChange={e => setBagType(e.target.value)} className={inputClasses}>
                      <option>Nylon Bag</option>
                      <option>Shopping Bag</option>
                      <option>Eco-Friendly Bag</option>
                    </select>
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Material</label>
                    <select value={material} onChange={e => setMaterial(e.target.value)} className={inputClasses}>
                      {Object.keys(MATERIAL_PRICES).map(mat => <option key={mat}>{mat}</option>)}
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Step 2: Dimensions & Color */}
              <fieldset>
                <legend className="text-2xl font-bold text-neutral-800 mb-4 border-b pb-2">2. Sizing & Color</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Width (in)</label>
                    <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Height (in)</label>
                    <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Bag Color</label>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-[50px] p-1 rounded-lg bg-neutral-100 border border-black" />
                  </div>
                </div>
              </fieldset>
              
              {/* Step 3: Handle & Artwork */}
              <fieldset>
                <legend className="text-2xl font-bold text-neutral-800 mb-4 border-b pb-2">3. Finishing Touches</legend>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Handle Type</label>
                        <select value={handleType} onChange={e => setHandleType(e.target.value)} className={inputClasses}>
                          <option>Die-cut</option>
                          <option>Loop Handle</option>
                          <option>Patch Handle</option>
                          <option>Rope Handle</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Upload Artwork (optional)</label>
                        <input type="file" onChange={handleArtworkChange} accept="image/*,.pdf" className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#8fa38e] file:text-white hover:file:bg-[#748873]"/>
                         {artwork && <p className="text-xs text-neutral-500 mt-1">File: {artwork.name}</p>}
                    </div>
                </div>
              </fieldset>
              
               {/* Step 4: Quantity & Address */}
              <fieldset>
                <legend className="text-2xl font-bold text-neutral-800 mb-4 border-b pb-2">4. Quantity & Delivery</legend>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Quantity (MOQ: 5,000)</label>
                        <input type="number" min="5000" step="1000" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className={inputClasses} />
                        <p className="text-xs text-neutral-500 mt-1">Minimum Order Quantity is 5,000 units.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Business/Delivery Address</label>
                        <input type="text" value={businessAddress} onChange={e => setBusinessAddress(e.target.value)} className={inputClasses} required />
                    </div>
                 </div>
              </fieldset>

              <button type="submit" disabled={isSubmitting || !!successMessage} className="w-full mt-6 px-8 py-4 rounded-full text-white btn-accent-gradient shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Place Order'}
                {!isSubmitting && <i className="fas fa-arrow-right ml-3"></i>}
              </button>
            </form>
          </div>

          {/* Preview */}
          <div className="lg:w-1/3">
             <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 sticky top-32">
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">Your Custom Bag</h3>
                 <div className="w-full h-64 flex items-center justify-center rounded-lg bg-neutral-100 mb-6 border-2 border-dashed relative overflow-hidden">
                    <div style={{ width: `100%`, height: `100%`, backgroundColor: color }} className="absolute inset-0 transition-all duration-300 ease-in-out"></div>
                    {artworkPreview ? (
                       <img src={artworkPreview} alt="Artwork Preview" className="relative z-10 max-w-full max-h-full object-contain p-2"/>
                    ) : (
                       <i className="fas fa-tshirt text-6xl text-black opacity-10 relative z-10"></i>
                    )}
                </div>
                <ul className="space-y-2 text-neutral-600 text-sm mb-6">
                    <li><strong>Type:</strong> {bagType}</li>
                    <li><strong>Material:</strong> {material}</li>
                    <li><strong>Size:</strong> {width}" x {height}"</li>
                    <li><strong>Handle:</strong> {handleType}</li>
                    <li><strong>Quantity:</strong> {quantity.toLocaleString()}</li>
                </ul>
                <div className="bg-neutral-100 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium text-neutral-600">Estimated Price</p>
                    <p className="text-3xl font-bold text-[#748873]">
                        ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderPage;