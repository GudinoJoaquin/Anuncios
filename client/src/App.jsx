import { useState, useEffect } from "react";
import UserAnuncios from "./pages/@user/UserAnuncios";
import AdminAnuncios from "./pages/@admin/AdminAnuncios";
import CrearAnuncio from "./pages/@admin/CrearAnuncio";
import ModificarAnuncio from "./pages/@admin/ModificarAnuncios";
import Login from "./pages/@admin/Login";
import checkUser from "./assets/js/checkUser.js";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";
// import Home from "./pages/home/Home.jsx";
// import Nosotros from "./pages/home/Nosotros.jsx";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [userType, setUserType] = useState("user");

  useEffect(() => {
    // Obtener el valor de la cookie "userType"
    const userTypeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userType="));

    // Establecer el tipo de usuario
    if (userTypeCookie) {
      setUserType(userTypeCookie.split("=")[1]);
    }
  }, []);

  const handleNavigation = (path) => {
    setCurrentPath(path);
    window.location.href = path;
  };

  return (
    <>
      {userType !== "admin" ? (
        <>
          <Nav />
          {currentPath === "/" && <UserAnuncios />}
          {currentPath === "/login" && <Login />}
          {currentPath === "/home" && <Home />}
          {currentPath === '/nosotros' && <Nosotros/>}
          <Footer />
        </>
      ) : (
        <>
          <Nav />
          {currentPath === "/" && <AdminAnuncios />}
          {currentPath === "/login" && <Login />}
          {currentPath === "/admin/crearAnuncio" && <CrearAnuncio />}
          {currentPath === "/admin/editarAnuncio" && <ModificarAnuncio />}
          <Footer />
        </>
      )}
    </>
  );
}
