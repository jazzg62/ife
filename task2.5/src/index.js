import san from 'san';

let input = san.defineComponent({
    template:`
        <div class="input">
            <input 
                type="text"  
                value="{=value=}" 
                placeholder="{{placehold}}" 
                s-bind="{{ {readonly:readonly,disabled:disabled} }}"
                class="{{isInputing?'inputing':''}} "
                on-input="oninput"
                san-size="{{size}}"
            />
            <span class="{{isError?'error':'noterror'}}">{{errorHint}}</span>
        </div>
    `,
    initData:function(){
        return {
            isInputing:false,
            isError:false,
            errorHint:'请输入文字'
        }
    },
    oninput:function(){   
        let value = this.data.get('value');
        let size = value.length;
        let [min, max] = this.data.get('size') || [0,2000];
        // console.log(size);
        if(size ===0){
            this.data.set('isError', true);
            this.data.set('errorHint', `输入的长度不能为空`);
            return ;
        }
        if(size>max || size<min){
            this.data.set('isError', true);
            this.data.set('errorHint', `请输入长度为${min}到${max}的文字`);
            return ;
        }else{
            this.data.set('isError', false);
        }
    }
})

let checkbox = san.defineComponent({
    template:`
        <ul class="checkbox" >
            <li s-for="item,index in list"  class="{{item[2]?'disabled':''}}" on-click="onclick(index)">
                <i class="fa {{item[1]|trans}}" aria-hidden="true"></i>
                <span>{{item[0]}}</span>
            </li>
        </ul>
    `,
    filters:{
        trans(value){
            if(value === 0)
                return 'fa-circle';  //选中
            else if(value === 1)
                return 'fa-circle-o'; // 未选中
            else if(value === 2)
                return 'fa-dot-circle-o';  // 部分选
            else
                return '';
        }
    },
                              // 选中 没选 部分选
    // list: [[checkboxname:'', value:0,1,2, isDisabled:false]]
    toggle(index){
        let value = this.data.get('list')[index];
        this.data.splice('list',[index,1,!value]);
    },
    onclick:function(index){
        // console.log(index, arguments);
        let item = [...this.data.get('list')[index]];
        if(item[2])
            return ;
        if(item[1] === 0)
            item[1] = 1;
        else if(item[1] === 1)
            item[1] = 0;
        else if(item[1] === 2)
            item[1] = 1;
        this.data.splice('list', [index,1,item]);
    }
})
let app = san.defineComponent({
    template:`
    <div>    
        <h1>基础状态 input</h1>
        <p>常态</p>
        <san-input value="{{value}}" disabled="{{disabled}}" placehold="{{placeholder}}" readonly="{{readonly}}" size="{{[0,5]}}"/>
        <br /> 
        <p>失焦状态</p>
        <san-input value="{{value}}" disabled="{{disabled}}" placehold="{{placeholder}}" readonly="{{readonly}}" size="{{[0,5]}}"/>
        <br /> 
        <p>不可用</p>
        <san-input value="{{value}}" disabled="{{disabled}}" placehold="{{placeholder}}" readonly="{{true}}" size="{{[0,5]}}"/>

        <h1>基础状态 checkbox</h1>
        <san-checkbox list="{{list}}"></san-checkbox>
    </div>    
    `,
    components:{
        'san-input':input,
        'san-checkbox':checkbox
    },
    initData:function(){
        return {
            value:"",
            placeholder:"请输入文字",
            readonly:false,
            disabled:false,
            list:[['选中',0,false],['未选中',1,false],['部分选中',2,false],['无效',0,true],['必选',0,true],['部分必选',2,true]]
        }
    }
})

new app().attach(document.body);