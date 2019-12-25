import san,{DataTypes} from 'san';

let son = san.defineComponent({
    template:`
        <form>
            <span>子组件：</span>
            <input type="text" value="{=message=}" />
            <button type="button" on-click="sendMessage" >通知父组件</button>
        </form>
    `,
    sendMessage:function(){
        this.dispatch('dealMessage', this.data.get('message'));
    }
});

let father = san.defineComponent({
    template:`
        <div>
            <slot var-message="{{message}}"></slot>
            <h3 class="{{className}}">{{prefix}}:{{message}}</h3>
        </div>
    `,
    messages:{
        'dealMessage':function(value){
            this.data.set('message', value.value);
            this.dispatch('dealMessage', value.value);
        }
    },
    initData:function(){
        return {
            message:'静静等待用户输入'
        }
    }
});

let San = san.defineComponent({
    components:{
        'son':son,
        'father':father
    },
    template:`
        <div>
            <father  className="{{father2.className}}" prefix="{{father2.prefix}}" >
                <father className="{{father1.className}}" prefix="{{father1.prefix}}" >
                    <son></son>
                </father>
            </father>
        </div>
    `,
    initData:function(){
        return {
            father1:{
                className:'green',
                prefix:'我是父组件'
            },
            father2:{
                className:'red',
                prefix:'我是更高层父组件'
            }
        }
    }
});

let myApp = new San({});
myApp.attach(document.body);