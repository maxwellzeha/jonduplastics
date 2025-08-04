import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types.ts';

const supabaseUrl = 'https://mefgtrmizddnkwfuyfov.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZmd0cm1pemRkbmt3ZnV5Zm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NjY5MjQsImV4cCI6MjA2OTQ0MjkyNH0.cS0tP4soeNZqvwYC6hRCXvISRmRTbUYaSRCVYddO78I';

// It's recommended to use environment variables for this in a production environment.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
