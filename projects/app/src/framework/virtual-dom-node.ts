export class VirtualDOMNode {
    children: Array<VirtualDOMNode>;
    classList: Array<string>;
    tagName: string;

    constructor ( element: Element ) {
        this.tagName = element.tagName;
        this.classList = [ ...element.classList ];
        this.children = [ ...element.children ].map( VirtualDOMNode.build );
    }

    static build ( element: Element ): VirtualDOMNode {
        return new VirtualDOMNode( element );
    }

    parseTemplate ( template: string ): void {
        const parser = document.createElement( 'span' );

        parser.innerHTML = template;

        this.children = [ ...parser.children ].map( VirtualDOMNode.build );
    }
}
