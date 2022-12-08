export class PokeApi {
    pokeUrl: string;
    constructor() {
        this.pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=8&offset=0';
    }
    getPoke(): Promise<Array<PokeApi>> {
        return fetch(this.pokeUrl).then((response) => response.json());
    }
}
