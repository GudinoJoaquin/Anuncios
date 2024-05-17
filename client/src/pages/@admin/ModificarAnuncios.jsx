import { useState, useEffect } from "react";
import Input from "../../components/Input";

export default function ModificarAnuncio() {
  const urlParams = new URLSearchParams(window.location.search);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const id = urlParams.get("id") || "ID del anuncio";
  const titulo = urlParams.get("titulo") || "Titulo del Anuncio";

  const [anuncio, setAnuncio] = useState(null);

  const handleNavigation = (path) => {
    setCurrentPath(path);
    window.location.href = path;
  };

  useEffect(() => {
    const url = `http://localhost:1234/anuncios?id=${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setAnuncio(data[0]); // Establecer el anuncio encontrado con el ID dado
        } else {
          console.error("Anuncio no encontrado");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, titulo]); // Dependencia: id y titulo

  if (!anuncio) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se carga el anuncio
  }

  return (
    <>
      <header className="flex justify-center items-center gap-[50px] md:mt-[2px] mt-[20px] ml-[10px]">
        <button
          className="hover:text-emerald-600 hover:scale-[1.2] font-semibold text-[20px] transition duration-[.3s]"
          onClick={() => handleNavigation("http://localhost:5173/")}
        >
          Inicio
        </button>
        <button
          className="hover:text-orange-600 hover:scale-110 font-semibold text-[20px] transition duration-[.3s]"
          onClick={() =>
            handleNavigation("http://localhost:5173/admin/crearAnuncio")
          }
        >
          Crear anuncio
        </button>
        <button
          className="hover:text-red-600 hover:scale-110 font-semibold text-[20px] transition duration-[.3s]"
          onClick={() =>
            (window.location.href = "http://localhost:1234/logoff")
          }
        >
          Salir
        </button>
      </header>
      <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-200 p-8 rounded-lg shadow-md mt-[60px]">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Modificar anuncio
        </h2>

        <form method="post" action="http://localhost:1234/admin/editar-anuncio">
          <Input
            label="Titulo"
            type="text"
            name="titulo"
            value={anuncio.titulo}
            placeholder={anuncio.titulo}
          />

          <input type="hidden" name="anuncioID" value={anuncio.id} />

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="bio"
            >
              Mensaje
            </label>
            <textarea
              className="mt-1 p-2 w-full bg-gray-300 border-none focus:outline-none  rounded-md text-gray-900 resize-none"
              rows="3"
              name="mensaje"
              id="bio"
              defaultValue={anuncio.mensaje} // Usa defaultValue para establecer el valor inicial del textarea
            ></textarea>
          </div>

          <Input
            label="Imagen"
            type="text"
            name="imagen"
            placeholder="Insertar url de la imagen"
            value={anuncio.imagen}
          />

          <Input
            label="Contenido adjunto"
            type="text"
            name="adjunto"
            placeholder="Insertar enlace contenido adjunto"
            value={anuncio.contenido_adjunto}
          />

          <div className="flex justify-center mt-[20px]">
            <button
              className="bg-gray-900 border text-gray-200 px-4 py-2 font-bold rounded-md hover:bg-gray-300 hover:text-gray-900 hover:border border-gray-900 transition duration-[.3s]"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}