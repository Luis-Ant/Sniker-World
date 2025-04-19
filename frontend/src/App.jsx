import React from "react";

function App() {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold text-blue-600">¡Hola desde React!</h2>
      <p className="text-gray-700">
        Este es un componente con estilos de Tailwind CSS.
      </p>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Haz clic aquí
      </button>
    </div>
  );
}

export default App;
