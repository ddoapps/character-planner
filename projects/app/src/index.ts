( () => {
    const styleTemplate = `
    `;

    class AppRoot extends HTMLElement {
        constructor () {
            super();

            this.attachShadow({ mode: 'open' });

            const style = document.createElement( 'style' );

            style.innerHTML = styleTemplate;

            this.shadowRoot?.append( style );
        }
    }

    customElements.define( 'app-root', AppRoot );
} )();
