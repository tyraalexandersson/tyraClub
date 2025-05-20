import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Create the context
const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);

  const registerUser = async (email, password, username) => {
    // Step 1: Sign up with user metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: username, // goes into auth.users.user_metadata
        },
      },
    });

    if (error) {
      return { data: null, error }; // return early if signup failed
    }

    // Step 2: Insert into custom 'Users' table
    const { id, email: userEmail } = data.user;

    const { error: insertError } = await supabase.from("Users").insert([
      {
        user_id: id, // match auth.users.id
        user_email: userEmail,
        user_name: username, // custom username field
      },
    ]);

    if (insertError) {
      console.error("Failed to insert user:", insertError.message);
      return { data: null, error: insertError };
    }

    // Step 3: Fetch the user profile
    await fetchAndSetUserProfile(id);

    return { data, error: null }; // success path
  };

  //sign in user supabase.auth.signInWithPassword({ email, password });
  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Failed to sign in:", error.message);
      return new Error("Failed to sign in. Please check your credentials.");
    } else {
      setUser(data.user);
      const { data: profile } = await supabase
        .from("Users")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (profile) {
        setUserProfile(profile);
        setUsername(profile.user_name || "Guest");
      }
    }
    return { data, error };
  };

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

  // Fetch user profile from the database
  const fetchAndSetUserProfile = async (authUserId) => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("user_id", authUserId)
      .single();

    if (error) {
      console.error("Failed to fetch user profile:", error.message);
      setError(error.message);
      setUserProfile(null);
    } else {
      if (data) {
        setUserProfile(data);
        setUsername(data.user_name || "Guest");
      }
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
        fetchAndSetUserProfile,
        userProfile,
        registerUser,
        signInUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
