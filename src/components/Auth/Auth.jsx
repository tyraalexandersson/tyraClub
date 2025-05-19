import { useState } from "react";
import { useAppContext } from "../../context";
import { supabase } from "../../lib";

function Auth() {
  const { setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true); // 👈 toggle between login/signup
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async (email, password) => {
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
        id, // match auth.users.id
        email: userEmail,
        username, // custom username field
      },
    ]);

    if (insertError) {
      console.error("Failed to insert user:", insertError.message);
      setErrorMsg("Signup succeeded, but user profile creation failed.");
    }

    return { data, error: null }; // success path
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    let result;

    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await registerUser(email, password);
    }

    const { data, error } = result;

    if (error) {
      setErrorMsg(error.message);
    } else {
      setUser(data.user); // success
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
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
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
