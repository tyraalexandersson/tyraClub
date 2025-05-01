import { useState } from "react";
import { useAppContext } from "../../../context/contextProvider";
import { supabase } from "../../lib/supabaseClient";

function Auth() {
  const { setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true); // 👈 toggle between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isLogin) {
      // login
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      // signup
      result = await supabase.auth.signUp({ email, password });
    }

    const { data, error } = result;

    if (error) {
      setErrorMsg(error.message);
    } else {
      setUser(data.user); // set user if login/signup success
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
        </button>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>

      {/* Toggle link */}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
