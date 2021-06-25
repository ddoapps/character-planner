import { ComponentOptions } from "./interfaces/component-options.interface";
import { VirtualDOM } from "./virtual-dom";

export function Component ( componentOptions: ComponentOptions ): Function {
    return function ( constructor: CustomElementConstructor ) {
        const classWrapper = class extends constructor {
            private __shadowRoot: ShadowRoot;
            //@ts-ignore
            private __virtualDOM: VirtualDOM;

            constructor() {
                super();

                this.__shadowRoot = this.attachShadow({ mode: 'open' });
                this.__virtualDOM = new VirtualDOM( this, componentOptions.template );

                this.initializeStyles();
            }

            private initializeStyles (): void {
                if ( !componentOptions.styles ) return;

                const styleElement = document.createElement( 'style' );

                styleElement.innerHTML = componentOptions.styles;

                this.__shadowRoot.append( styleElement );
            }
        };

        customElements.define( componentOptions.tagName, classWrapper );

        return classWrapper;
    };
}
