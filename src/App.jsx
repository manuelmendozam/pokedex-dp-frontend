import { useEffect, useState } from "react";
import "./App.css";

import { pokemonList } from './data/pokemons';

import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [mostrarCapturados, setMostrarCapturados] = useState(false);
  const [capturados, setCapturados] = useState([]);

  async function capturarPokemon(id) {
    await addDoc(collection(db, "capturados"), {
      pokemonId: id,
    });
  }

  async function liberarPokemon(id) {
    const q = query(collection(db, "capturados"), where("pokemonId", "==", id));

    const snapshot = await getDocs(q);

    snapshot.forEach(async (docItem) => {
      await deleteDoc(docItem.ref);
    });
  }

  async function obtenerCapturados() {
    const snapshot = await getDocs(collection(db, "capturados"));

    return snapshot.docs.map((doc) => doc.data().pokemonId);
  }

  useEffect(() => {
    async function cargar() {
      setPokemons(pokemonList);

      const capt = await obtenerCapturados();
      setCapturados(capt);
    }

    cargar();
  }, []);

  async function togglePokemon(pokemon) {
    if (capturados.includes(pokemon.id)) {
      await liberarPokemon(pokemon.id);
    } else {
      await capturarPokemon(pokemon.id);
    }

    const capt = await obtenerCapturados();
    setCapturados(capt);
  }

  const visibles = pokemons.filter((p) => {
    const isCaptured = capturados.includes(p.id);

    return mostrarCapturados ? true : !isCaptured;
  });

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
          {visibles.map((pokemon) => (
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
                  checked={capturados.includes(pokemon.id)}
                  onChange={() => togglePokemon(pokemon)}
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
