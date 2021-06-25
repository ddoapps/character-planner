import { Component } from "../framework/component";

const styles = `
    span {
        background-color: rgba(var(--app-color-black-rgb), 0.90);
        min-height: 640px;
        height: 100vh;
        min-width: 360px;
        width: 100vw;
    }
`;

const template = `
    <div>Hello</div>
`;

@Component({
    tagName: 'app-root',
    styles,
    template
})
export class AppRootComponent extends HTMLElement {
    constructor () {
        super();
    }
}
