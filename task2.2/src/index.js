import san,{DataTypes} from 'san';

let San = san.defineComponent({
    'template': `
        <div>
            <input type="text" placeholder="姓名" value="{=input=}"/> <button type="button" on-click="add">添加</button>
            <table border="1px" cellspacing="0px">
                <thead>
                    <td>姓名</td>
                    <td>审核状态</td>
                    <td>操作</td>
                </thead>
                <tr s-for="item,index in list trackBy item.name">
                    <td>{{item.name}}</td>
                    <td s-if="item.isReview">
                        <span s-if="item.isqualified">合格</span>
                        <span s-else>不合格</span>
                    </td>
                    <td s-else>未审核</td>
                    
                    <td s-if="item.isReview">
                        <button on-click="remove(item)">删除</button>
                    </td>
                    <td s-else>
                        <button on-click="review(index)">审核</button>
                    </td>
                </tr>
            </table>
        </div>
    `,
    initData:function(){
        return {
            input:undefined,
            list:[
                {name:'张三',isReview:true,isqualified:false},
                {name:'李四',isReview:true,isqualified:false},
                {name:'王五',isReview:true,isqualified:false},
                {name:'赵六',isReview:true,isqualified:false},
            ]    
        }
    },
    review:function(index){
        let t = this.data.get('list')[index];
        t.isReview = true;
        t.isqualified = true;
        this.data.splice('list', [index, 1, t]);   // 对于数组中值的修改，需要来借助splice方法，不然视图不会更新
    },
    add:function(){
        this.data.push('list', {name:this.data.get('input'),isReview:false,isqualified:false});
        this.data.set('input', '');
    },
    remove:function(value){
        this.data.remove('list',value);
    }
})
let myApp = new San();
myApp.attach(document.body);