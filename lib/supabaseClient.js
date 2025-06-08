import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtptvflhzcninapzvxow.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cHR2ZmxoemNuaW5hcHp2eG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDc1MjMsImV4cCI6MjA2NDk4MzUyM30.LHXrz6ky9ddpLXe7dv7XdpqPhvBqXaDfEs8t6siZ41M';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 