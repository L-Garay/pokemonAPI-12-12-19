import PokemonsController from "./Controllers/PokemonsController.js";

class App {
  pokemonsController = new PokemonsController();
}

window["app"] = new App();
