import san from 'san';

let San = san.defineComponent({
    'template': '<p>{{welcome}}</p>',

    initData: function(){
        return {
            welcome: 'Hello world!'
        }
    }
})
let myApp = new San();
myApp.attach(document.body);