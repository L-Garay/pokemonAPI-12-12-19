import PokemonssService from "../Services/PokemonsService.js";
import store from "../store.js";

//Private
function _drawList() {
  let listTemplate = "";
  let listArr = store.State.pokemons;
  listArr.forEach(pokemon => (listTemplate += pokemon.listTemplate));
  document.querySelector("#poke-list").innerHTML = listTemplate;
}
// function _drawCaught() {
//   let caught = store.State.caughtPokemon;
//   console.log(caught);
// }
function _drawCaught() {
  let caughtTemplate = "";
  let caughtArr = store.State.caughtPokemon;
  caughtArr.forEach(pokemon => (caughtTemplate += pokemon.caughtTemplate));
  document.querySelector("#caught-list").innerHTML = caughtTemplate;
}

//Public
export default class PokemonsController {
  constructor() {
    store.subscribe("pokemons", _drawList);
    // store.subscribe("caughtPokemon", _drawCaught);
    store.subscribe("caughtPokemon", _drawCaught);
    store.subscribe("activePokemon", this.displayActive);
    // store.subscribe("nextPokemonUrl", _drawList);
    // store.subscribe("previousPokemonUrl", _drawList);
  }

  async getPokemon() {
    try {
      await PokemonssService.getPokemon();
    } catch (e) {
      console.error(e);
    }
  }

  async getAPokemon(url) {
    try {
      PokemonssService.getAPokemon(url);
    } catch (e) {}
  }

  makeActive(name) {
    PokemonssService.makeActive(name);
  }

  async displayActive() {
    if (store.State.activePokemon._id || store.State.activePokemon._id == "") {
      try {
        let pokemontoShow = store.State.activePokemon;

        document.querySelector("#pokemon-info").innerHTML =
          pokemontoShow.currentTemplate;
      } catch (e) {}
    } else {
      document.querySelector("#pokemon-info").innerHTML = "";
    }
  }

  async catchPokemon(name) {
    try {
      PokemonssService.catchPokemon();
    } catch (e) {
      console.error(e);
    }
  }

  async releasePokemon(id) {
    try {
      PokemonssService.releasePokemon(id);
    } catch (e) {
      console.error(e);
    }
  }

  async getMorePokemon() {
    try {
      PokemonssService.getMorePokemon();
    } catch (e) {
      console.error(e);
    }
  }

  async getPreviousPokemon() {
    try {
      PokemonssService.getPreviousPokemon();
    } catch (e) {
      console.error(e);
    }
  }
}
