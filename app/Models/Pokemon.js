export default class Pokemon {
  constructor(data) {
    this._id = data._id || "";
    this.name = data.name;
    this.img = data.img || data.sprites.front_default;
    this.weight = data.weight;
    this.height = data.height;
    this.types = data.types;

    if (typeof this.types[0] == "object") {
      this.types = data.types.map(t => {
        return t.type.name;
      });
    }
  }

  get caughtTemplate() {
    return `
    <div class="col-6">
      <p onclick="app.pokemonsController.makeActive('${this.name}')">${this.name}</p>
    </div>
    `;
  }

  get currentTemplate() {
    let template = `
    <div class="col-6 img">
      <img src="${this.img}" alt="does not work"/>
    </div>
    <div class="col-6">
      <h3>${this.name}</h3>
      <p>Height: ${this.height} and Weight: ${this.weight}</p>
      <p>Types: ${this.types}</p>
    </div>`;

    if (this._id) {
      template += `<button onclick="app.pokemonsController.releasePokemon('${this._id}')">Release</button>`;
    } else {
      template += `<button onclick="app.pokemonsController.catchPokemon('${this.name}')">Catch</button>`;
    }
    return template;
  }
}
