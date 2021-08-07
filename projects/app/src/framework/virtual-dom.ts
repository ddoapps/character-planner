import { VirtualDOMNode } from "./virtual-dom-node";

const domParser = new DOMParser();

export class VirtualDOM {
    virtualDOMNode?: VirtualDOMNode;

    constructor ( template?: string ) {
        if ( template ) {
            const document = domParser.parseFromString( template, 'text/html' );

            this.virtualDOMNode = VirtualDOMNode.build( document.body.firstChild );
        }
    }

    clone (): VirtualDOM {
        const virtualDOM = new VirtualDOM();

        virtualDOM.virtualDOMNode = this.virtualDOMNode?.clone();

        return virtualDOM;
    }

    render (): DocumentFragment {
        const fragment = document.createDocumentFragment();

        if ( this.virtualDOMNode ) {
            fragment.appendChild( this.virtualDOMNode.render() );
        }

        return fragment;
    }
}
