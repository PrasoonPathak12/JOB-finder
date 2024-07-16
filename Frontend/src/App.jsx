import { Outlet } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useState } from "react";
import Footer from "./components/utils/Footer";
import Header from "./components/utils/Header";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <Header/>
      <Outlet/>
      <Footer/>
    </AppContext.Provider>
  )
}

export default App;
