# core.loader.tree

load baobab cursor data from plugin definition

related to <a href="https://github.com/ido-ofir/core.plugin.tree">core.plugin.tree</a>

```js
let core = new require('core.constructor')();
 
core.plugin(
    require('core.plugin.tree'),
    require('core.loader.tree')
);

// plugins can now declare a tree on the plugin definition object:
core.plugin({
    name: 'test',
    tree: {
        a: 1,
        b: {
            c: 7
        }
    }
});

let { test } = core.plugins;

test.get('a'); // 1

test.set('a', 2);

test.get('a'); // 2

let cursor = test.select('b');
cursor.get('c'); // 7
cursor.get('c', 8);

// bind to plugin data inside components
core.Component({
    name: 'Test1',
    get(){
        return {
            render(){
                return test.bind('a', a => <div>{ a }</div>)
            }
        }
    }
});
```
