'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  if (isLoading) {
    return <div className="text-sm text-gray-600">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <a
          href="/auth"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        {user.email}
      </span>
      <button
        onClick={handleSignOut}
        className="text-sm text-red-600 hover:text-red-800"
      >
        Sign Out
      </button>
    </div>
  );
} 