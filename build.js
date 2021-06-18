const child_process = require( 'child_process' );
const ts = require( 'typescript' );

// ================================================================================================

deleteTheDistributionFolder();
compileTheTypescriptFiles();
copyTheStaticResourcesToTheDistributionFolder();

// ================================================================================================

function compileTheTypescriptFiles () {
    child_process.execSync( 'npx tsc' );
    child_process.execSync( 'npx minify ./dist/index.js > ./dist/index.min.js' );
}

function copyTheStaticResourcesToTheDistributionFolder () {
    child_process.execSync( 'cp ./projects/app/src/index.html ./dist' );
    child_process.execSync( 'cp -r ./projects/app/assets ./dist' );
}

function deleteTheDistributionFolder () {
    child_process.execSync( 'rm -rf ./dist' );
}
