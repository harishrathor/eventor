const moduleAlias = require('module-alias');
const path = require('path');
//const clientRoot = path.resolve('..', 'web-client', 'mean-crud', 'dist', 'mean-crud');
const clientRoot = path.resolve('..', 'web-client', 'eventor');
const srcPath = __dirname;
const serverRoot = path.resolve('..');
const clientAssets = path.join(clientRoot, 'assets');
const serverAssets = path.resolve('..', 'assets');
const modulesPath = path.join(srcPath, 'modules');
const dbPath = path.join(srcPath, 'db');
const routesPath = path.join(srcPath, 'routes');
const configsPath = path.join(srcPath, 'configs');

const pathsArr = [
    {
        moduleAlias     : null,
        pathName        : 'SERVER_ROOT',
        path            : serverRoot
    },
    {
        moduleAlias     : null,
        pathName        : 'CLIENT_ROOT',
        path            : clientRoot
    },
    {
        moduleAlias     : null,
        pathName        : 'CLIENT_ASSETS',
        path            : clientAssets
    },
    {
        moduleAlias     : null,
        pathName        : 'SERVER_ASSETS',
        path            : serverAssets
    },
    {
        moduleAlias     : null,
        pathName        : 'SRC_PATH',
        path            : srcPath
    },
    {
        moduleAlias     : '@modules',
        pathName        : 'MODULES_PATH',
        path            : modulesPath
    },
    {
        moduleAlias     : '@db',
        pathName        : 'DB_PATH',
        path            : dbPath
    },
    {
        moduleAlias     : '@routes',
        pathName        : 'ROUTES_PATH',
        path            : routesPath
    },
    {
        moduleAlias     : '@configs',
        pathName        : 'CONFIGS',
        path            : configsPath
    }
    
];

let pathsObj = {};
let moduleAliasObj = {};

for (const path of pathsArr) {
    const mAlias = path.moduleAlias;
    const pathName = path.pathName;
    const pathDir = path.path;
    pathsObj[pathName] = pathDir;
    if (mAlias) {
        moduleAliasObj[mAlias] = pathDir;
    }
}
moduleAlias.addAliases(moduleAliasObj);
module.exports = pathsObj;