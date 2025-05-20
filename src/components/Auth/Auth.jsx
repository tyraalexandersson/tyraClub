import { useState } from "react";
import { useAppContext } from "../../context";
import "./Auth.style.css";

function Auth() {
  const { registerUser, signInUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true); // 👈 toggle between login/signup
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validateUserInput = (email, password, username) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number

    if (!emailRegex.test(email)) {
      setErrorMsg("Invalid email format.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setErrorMsg(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return false;
    }
    if (!isLogin && username.trim() === "") {
      setErrorMsg("Username cannot be empty.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    let result;

    // step 1.1 validate user input
    if (!validateUserInput(email, password, username)) {
      setLoading(false);
      return { data: null, error: new Error(errorMsg) };
    }

    if (isLogin) {
      result = await signInUser(email, password);
      if (result.error) {
        setErrorMsg(result.error.message);
        setLoading(false);
        return;
      }
    } else {
      result = await registerUser(email, password, username);
      if (result.error) {
        setErrorMsg(result.error.message);
        setLoading(false);
        return;
      }
    }

    // eslint-disable-next-line no-unused-vars
    const { data, error } = result;

    if (error) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit} className="loginform">
        <input
          className="email_input"
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

        <button type="submit" disabled={loading} className="actionBtn">
          {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
        </button>

        {errorMsg && <span className="error">{errorMsg}</span>}
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
