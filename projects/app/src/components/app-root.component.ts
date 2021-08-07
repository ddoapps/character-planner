import { Component } from "../framework/component";

@Component({
    tagName:  'app-root',
    styles:   'app-root.component.css',
    template: 'app-root.component.html'
})
export class AppRootComponent extends HTMLElement {
    constructor () {
        super();
    }
}
