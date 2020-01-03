import san from 'san';

let Content = san.defineComponent({
    template:`
        <p >{{default}}</p>
    `,
    initData:function(){
        return {
            default:''
        }
    },
    compiled:function(){
        console.log(`1. this component had compiled`);
    },
    inited:function(){
        console.log(`2. this component had inited`);
    },
    created:function(){
        console.log(`3. this component had created`);
    },
    attached:function(){
        console.log(`4. this component had attached`);

    },
    detached:function(){
        console.log(`5. this component had detached`);
    },
    disposed:function(){
        console.log(`6. this component had disposed`);
        console.log('-----------------------------');
    }
})

let ExpansionPanel = san.defineComponent({
    components:{
        'content':Content
    },
    template:`
        <div class="panel">
            <div>
                <div class="left">
                    {{title}}
                </div>
                <div class="description">
                    {{description}}
                </div>
                <button class="right {{open?'rotate360':'rotate180'}}" on-click="onclick">
                    <i class="{{icon[0]}} {{icon[1]}}"></i>
                </button>
            </div>
            <content  default="{{default}}" class="{{open?'show':'hide'}}"} />
        </div>
    `,  
    initData:function(){
        return {
            title:'',
            icon:['fa', 'fa-angle-down'],
            description:'',
            open:false
        }
    },
    onclick:function(e){
        this.data.set('open', !this.data.get('open'));
    }
})

let app = san.defineComponent({
    components:{
        'panel':ExpansionPanel
    },
    template:`
        <div>
           <panel title="expansion panel❤" description="dev" default="家用变律究在无许四眼军儿该，并解交提被的O村民收隶。少同关能起交离响关放便权，水导证备文两呜详克达。院律利一们以白方机，他制工应参三教，命适U称平当日。每造或在个质条动七出前，切些指取细状并育收车段，强感届来京告说件K。接感车员题复市越中，知该果接心可育只什，先杨来八十呆苏。级究行实酸电军上研打近，热率外十政材都上日空。设于自验山油省连，用飞市白领业重展，许O苏称克屈。多角社选定风社技美传机及什，布素器行导边派养车太，连龙步F观秀向细越财容。听今单平一准计号主，展易其院青连步，电题-更箩深乱。几公影导世热装量，需状阶使安海情则，不先I坊金医少。金电名外流连战你做外打声达还更，种常世了联花究M坑节K说两。除研任表议主组开，根集本点白界流，实2凝节八社。" />
        </div>
    `
})

new app().attach(document.body);