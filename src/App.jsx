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
import GroupCreatePage from "./components/_Group/GroupCreatePage/GroupCreatePage";
import GroupSection from "./components/_Group/GroupSection/GroupSection";
import NotFound from "./components/NotFound/NotFound";
import GroupSelected from "./components/_Group/GroupSelected/GroupSelected";

function App() {
  const { user, loading } = useAppContext(); // Using the context here

  if (loading) return <div>Loading...</div>; // Show loading state while checking auth status

  if (!user) return <Auth />; // Show login/signup form if user is not logged in

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
          path="/account"
          element={user ? <Account /> : <Navigate to="/login" />}
        />
        {/* Group Routes */}
        <Route
          path="/wall"
          element={user ? <Wall /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/create"
          element={user ? <GroupCreatePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/:id"
          element={user ? <GroupSelected /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/search"
          element={user ? <GroupSection /> : <Navigate to="/login" />}
        />

        {/* Catch-all route (404) */}
        <Route path="*" element={<NotFound />} />
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
