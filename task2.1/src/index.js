import san,{DataTypes} from 'san';

let San = san.defineComponent({
    'template': `
        <form >
            <input type="text"   name="name" placeHolder="姓名 （string）"  value="{=name=}"/>
            <input type="number" name="age"  placeHolder="年龄 （number）"  value="{=age=}"/>
            <input type="text"   name="des"  placeHolder="简介 （string）"  value="{=des=}"/>
            <br />
            <span>信息：</span> <button type="button" on-click="remove">移除信息</button>
            <br />
            <p>姓名：{{name|trans}}</p>
            <p>年龄：{{age|numberToString|trans}}</p>
            <p>简介：{{des|trans}}</p>
        </form>
    `,
    initData:function(){
        return {
            name: undefined,
            age: undefined,
            des: undefined
        }
    },
    dataTypes: {
        name: DataTypes.string,
        age: DataTypes.string,
        des: DataTypes.string
    },
    filters:{   // 上一个过滤器返回的值会传到下一个过滤器
        trans:function(value){   // 转换成_____
            if((typeof value === 'string' && value === '') || value === undefined)
                return '________';
            else
                return value;
        },
        numberToString:function(value){
            let t = parseInt(value);
            if(!isNaN(t))
                value = t;
            return value===0?'':value;
        }
    },
    remove:function(){
        this.data.set('name',undefined);
        this.data.set('age',undefined);
        this.data.set('des',undefined);
    }
})
let myApp = new San();
myApp.attach(document.body);