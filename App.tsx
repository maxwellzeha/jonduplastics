import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import CustomOrderPage from './pages/CustomOrderPage.tsx';
import InquiriesPage from './pages/InquiriesPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import FaqPage from './pages/FaqPage.tsx';
import TermsOfServicePage from './pages/TermsOfServicePage.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import { AuthProvider, useAuth } from './components/common/AuthContext.tsx';
import ProtectedRoute from './components/common/ProtectedRoute.tsx';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConfirmationPage from './pages/ConfirmationPage.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const sqlScript = `-- This script sets up the necessary tables, policies, and storage for the Jondu Global Services app.
-- Run this entire script in your Supabase SQL Editor.

-- ========== PART 1: USER PROFILES ==========
-- This section sets up user profiles, which are automatically created when a user signs up.

-- 1. Create the profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY,
  first_name text,
  last_name text,
  email text,
  phone text,
  business_address text,
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.profiles IS 'Stores public profile information for each user.';
COMMENT ON COLUMN public.profiles.id IS 'References the auth.users table.';

-- 2. Enable Row Level Security (RLS) on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for the profiles table
CREATE POLICY "Users can view their own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 4. Create a trigger to automatically create a profile on new user sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, phone, business_address)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'business_address'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Apply the trigger to the auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ========== PART 2: CUSTOM ORDERS ==========
-- This section sets up the database schema for handling custom orders.

-- 1. Create a custom type for order status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE public.order_status AS ENUM ('Pending', 'Completed', 'Cancelled');
    END IF;
END$$;

-- 2. Create the orders table
CREATE TABLE public.orders (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    "userId" uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date timestamp with time zone NOT NULL,
    status public.order_status NOT NULL DEFAULT 'Pending'::public.order_status,
    "bagType" text NOT NULL,
    material text NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    color text NOT NULL,
    "handleType" text NOT NULL,
    quantity integer NOT NULL,
    "artworkUrl" text,
    "artworkName" text,
    "businessAddress" text NOT NULL,
    "totalPrice" numeric NOT NULL
);

COMMENT ON TABLE public.orders IS 'Stores custom order information for users.';

-- 3. Enable RLS on the orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for the orders table
CREATE POLICY "Users can view their own orders." ON public.orders FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can insert their own orders." ON public.orders FOR INSERT WITH CHECK (auth.uid() = "userId");

-- ========== PART 3: FILE STORAGE FOR ARTWORKS ==========
-- This section creates a storage bucket for user-uploaded artwork files.

-- 1. Create a storage bucket for artworks (publicly readable)
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true)
ON CONFLICT (id) DO NOTHING;

COMMENT ON BUCKET artworks IS 'Stores user-uploaded artwork for custom orders.';

-- 2. Create RLS policies for the artworks bucket
CREATE POLICY "Artworks are publicly viewable" ON storage.objects FOR SELECT USING ( bucket_id = 'artworks' );
CREATE POLICY "Users can upload their own artwork" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'artworks' AND (storage.foldername(name))[1] = auth.uid()::text );
CREATE POLICY "Users can update their own artwork" ON storage.objects FOR UPDATE USING ( bucket_id = 'artworks' AND (storage.foldername(name))[1] = auth.uid()::text );
CREATE POLICY "Users can delete their own artwork" ON storage.objects FOR DELETE USING ( bucket_id = 'artworks' AND (storage.foldername(name))[1] = auth.uid()::text );
`;

const DatabaseErrorComponent: React.FC = () => {
    const handleCopy = () => {
        navigator.clipboard.writeText(sqlScript);
        alert('SQL script copied to clipboard!');
    };

    return (
      <div className="bg-red-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-red-200 max-w-4xl w-full my-8">
          <div className="flex items-center mb-4">
            <i className="fas fa-database text-4xl text-red-500 mr-4"></i>
            <h1 className="text-3xl font-bold text-red-800">Database Setup Required</h1>
          </div>
          <p className="text-neutral-700 mb-6">
            The application requires a one-time database setup. Key tables like <code>profiles</code> and <code>orders</code> appear to be missing. This is a required step to store user information and manage custom orders.
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-2">How to Fix This</h2>
            <p className="text-neutral-700 mb-4">Please run the following SQL script in your Supabase project's <strong>SQL Editor</strong>. This will create the necessary tables (<code>profiles</code>, <code>orders</code>), configure security policies, and set up file storage for artwork uploads.</p>
            <ol className="list-decimal list-inside space-y-2 text-neutral-600 mb-4 pl-2">
                <li>Go to your <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#748873] underline">Supabase project dashboard</a>.</li>
                <li>In the left menu, click the <strong>SQL Editor</strong> icon (looks like a page with &lt;/&gt;).</li>
                <li>Click <strong>+ New query</strong>.</li>
                <li>Copy and paste the entire script below into the editor.</li>
                <li>Click the <strong>RUN</strong> button.</li>
            </ol>
            <div className="relative">
                <pre className="bg-neutral-800 text-white p-4 rounded-lg overflow-x-auto text-sm max-h-64">
                    <code>
                        {sqlScript}
                    </code>
                </pre>
                <button onClick={handleCopy} className="absolute top-2 right-2 bg-neutral-600 hover:bg-neutral-500 text-white text-xs font-bold py-1 px-2 rounded">
                    Copy
                </button>
            </div>
          </div>
           <p className="text-center text-neutral-500 mt-8">After running the script successfully, please <strong>refresh this page</strong>.</p>
        </div>
      </div>
    );
  };


const AppContent: React.FC = () => {
  const { dbError } = useAuth();
  
  if (dbError === 'PROFILES_TABLE_MISSING') {
      return <DatabaseErrorComponent />;
  }

  return (
    <>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/inquiries" element={<InquiriesPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
    </>
  )
}

const App: React.FC = () => {
  useEffect(() => {
    // Integrate Lenis for smooth scrolling
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
    });

    // Sync GSAP ScrollTrigger with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis's animation frame loop with GSAP's ticker for optimal performance
    const lenisRaf = (time: number) => {
        lenis.raf(time * 1000);
    }
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // Cleanup on component unmount
    return () => {
        gsap.ticker.remove(lenisRaf);
        lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;