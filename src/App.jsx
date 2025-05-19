import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Account,
  Auth,
  Navbar,
  Footer,
  Home,
  FrontPage,
  AppContextProvider,
  useAppContext,
  Wall,
} from "./index";


function App() {
  const { user, loading } = useAppContext(); // Using the context here

  if (loading) return <div>Loading...</div>; // Show loading state while checking auth status

  //if (!user) return <Auth />; // Show login/signup form if user is not logged in

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
        {/* Protected routes */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/wall"
          element={user ? <Wall /> : <Navigate to="/login" />}
        />
        <Route path="/account" element={user ? <Account /> : <Navigate to="/login" />} /> 
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
