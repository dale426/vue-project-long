/**
 * Created by admin on 2017/7/29.
 */
var bodyParser = require('body-parser');
var chokidar = require('chokidar');
var chalk = require('chalk');
var getPaths = require('./paths');
const fs = require('fs');
const CONFIG_FILE = 'mock.js';
const paths = getPaths(process.cwd());
var  proxy =require('express-http-proxy');
var  assert =require('assert');
var  url =require('url');
function getConfig(filePath) {
    const resolvedFilePath = paths.resolveApp(filePath);
    if (fs.existsSync(resolvedFilePath)) {
        const files = [];
        const realRequire = require.extensions['.js'];
        require.extensions['.js'] = (m, filename) => {
            if (filename.indexOf(paths.appNodeModules) === -1) {
                files.push(filename);
            }
            delete require.cache[filename];
            return realRequire(m, filename);
        };

        const config = require(resolvedFilePath);  // eslint-disable-line
        require.extensions['.js'] = realRequire;
        return { config, files };
    } else {
        return {
            config: {},
            files: [resolvedFilePath],
        };
    }
}

module.exports = function mockApi (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    const ret = getConfig(CONFIG_FILE);
    const config = ret.config;
    const files = ret.files;
    // for (let k in config) {
    //    let router = k.split(' ')
    //    app[router[0].toLocaleLowerCase()](router[1], function (req, res) {
    //        config[k](req, res)
    //    })
    // }
    Object.keys(config).forEach((key) => {
        const keyParsed = parseKey(key);
        assert(
            !!app[keyParsed.method],
            `method of ${key} is not valid`
        );
        assert(
            typeof config[key] === 'function' ||
            typeof config[key] === 'object' ||
            typeof config[key] === 'string',
            `mock value of ${key} should be function or object or string, but got ${typeof config[key]}`
        );
        if (typeof config[key] === 'string') {
            let path = keyParsed.path;
            if (/\(.+\)/.test(keyParsed.path)) {
                path = new RegExp(`^${keyParsed.path}$`);
            }
            app.use(
                path,
                createProxy(keyParsed.method, path, config[key])
            );
        } else {
            app[keyParsed.method](
                keyParsed.path,
                createMockHandler(keyParsed.method, keyParsed.path, config[key])
            );
        }
    });
    // 调整 stack，把 historyApiFallback 放到最后
    let lastIndex = null;
    app._router.stack.forEach((item, index) => {
        if (item.name === 'webpackDevMiddleware') {
            lastIndex = index;
        }
    });
    const mockAPILength = app._router.stack.length - 1 - lastIndex;
    if (lastIndex && lastIndex > 0) {
        const newStack = app._router.stack;
        newStack.push(newStack[lastIndex - 1]);
        newStack.push(newStack[lastIndex]);
        newStack.splice(lastIndex - 1, 2);
        app._router.stack = newStack;
    }
    const watcher = chokidar.watch(files, {
        ignored: /node_modules/,
        persistent: true,
    });
    watcher.on('change', (path) => {
        console.log(chalk.green('CHANGED'), path.replace(paths.appDirectory, '.'));
        watcher.close();

        // 删除旧的 mock api
        app._router.stack.splice(lastIndex - 1, mockAPILength);

        mockApi(app);
    });
}
function parseKey(key) {
    let method = 'get';
    let path = key;

    if (key.indexOf(' ') > -1) {
        const splited = key.split(' ');
        method = splited[0].toLowerCase();
        path = splited[1];
    }

    return { method, path };
}
function createMockHandler(method, path, value) {
    return function mockHandler(...args) {
        const res = args[1];
        if (typeof value === 'function') {
            value(...args);
        } else {
            res.json(value);
        }
    };
}

function createProxy(method, path, target) {
    return proxy(target, {
        filter(req) {
            return method ? req.method.toLowerCase() === method.toLowerCase() : true;
        },
        forwardPath(req) {
            let matchPath = req.baseUrl;
            const matches = matchPath.match(path);
            if (matches.length > 1) {
                matchPath = matches[1];
            }
            return join((url.parse(target).path), matchPath);
        },
    });
}
