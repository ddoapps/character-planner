import { VirtualDOM } from "./virtual-dom";

function processStyles ( text: string|undefined ): HTMLStyleElement|null {
    let style: HTMLStyleElement|null = null;

    if ( text ) {
        style = document.createElement( 'style' );

        style.innerHTML = text;
    }

    return style;
}

function processTemplate ( text: string ): VirtualDOM {
    return new VirtualDOM( text );
}

export function Component ( componentOptions: ComponentOptions ): Function {
    let styleElement = processStyles( componentOptions.styles );
    let virtualDOM = processTemplate( componentOptions.template );
    
    return function ( constructor: CustomElementConstructor ) {
        const classWrapper = class extends constructor {
            private __shadowRoot: ShadowRoot;
            private __virtualDOM: VirtualDOM;

            constructor () {
                super();

                this.__shadowRoot = this.attachShadow( { mode: 'open' } );
                this.__virtualDOM = virtualDOM.clone();

                if ( styleElement ) {
                    this.__shadowRoot.append( styleElement.cloneNode( true ) );
                }

                this.__shadowRoot.append( this.__virtualDOM.render() );
            }
        };

        customElements.define( componentOptions.tagName, classWrapper );

        return classWrapper;
    };
}
