import san from 'san';
let mission = san.defineComponent({
    template:`
        <div class="mission">
            <slot name="title"></slot>
            <slot name="content"></slot>
            <slot name="date"></slot>
        </div>
    `
})

let card = san.defineComponent({
    components:{
        's-mission':mission
    },
    template:`
        <div class="card">
            <h4>{{data.mission}}</h4>
            <s-mission>
                <p slot="title">标题：{{data.title}}</p>
                <p slot="content">内容：{{data.content}}</p>
                <p slot="date">时间：{{data.date}}</p>
            </s-mission>
        </div>
    `
})

let app = san.defineComponent({
    components:{
        "card":card
    },
    template:`
        <div id="cards">
             <card  s-for="item in data"  data="{{item}}"></card>
        </div>
    `,
    initData:function(){
        return {
            data:[
                {mission:'任务一', title:'把', content:'把代码写好', date:'2019-12-28'},
                {mission:'任务二', title:'代码', content:'把代码写好', date:'2019-12-28'},
                {mission:'任务三', title:'写好', content:'把代码写好', date:'2019-12-28'},
                {mission:'任务四', title:'加油', content:'把代码写好', date:'2019-12-28'},
                {mission:'任务五', title:'你', content:'把代码写好', date:'2019-12-28'},
                {mission:'任务六', title:'可以的', content:'把代码写好', date:'2019-12-28'},
            ]
        }
    }
})

new app().attach(document.getElementById('content'));