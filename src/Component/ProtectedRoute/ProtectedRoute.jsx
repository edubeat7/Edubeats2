import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Redirect } from 'react-router-dom'; // Using Redirect for react-router-dom v5

// Initialize Supabase client
// Ensure your environment variables are correctly set up in a .env file
const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

/**
 * A component that acts as a gatekeeper for routes requiring authentication.
 * It performs the following actions:
 * 1. Checks for an active user session with Supabase on mount.
 * 2. Listens for authentication state changes (login/logout).
 * 3. Displays a loading indicator while checking the session.
 * 4. If the user is authenticated, it renders the child components (the protected page).
 * 5. If the user is NOT authenticated, it redirects them to the /Login page.
 */
function ProtectedRoute({ children }) {
  // State to manage the loading process while checking authentication
  const [isLoading, setIsLoading] = useState(true);
  // State to store the user's session information
  const [session, setSession] = useState(null);

  useEffect(() => {
    // --- Initial Session Check ---
    const checkSession = async () => {
      // Fetches the current session from Supabase (e.g., from localStorage)
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
      }

      setSession(data.session);
      setIsLoading(false); // Finished loading
    };

    checkSession();

    // --- Listen for Authentication Changes ---
    // Sets up a listener that fires whenever a user logs in or logs out.
    // This ensures the component reacts in real-time to auth events.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // If the user logs out, we might want to stop loading immediately
      if (_event === 'SIGNED_OUT') {
        setIsLoading(false);
      }
    });

    // --- Cleanup Function ---
    // This function runs when the component is unmounted (e.g., navigating away).
    // It's crucial for preventing memory leaks by unsubscribing from the listener.
    return () => {
      subscription?.unsubscribe();
    };
  }, []); // The empty dependency array [] ensures this effect runs only once on mount.

  // --- Render Logic ---

  // 1. While checking the session, display a clean loading screen.
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8', // Matches your global CSS background
        color: '#5e35b1' // Matches your global CSS primary color
      }}>
        <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Verificando acceso...</p>
      </div>
    );
  }

  // 2. If the check is complete and there is NO session, redirect to the login page.
  if (!session) {
    // Redirect is the standard way to handle this in react-router-dom v5.
    // For v6, you would use <Navigate to="/Login" />.
    return <Redirect to="/Login" />;
  }

  // 3. If the check is complete and a session EXISTS, render the protected content.
  // 'children' refers to whatever component is wrapped by <ProtectedRoute> in App.jsx.
  return children;
}

export default ProtectedRoute;