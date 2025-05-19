import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Create the context
const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Get the session when the app loads
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
        setUsername(data.session.user.user_metadata.user_name || "Guest");
      }
      if (error) {
        setError(error.message);
      }
      // Set loading to false after checking session
      setLoading(false);
    };

    getSession();

    // Listen to auth state changes (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setUsername(session.user.user_metadata.user_name);
        } else {
          setUser(null);
          setUsername("Guest");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Log out the user and reset context state
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
    } else {
      setUser(null);
      setUsername("Guest");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        username,
        setUsername,
        loading,
        error,
        logout,
        groups,
        setGroups,
        posts,
        setPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
