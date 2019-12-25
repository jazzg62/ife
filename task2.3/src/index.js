import san,{DataTypes} from 'san';

let San = san.defineComponent({
    // 使用style来实现元素控制
    // template: `
    //     <div id="block" style="background:{{isblue?'blue':'red'}};width:100px;height:100px;" on-click="toggle"></div>
    // `,

    // 使用class来实现元素控制
    template: `
        <div id="block" style="width:100px;height:100px;" class="{{isblue?'blue':'red'}}" on-click="toggle"></div>
    `,
    initData:function(){
        return {
            isblue:true
        }
    },
    toggle:function(){
        if(this.data.get('isblue'))
            this.data.set('isblue', false);
        else
            this.data.set('isblue', true);
    }
})
let myApp = new San();
myApp.attach(document.body);