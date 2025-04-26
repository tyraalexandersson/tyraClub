import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <Navbar />
      <div className="header-container">
        <h1 className="header">Welcome to the Tyra Club!</h1>
      </div>
      <Footer />  
    </>
  );
}

export default App;
