export class VirtualDOMNode {
    attributes?: VirtualDOMAttribute[];
    children?: VirtualDOMNode[];
    classList?: string[];
    domNode?: Node;
    nodeName?: string;
    textContent?: string|null;

    constructor ( node?: ChildNode|null ) {
        if ( !node ) return;

        if ( node instanceof HTMLElement ) {
            this.nodeName = node.nodeName;
            this.classList = [ ... ( node as HTMLElement ).classList ];
            this.children = ( [ ... node.childNodes ] ?? [] ).map( VirtualDOMNode.build );

            [ ... node.attributes ].reduce( ( attributes: VirtualDOMAttribute[], attribute ) => {
                if ( attribute.name !== 'class' ) {
                    attributes.push( { name: attribute.name, value: attribute.value } );
                }

                return attributes;
            }, this.attributes = [] );
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

    render (): Node {
        if ( !this.domNode ) {
            if ( this.nodeName ) {
                const element = document.createElement( this.nodeName );
                
                this.attributes?.forEach( ( { name, value } ) => element.setAttribute( name, value )  );
                this.classList?.forEach( className => element.classList.add( className ) );
                this.children?.forEach( child => element.appendChild( child.render() ) );
                
                this.domNode = element;
            } else if ( this.textContent ) {
                this.domNode = document.createTextNode( this.textContent );
            } else {
                this.domNode = document.createDocumentFragment();
            }
        }

        return this.domNode;
    }
}
