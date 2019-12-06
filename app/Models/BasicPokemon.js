export default class BasicPokemon {
  constructor(data) {
    this.url = data.url;
    this.name = data.name;
  }

  get listTemplate() {
    return `
    <div class="col-6" onclick="app.pokemonsController.getAPokemon('${this.url}')">${this.name}
    </div>
    `;
  }
}
