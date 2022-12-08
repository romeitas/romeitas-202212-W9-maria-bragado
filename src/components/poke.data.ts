/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '../components/component.js';
import { Pokes } from '../models/poke.interface.js';
import { PokeApi } from '../services/poke.api.js';

export class PokeData extends Component {
    template!: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pokes: any;
    pokesInfo: Array<string>;
    api: PokeApi;
    pageData: Array<number>;

    constructor(public selector: string) {
        super();
        this.api = new PokeApi();
        this.pokes = [];
        this.pokesInfo = [];
        this.FetchData();
        this.pageData = [8, 0];
    }

    async FetchData() {
        this.pokes = await this.api.getPoke();
        this.pageData[1] = this.pokes.count;

        const pokemonArray: Array<string> = [];
        this.pokes.results.forEach((item: Pokes) => {
            pokemonArray.push(item.url);
        });

        this.pokesInfo = await Promise.all(
            pokemonArray.map((url: string) => fetch(url).then((r) => r.json()))
        );

        this.manageComponent();
    }

    manageComponent() {
        this.template = this.createTemplate();
        this.render(this.selector, this.template);
    }

    createTemplate() {
        this.template = '';
        this.pokesInfo.forEach((pokemon: any) => {
            this.template += `<div class = "pokemon">`;
            this.template += `<h2 class="pokemon__h2">${pokemon.species.name}</h2>`;
            this.template += `<img src="${pokemon.sprites.other.dream_world.front_default}" alt="Pokemon Image" id = "${pokemon.species.name}" width="100" class="pokemon__img"/>`;
            this.template += `</div>`;
        });
        this.template += `<div class='pokemon__buttons'><button type="submit" class="pokemon__buttons__prev"><</button>`;
        this.template += `<p class='pokemon__buttons__p'>${this.pageData[0]} / ${this.pageData[1]}</p>`;
        this.template += `<button type="submit" class="pokemon__buttons__next">></button></div>`;
        return this.template;
    }
}
