interface VirtualDOMAttribute {
    name: string;
    value: string;
}

export class VirtualDOMNode {
    attributes?: VirtualDOMAttribute[];
    children?: VirtualDOMNode[];
    classList?: string[];
    nodeName?: string;
    textContent?: string|null;

    constructor ( node?: ChildNode|null ) {
        if ( !node ) return;

        if ( node instanceof HTMLElement ) {
            this.nodeName = node.nodeName;
            this.classList = [ ... ( node as HTMLElement ).classList ];
            this.children = ( [ ... node.childNodes ] ?? [] ).map( VirtualDOMNode.build );

            [ ... node.attributes ].forEach( ( { name, value } ) => {
                if ( name !== 'class' ) {
                    this.attributes?.push( { name, value } );
                }
            } );
        } else if ( node.nodeType === Node.TEXT_NODE ) {
            this.textContent = node.textContent;
        }
    }

    static build ( node: ChildNode|null ): VirtualDOMNode {
        return new VirtualDOMNode( node );
    }

    clone (): VirtualDOMNode {
        const virtualDOMNode = new VirtualDOMNode();

        if ( this.attributes ) {
            virtualDOMNode.attributes = this.attributes.map( it => ( { ... it } ) );
        }

        virtualDOMNode.children = this.children?.map( it => it.clone() );
        virtualDOMNode.classList = this.classList?.slice( 0 );
        virtualDOMNode.nodeName = this.nodeName;
        virtualDOMNode.textContent = this.textContent;

        return virtualDOMNode;
    }

    render (): DocumentFragment {
        const fragment = document.createDocumentFragment();

        if ( this.nodeName ) {
            const element = document.createElement( this.nodeName );
            
            this.attributes?.forEach( ( { name, value } ) => element.setAttribute( name, value )  );
            this.classList?.forEach( className => element.classList.add( className ) );
            this.children?.forEach( child => element.appendChild( child.render() ) );
            
            fragment.appendChild( element );
        } else if ( this.textContent ) {
            fragment.appendChild( document.createTextNode( this.textContent ) );
        }

        return fragment;
    }
}
