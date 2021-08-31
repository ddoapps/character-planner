import { VirtualDOMNode } from "./virtual-dom-node";

const domParser = new DOMParser();

export class VirtualDOM {
    domNode?: Node;
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

    render (): Node {
        if ( !this.domNode ) {
            if ( this.virtualDOMNode ) {
                this.domNode = this.virtualDOMNode.render();
            } else {
                this.domNode = document.createDocumentFragment();
            }
        }

        return this.domNode;
    }
}
