
jQuery('.test').find('.child')
    .addClass('green')
    .addClass('aaa')
    .addClass('bbb') //find


const x2 = jQuery('.red').parent()
console.log(x2)

const x3 = jQuery('.test').children()
console.log(x3)
jQuery('.test').children().print()
let $div = $('#test')

$div.parent().print()
