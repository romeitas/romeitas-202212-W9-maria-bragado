import { Component } from './component.js';

export class Header extends Component {
    template: string;
    constructor(public selector: string) {
        super();
        this.template = this.createTemplate();
        this.renderAdd(this.selector, this.template);
    }
    createTemplate() {
        return `<header class='header'>
        <img src="./assets/pokemon-logo.svg" alt="pokemon-logo">
        </header>
        <section class="section"></section>
        `;
    }
}
