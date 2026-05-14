import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [mostrarCapturados, setMostrarCapturados] = useState(false);

  async function obtenerPokemons() {
    const response = await fetch("http://localhost:3001/pokemons");

    const data = await response.json();

    setPokemons(data);
  }

  useEffect(() => {
    obtenerPokemons();
  }, []);

  async function toggleCapturado(pokemon) {
    if (pokemon.capturado) {
      await fetch(`http://localhost:3001/capturar/${pokemon.id}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`http://localhost:3001/capturar/${pokemon.id}`, {
        method: "POST",
      });
    }

    obtenerPokemons();
  }

  const pokemonsFiltrados = mostrarCapturados
    ? pokemons
    : pokemons.filter((pokemon) => !pokemon.capturado);

  return (
    <div className="container">
      <h1>Pokédex</h1>

      <label className="toggle">
        <input
          type="checkbox"
          checked={mostrarCapturados}
          onChange={() => setMostrarCapturados(!mostrarCapturados)}
        />
        Mostrar capturados
      </label>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Capturado</th>
          </tr>
        </thead>

        <tbody>
          {pokemonsFiltrados.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>

              <td>
                <img src={pokemon.imagen} alt={pokemon.nombre} />
              </td>

              <td>
                <a href={pokemon.url} target="_blank" rel="noopener noreferrer">
                  {pokemon.nombre}
                </a>
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={pokemon.capturado}
                  onChange={() => toggleCapturado(pokemon)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
