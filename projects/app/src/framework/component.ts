import { ComponentOptions } from "./interfaces/component-options.interface";

export function Component ( componentOptions: ComponentOptions ): Function {
    const { tagName, styles, template } = componentOptions;

    return function ( constructor: CustomElementConstructor ) {
        const classWrapper = class extends constructor {
            constructor() {
                super();

                this.attachShadow({ mode: 'open' });

                const styleElement = document.createElement( 'style' );

                styleElement.innerHTML = styles;

                this.shadowRoot?.append( styleElement );

                const templateElement = document.createElement( 'span' );

                templateElement.innerHTML = template;

                this.shadowRoot?.append( ...templateElement.children );
            }
        };

        customElements.define( tagName, classWrapper );

        return classWrapper;
    };
}
