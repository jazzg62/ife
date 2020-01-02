import san from 'san';

let item = san.defineComponent({
    template:`
        <li>
            <span on-click="onclick">{{index+'.'}}{{name}}</span>
            <textarea  s-if="show" s-transition="hooks">{{description}}</textarea>
        </li>
    `,
    initData:function(){
        return {
            show:false
        }
    },
    onclick:function(){
        this.data.set('show', !this.data.get('show'));
    },
    hooks:{
        enter(el, done){
            let total = 30;
            let curr = 0;
            el.style.opacity = 0;
            el.style.height = '0px';
            function goStep(){
                if(curr>total){
                    el.style.opacity = 1;
                    el.style.height = '50px';
                    done();
                    return ;
                }
                el.style.height = 50/total*curr+'px';
                el.style.opacity = 1/total*curr++;
                requestAnimationFrame(goStep);
            }
            goStep();
        },
        leave(el, done){
            let total = 30;
            let curr = 0;
            el.style.opacity = 1;
            el.style.height = '50px';
            function goStep(){
                if(curr>total){
                    el.style.opacity = 0;
                    el.style.height = '0px';
                    done();
                    return ;
                }
                el.style.height = 50-50/total*curr+'px';
                el.style.opacity = 1-1/total*curr++;                
                requestAnimationFrame(goStep);
            }
            goStep();
        }
    }
})


let app = san.defineComponent({
    components:{
        'item':item
    },
    template:`
        <ul>
            <item s-for="item,index in items" index="{{index+1}}" name="{{item.name}}" description="{{item.description}}"></item>
            <input type="text" placeholder="请输入任务名：" value="{=name=}"/>
            <textarea value="{=description=}"></textarea>
            <button type="button" on-click="onclick">添加新任务</button>
        </ul>
    `,
    initData:function(){
        return {
            items:[
                {name:'编写一个item组件',description:'...'},
                {name:'将组件attach到页面',description:'new app().attach(document.body)'},
                {name:'完成任务', description:'git提交就好了'}
            ]
        }
    },
    onclick:function(){
        this.data.push('items',{name:this.data.get('name'), description:this.data.get('description')});
    }
});

new app().attach(document.body);