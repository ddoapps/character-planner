import { VirtualDOMNode } from "./virtual-dom-node";

export class VirtualDOM {
    virtualDOMNode: VirtualDOMNode;

    constructor ( element: HTMLElement, template: string ) {
        this.virtualDOMNode = new VirtualDOMNode( element );

        this.virtualDOMNode.parseTemplate( template );
    }
}
