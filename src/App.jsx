import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { AppContextProvider, useAppContext } from "../context/contextProvider";

function App() {
  const { user, loading } = useAppContext(); // Using the context here

  if (loading) return <div>Loading...</div>; // Show loading state while checking auth status

  if (!user) return <Auth />; // Show login/signup form if user is not logged in

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* You can add more protected routes here */}
      </Routes>
      <Footer />
    </>
  );
}

function AppWrapper() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

export default AppWrapper;
