import { createClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for server-side operations
 */
export const createServerSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
    }

    return createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false,
        },
    });
};

/**
 * Create a Supabase client for browser operations
 */
export const createBrowserSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
    }

    return createClient(supabaseUrl, supabaseKey);
};

/**
 * Get database types for Supabase
 * This is a placeholder - in a real app, you would define your database types here
 */
export type Database = {
    public: {
        Tables: {
            vehicles: {
                Row: {
                    id: string;
                    make: string;
                    model: string;
                    year: number;
                    license_plate: string;
                    fuel_type: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
                    owner_id: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    make: string;
                    model: string;
                    year: number;
                    license_plate: string;
                    fuel_type: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
                    owner_id: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    make?: string;
                    model?: string;
                    year?: number;
                    license_plate?: string;
                    fuel_type?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
                    owner_id?: string;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            // Add other tables as needed
        };
        // Add views, functions, etc. as needed
    };
}; 