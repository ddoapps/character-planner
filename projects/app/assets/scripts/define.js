window.define = (() => {
    const namespaces = {};

    return function ( namespace, requirements, callback ) {
        namespaces[ namespace ] = namespaces[ namespace ] || {};
        
        callback( null, namespaces[ namespace ], ...requirements.slice( 2 ).map( it => namespaces[ it ] ) );
    }
})();
