window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            elements = [create(selectorOrArrayOrTemplate)]
            //创建div
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
            //查找div
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }
    // 三种情况，如果是传入html文本，就创建这个节点，如果是传入选择器，就查询对应的节点赋值给elements，如果是节点数组，直接赋值给elements。
    // elements是定义在函数外部的变量，函数内部使用，叫做闭包
    // elements也表示下面函数调用时作用的那个对象this，都是在对elements进行操作
    function create(string) {
        let element = document.createElement('template')
        element.innerHTML = string.trim()
        return element.content.firstChild
    }
    return {
        //创建新的节点
        jquery: true,
        elements: elements,
        remove() {
            this.each(
                (node) => {
                    node.parentNode.removeChild(node)
                }
            )
            return this
        },
        //删除当前节点,页面中删除，内存中还在，还可以进行其他操作。
        empty() {
            this.each((node) => {
                console.log(node)
                x = node.childNodes[0]
                while (node.childNodes.length !== 0) {
                    node.removeChild(x)
                    x = node.childNodes[0]
                }
            })
            return this
        },
        // 删除当前节点的所有后代，因为每次删除一个，节点的长度会变，所以不能使用for循环，采用while循环。
        text(string) {
            if (arguments.length === 0) {
                this.each((node) => {
                    console.log(node.innerText)
                })
            } else {
                this.each((node) => {
                    node.innerText += string
                })
            }
            return this
        },
        // 为当前节点添加文本，如果有参数就添加，没有参数就读取
        html(string) {
            if (arguments.length === 0) {
                this.each((node) => {
                    console.log(node.innerHTML)
                })
            } else {
                this.each((node) => {
                    node.innerHTML += string
                })
            }
            return this
        },
        // 为当前节点添加html文本，如果有参数就添加，没有参数就读取
        attr(name, value) {
            if (arguments.length === 1) {
                this.each((node) => {
                    console.log(node.getAttribute(name))
                })
            } else if (arguments.length === 2) {
                this.each((node) => {
                    node.setAttribute(name, value)
                })
            }
            return this
        },
        // 当前节点添加属性值，一个参数就读取，两个参数就更改或者设置
        css(name, value) {
            if (arguments.length === 2) {
                this.each((node) => {
                    console.log(node)
                    node.style[name] = value
                })
            } else if (arguments.length === 1) {
                this.each((node) => {
                    if (name instanceof Object) {
                        for (key in name) {
                            node.style[key] = name[key]
                        }
                    }
                    if (typeof name === 'string') {
                        console.log(node.style[name])
                    }
                })
            }
            return this
        },
        // 当前节点添加css样式，通过传递参数个数来进行读写操作，如果为两个参数，就添加样式，如果一个参数为对象，添加样式，如果一个参数为字符串，读样式
        appendTo(node) {
            let element = document.querySelector(node)
            this.each((node) => {
                element.appendChild(node)
            })
            return this
        },
        //将当前节点添加到一个节点中
        addClass(className) {
            this.each((node) => node.classList.add(className))
            return this
        },
        //为当前节点添加类名
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                let array2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(array2)
            }
            array.oldApi = this
            return jQuery(array)
        },
        //在当前节点内查找指定的节点

        parent() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            })

            return jQuery(array)
        },
        //查找当前节点的父亲
        children() {
            const array = []
            this.each((node) => {
                array.push(...node.children)
            })

            return jQuery(array)
        },
        //查找当前节点的孩子
        siblings() {
            let array = []
            this.each((node) => {
                let children = node.parentNode.children
                for (let i = 0; i < children.length; i++) {
                    if (children[i] !== node) {
                        array.push(children[i])
                    }
                }
            })

            return jQuery(array)
        },
        //查找当前节点的兄弟节点
        index() {
            const array = []
            this.each((node) => {
                let children = node.parentNode.children
                for (let i = 0; i < children.length; i++) {
                    if (children[i] === node) {
                        array.push(i)
                    }
                }
            })

            return array
        },
        //查找当前节点在其父亲节点中是第几个
        next() {
            const array = []
            this.each((node) => {
                array.push(node.nextSibling)
            })

            return jQuery(array)

        },
        //当前节点的下一个兄弟节点
        prev() {
            const array = []
            this.each((node) => {
                array.push(node.previousSibling)
            })

            return jQuery(array)
        },
        //当前节点的上一个兄弟节点
        on(eventName, fn) {
            this.each((node) => {
                node.addEventListener(eventName, fn)
            })
        },
        //添加事件处理
        off(eventName, fn) {
            this.each((node) => {
                node.removeEventListener(eventName, fn)
            })
        },
        // 移除事件处理
        each(fn) {
            console.log(elements)
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        // 遍历当前elements，闭包参数，就是我们操作的对象节点，
        // 因为你传入的选择器可能对应多个节点，因此在每次操作时，都看成数组操作，这里先封装遍历的方法。
        print() {
            console.log(elements)
        },
        // 打印出当前节点
        oldApi: selectorOrArrayOrTemplate.oldApi,
        end() {
            return this.oldApi
        },
        // 返回上一个节点

    }
}
//jQuery接受传递的选择器，返回一个对象（jQuery创造的对象），这个对象可以操作对应的元素。
//jQuery的闭包+链式风格

window.$ = window.jQuery


