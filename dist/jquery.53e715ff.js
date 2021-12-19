// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"jquery.js":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.jQuery = function (selectorOrArrayOrTemplate) {
    var elements = void 0;
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            elements = [create(selectorOrArrayOrTemplate)];
            //创建div
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
            //查找div
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate;
    }
    // 三种情况，如果是传入html文本，就创建这个节点，如果是传入选择器，就查询对应的节点赋值给elements，如果是节点数组，直接赋值给elements。
    // elements是定义在函数外部的变量，函数内部使用，叫做闭包
    // elements也表示下面函数调用时作用的那个对象this，都是在对elements进行操作
    function create(string) {
        var element = document.createElement('template');
        element.innerHTML = string.trim();
        return element.content.firstChild;
    }
    return {
        //创建新的节点
        jquery: true,
        elements: elements,
        remove: function remove() {
            this.each(function (node) {
                node.parentNode.removeChild(node);
            });
            return this;
        },

        //删除当前节点,页面中删除，内存中还在，还可以进行其他操作。
        empty: function empty() {
            this.each(function (node) {
                console.log(node);
                x = node.childNodes[0];
                while (node.childNodes.length !== 0) {
                    node.removeChild(x);
                    x = node.childNodes[0];
                }
            });
            return this;
        },

        // 删除当前节点的所有后代，因为每次删除一个，节点的长度会变，所以不能使用for循环，采用while循环。
        text: function text(string) {
            if (arguments.length === 0) {
                this.each(function (node) {
                    console.log(node.innerText);
                });
            } else {
                this.each(function (node) {
                    node.innerText += string;
                });
            }
            return this;
        },

        // 为当前节点添加文本，如果有参数就添加，没有参数就读取
        html: function html(string) {
            if (arguments.length === 0) {
                this.each(function (node) {
                    console.log(node.innerHTML);
                });
            } else {
                this.each(function (node) {
                    node.innerHTML += string;
                });
            }
            return this;
        },

        // 为当前节点添加html文本，如果有参数就添加，没有参数就读取
        attr: function attr(name, value) {
            if (arguments.length === 1) {
                this.each(function (node) {
                    console.log(node.getAttribute(name));
                });
            } else if (arguments.length === 2) {
                this.each(function (node) {
                    node.setAttribute(name, value);
                });
            }
            return this;
        },

        // 当前节点添加属性值，一个参数就读取，两个参数就更改或者设置
        css: function css(name, value) {
            if (arguments.length === 2) {
                this.each(function (node) {
                    console.log(node);
                    node.style[name] = value;
                });
            } else if (arguments.length === 1) {
                this.each(function (node) {
                    if (name instanceof Object) {
                        for (key in name) {
                            node.style[key] = name[key];
                        }
                    }
                    if (typeof name === 'string') {
                        console.log(node.style[name]);
                    }
                });
            }
            return this;
        },

        // 当前节点添加css样式，通过传递参数个数来进行读写操作，如果为两个参数，就添加样式，如果一个参数为对象，添加样式，如果一个参数为字符串，读样式
        appendTo: function appendTo(node) {
            var element = document.querySelector(node);
            this.each(function (node) {
                element.appendChild(node);
            });
            return this;
        },

        //将当前节点添加到一个节点中
        addClass: function addClass(className) {
            this.each(function (node) {
                return node.classList.add(className);
            });
            return this;
        },

        //为当前节点添加类名
        find: function find(selector) {
            var array = [];
            for (var i = 0; i < elements.length; i++) {
                var array2 = Array.from(elements[i].querySelectorAll(selector));
                array = array.concat(array2);
            }
            array.oldApi = this;
            return jQuery(array);
        },

        //在当前节点内查找指定的节点

        parent: function parent() {
            var array = [];
            this.each(function (node) {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode);
                }
            });

            return jQuery(array);
        },

        //查找当前节点的父亲
        children: function children() {
            var array = [];
            this.each(function (node) {
                array.push.apply(array, _toConsumableArray(node.children));
            });

            return jQuery(array);
        },

        //查找当前节点的孩子
        siblings: function siblings() {
            var array = [];
            this.each(function (node) {
                var children = node.parentNode.children;
                for (var i = 0; i < children.length; i++) {
                    if (children[i] !== node) {
                        array.push(children[i]);
                    }
                }
            });

            return jQuery(array);
        },

        //查找当前节点的兄弟节点
        index: function index() {
            var array = [];
            this.each(function (node) {
                var children = node.parentNode.children;
                for (var i = 0; i < children.length; i++) {
                    if (children[i] === node) {
                        array.push(i);
                    }
                }
            });

            return array;
        },

        //查找当前节点在其父亲节点中是第几个
        next: function next() {
            var array = [];
            this.each(function (node) {
                array.push(node.nextSibling);
            });

            return jQuery(array);
        },

        //当前节点的下一个兄弟节点
        prev: function prev() {
            var array = [];
            this.each(function (node) {
                array.push(node.previousSibling);
            });

            return jQuery(array);
        },

        //当前节点的上一个兄弟节点
        on: function on(eventName, fn) {
            this.each(function (node) {
                node.addEventListener(eventName, fn);
            });
        },

        //添加事件处理
        off: function off(eventName, fn) {
            this.each(function (node) {
                node.removeEventListener(eventName, fn);
            });
        },

        // 移除事件处理
        each: function each(fn) {
            console.log(elements);
            for (var i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i);
            }
            return this;
        },

        // 遍历当前elements，闭包参数，就是我们操作的对象节点，
        // 因为你传入的选择器可能对应多个节点，因此在每次操作时，都看成数组操作，这里先封装遍历的方法。
        print: function print() {
            console.log(elements);
        },

        // 打印出当前节点
        oldApi: selectorOrArrayOrTemplate.oldApi,
        end: function end() {
            return this.oldApi;
        }
    };
};
//jQuery接受传递的选择器，返回一个对象（jQuery创造的对象），这个对象可以操作对应的元素。
//jQuery的闭包+链式风格

window.$ = window.jQuery;
},{}],"C:\\Users\\86155\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '64833' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:\\Users\\86155\\AppData\\Local\\Yarn\\Data\\global\\node_modules\\parcel\\src\\builtins\\hmr-runtime.js","jquery.js"], null)
//# sourceMappingURL=/jquery.53e715ff.map