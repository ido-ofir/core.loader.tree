function set(name, path, value) {
    if (arguments.length < 3) {
        value = path;
        path = [];
    }
    if(!path) { path = []; }
    if (!this.isArray(path)) {
        path = [path];
    }
    return this.tree.set(['plugins', name].concat(path), value);
}

function get(name, path) {
    if(!path){ path = []; }
    if (!this.isArray(path)) {
        path = [path];
    }
    var p = ['plugins', name].concat(path);
    return this.tree.get(p);
}

function select(name, path) {
    if(!path) { path = []; }
    if (!this.isArray(path)) {
        path = [path];
    }
    return this.tree.select(['plugins', name].concat(path));
}

function namespace(name, path){
    if(!Array.isArray(path)){
        path = [path];
    }
    return ['plugins', name].concat(path)
}

function bind(name, path, render) {
    var result;
    if(this.isObject(path)){
        result = Object.assign({}, path);
        for(var m in result){
            result[m] = namespace(name, result[m]);
        }
    }
    else{
        result = namespace(name, path);
    }
    return this.bind(result, render);
}

module.exports = {
    name: 'core.loader.tree',
    dependencies: [
        'core.plugin.tree'
    ],
    init(definition, done) {

        var core = this;

        core.channels['core.plugin'].push(function (plugin, definition, next) {

            if (plugin && definition.tree) {
                var name = definition.name;
                if(!plugin.set) plugin.set = set.bind(core, name);
                if(!plugin.get) plugin.get = get.bind(core, name);
                if(!plugin.select) plugin.select = select.bind(core, name);
                if(!plugin.bind) plugin.bind = bind.bind(core, name);
                this.tree.set(['plugins', name], definition.tree);
            }

            next(plugin, definition);

        });

        done('√');

    }
};