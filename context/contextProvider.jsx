import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);

  const initializeUser = (session) => {
    setSession(session);

    let username;
    if (session) {
      username = session.user.user_metadata.user_name;
    } else {
      username = localStorage.getItem("username") || "Guest";
    }
    setUsername(username);
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      initializeUser(session);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        loadingInitial,
        error,
        username,
        setUsername,
        session,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
