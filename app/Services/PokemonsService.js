import Pokemon from "../Models/Pokemon.js";
import BasicPokemon from "../Models/BasicPokemon.js";
import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/LoganG"
});

// @ts-ignore
let _pokeAPi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/"
});
class PokemonsService {
  releasePokemon(id) {
    let pokemonToRelease = store.State.caughtPokemon.find(p => p._id == id);
    _sandBox.delete(`/pokemon/${id}`, pokemonToRelease).then(res => {
      this.getMyPokemon();
    });
    store.commit("activePokemon", {});
  }
  constructor() {
    this.getMyPokemon();
  }
  makeActive(name) {
    let activePokemon = store.State.caughtPokemon.find(p => p.name == name);
    store.commit("activePokemon", activePokemon);
  }
  catchPokemon() {
    let specificPokemon = store.State.activePokemon;
    _sandBox.post("/pokemon", specificPokemon).then(res => {
      this.getMyPokemon();
    });
  }

  async getMyPokemon() {
    try {
      await _sandBox.get("/pokemon").then(res => {
        let results = res.data.data.map(rawData => new Pokemon(rawData));
        store.commit("caughtPokemon", results);
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getPokemon() {
    let res = await _pokeAPi.get("pokemon?limit=100");
    debugger;
    store.commit(
      "pokemons",
      res.data.results.map(p => new BasicPokemon(p))
    );
    let pokemon = store.State.caughtPokemon;
    console.log(pokemon);
    store.commit("nextPokemonUrl", res.data.next);
    store.commit("previousPokemonUrl", res.data.previous);
  }
  async getAPokemon(url) {
    let res = await _pokeAPi.get(url);
    store.commit("activePokemon", new Pokemon(res.data));
  }

  async getMorePokemon() {
    let res = await _pokeAPi.get(store.State.nextPokemonUrl);
    store.commit(
      "pokemons",
      res.data.results.map(p => new BasicPokemon(p))
    );
    store.commit("nextPokemonUrl", res.data.next);
    store.commit("previousPokemonUrl", res.data.previous);
    let previous = store.State.previousPokemonUrl;
    console.log(previous);
  }

  async getPreviousPokemon() {
    let res = await _pokeAPi.get(store.State.previousPokemonUrl);
    debugger;
    store.commit(
      "pokemons",
      res.data.results.map(p => new BasicPokemon(p))
    );
    store.commit("nextPokemonUrl", res.data.next);
    store.commit("previousPokemonUrl", res.data.previous);
  }
}

const service = new PokemonsService();
export default service;
