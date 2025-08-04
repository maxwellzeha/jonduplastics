


export interface User {
  id: string; // From Supabase
  firstName: string;
  lastName:string;
  email: string;
  phone: string;
  businessAddress: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: 'Nylon' | 'Shopping' | 'Custom';
  price: number;
}
