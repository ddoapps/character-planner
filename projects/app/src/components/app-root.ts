( ( customElementRegistry: CustomElementRegistry ) => {
    class AppRoot extends HTMLElement {
        constructor () {
            super();
        }
    }
    
    customElementRegistry.define( 'app-root', AppRoot );    
} )( customElements );
