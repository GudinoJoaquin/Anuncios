import React, { useState, useEffect } from "react";
import AdminCard from "../../components/AdminCard";
import ThemeSwitch from "../../components/ThemeSwitch";

export default function AdminAnuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const anunciosPerPage = 5;

  useEffect(() => {
    const url = "http://localhost:1234/anuncios";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAnuncios(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  // Calcular el índice del último anuncio de la página actual
  const indexOfLastAd = currentPage * anunciosPerPage;
  // Calcular el índice del primer anuncio de la página actual
  const indexOfFirstAd = indexOfLastAd - anunciosPerPage;
  // Obtener los anuncios de la página actual
  const currentAds = anuncios.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className="bg-white dark:bg-slate-900 ">
      <header className="flex justify-center items-center gap-[50px] md:translate-y-[2px] translate-y-[20px] ml-[10px] dark:text-slate-200">
        <button
          className="text-emerald-600 scale-[1.2] font-bold text-[20px] transition duration-[.3s]"
          onClick={() => handleNavigation("http://localhost:5173/")}
        >
          Inicio
        </button>
        <button
          className="hover:text-orange-700 hover:scale-110 font-semibold text-[20px] transition duration-[.3s]"
          onClick={() =>
            handleNavigation("http://localhost:5173/admin/crearAnuncio")
          }
        >
          Crear anuncio
        </button>
        <button
          className="hover:text-red-800 hover:scale-110 font-semibold text-[20px] transition duration-[.3s]"
          onClick={() =>
            (window.location.href = "http://localhost:1234/logoff")
          }
        >
          Salir
        </button>
      </header>
      <ThemeSwitch />
      <div className="flex justify-center items-center gap-2 mb-[-50px] mt-[20px]">
        {Array.from(
          { length: Math.ceil(anuncios.length / anunciosPerPage) },
          (_, i) => (
            <button
              className="dark:text-slate-200 dark:hover:bg-blue-900 font-semibold underline underline-offset-2 p-[4px] my-2 rounded-sm hover:scale-[1.2] hover:bg-red-100 transition duration-[.3s]"
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {currentAds.map((anuncio) => (
        <AdminCard
          key={anuncio.id}
          id={anuncio.id}
          img={anuncio.imagen}
          titulo={anuncio.titulo}
          mensaje={anuncio.mensaje}
          fecha={anuncio.fecha}
          adjunto={anuncio.contenido_adjunto}
        />
      ))}
      {/* Botones de paginación */}
      <div className="flex justify-center items-center gap-2">
        {Array.from(
          { length: Math.ceil(anuncios.length / anunciosPerPage) },
          (_, i) => (
            <button
              className="dark:text-slate-200 dark:hover:bg-blue-900 font-semibold underline underline-offset-2 p-[4px] my-2 rounded-sm hover:scale-[1.2] hover:bg-red-100 transition duration-[.3s]"
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}