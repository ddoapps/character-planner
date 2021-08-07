const child_process = require( 'child_process' );
const { readFileSync } = require( 'fs' );
const ts = require( 'typescript' );

// ================================================================================================

deleteTheDistributionFolder();
compileTheTypescriptFiles();
copyTheStaticResourcesToTheDistributionFolder();

// ================================================================================================

function compileTheTypescriptFiles () {
    const configFileName = ts.findConfigFile( './', ts.sys.fileExists );
    const configFile = ts.readConfigFile( configFileName, ts.sys.readFile );
    const compilerOptions = ts.parseJsonConfigFileContent( configFile.config, ts.sys, './' );

    const program = ts.createProgram( {
        rootNames: [ './projects/app/src/components/app-root.component.ts' ],
        options: compilerOptions.options
    } );

    program.getSourceFiles()
        .filter( it => it.fileName.endsWith( '.component.ts' ) )
        .forEach( processComponent );

    program.emit();

    child_process.execSync( 'npx minify ./dist/index.js > ./dist/index.min.js' );
}

function copyTheStaticResourcesToTheDistributionFolder () {
    child_process.execSync( 'cp ./projects/app/src/index.html ./dist' );
    child_process.execSync( 'cp -r ./projects/app/assets ./dist' );
}

function deleteTheDistributionFolder () {
    child_process.execSync( 'rm -rf ./dist' );
}

function minifyCSS ( css ) {
    const replacements = [
        [ /(\/\*)([^*][^/])*(\*\/)/g, '' ],
        [ /\s*[:]\s*/g, ':' ],
        [ /\s*[{]\s*/g, '{' ],
        [ /\s*[}]\s*/g, '}' ],
        [ /\s*[;]\s*/g, ';' ],
        [ /\s*[,]\s*/g, ',' ],
        [ /[;][}]/g, '}' ]
    ];

    return replacements.reduce(
        ( value, [ regex, replacement ] ) => value.replace( regex, replacement ),
        css.trim()
    );
}

function processComponent ( componentSourceFile ) {
    const sourceFileDirectory = componentSourceFile.path.split( '/' ).slice( 0, -1 ).join( '/' ) + '/';
    const classStatement = componentSourceFile.statements.find( statement => statement.kind === ts.SyntaxKind.ClassDeclaration && statement.decorators );

    classStatement.decorators.forEach( decorator => {
        decorator.expression.arguments.forEach( argument => {
            argument.properties.forEach( property => {
                if ( [ 'styles', 'template' ].includes( property.name.text ) ) {
                    const propertyFile = property.initializer.text;
                    let propertyFileText = readFileSync( sourceFileDirectory + propertyFile ).toString().trim();

                    if ( property.name.text === 'styles' ) {
                        propertyFileText = minifyCSS( propertyFileText );
                    }

                    const newToken = ts.factory.createStringLiteral( propertyFileText );

                    property.initializer = newToken;
                }
            } );
        } );
    } );
}