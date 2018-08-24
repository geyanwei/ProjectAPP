/**
 * Created by YITU on 2017/8/7.
 */
const uuidv4 = require('uuid/v4');
// or with import syntax
import io from 'socket.io-client';
class TcpTool{


    print(info){
        log(info);
    }
    constructor(){
        //自动连接时长
        this.time = 1000*15;

        this.KEY = "YITU"
        //消息类型
        this.mt = new MessageType();
        this.tpm = new ThreadPoolManage();

        this.print("========init tcp=======")
    }
    init(json,cb){
        if(this.verConnect({})){
            return;
        }



        // let url = "ws://192.168.9.44:9000";

        let url = json.url;

        this.print("开始连接"+url)


        //打通tcp
        window.navigator.userAgent = "ReactNative";

        try {
            this.ws =  io(url,{transports:["websocket"]});

            this.ws.on('connect',  ()=> {
                this.print("连接成功"+this.ws.id)
                this.keepConnect()
                if(cb){
                    cb(this.ws.id);
                }
            });

            this.ws.on('connect_error',  ()=> {
                this.print("连接失败"+this.ws.id)
            });

        }catch (e){this.print(e)}


        this.ws.on(this.KEY,(temp)=>{
                // 接收到了一个消息
            this.print("接收到了一个消息");
                this.print(temp);

                //消息返回处理.进行模板转换
               // let temp = this.conversionTemplate(socket);

                //1:检查请求返回结果，如果存在发起者，进行返回。
            if(temp.id){

                this.tpm.result(temp);
            }else{
                this.tpm.resultList(temp);
            }

                //2:向系统分发消息，不同的消息进行不同的接收处理
        })

    }
    unInit(){
        this.print("退出连接")
        //验证连接的真实性
        if(!this.verConnect({})){
            return;
        }
        this.ws.close();
    }



    /**
     * 添加监听消息的事件，用来做分发系统
     * @param type
     * @param value
     */
    addMessageListener(type,callBack ,id){
        //验证连接的真实性
        let temp = this.getTemplate(type,"",callBack);
        if(!this.verConnect(temp)){
            return;
        }
        if(id){
            temp.id = id;
        }
        //1:添加消息类型队列
        //2:消息非单例
        this.tpm.join(temp)

        return temp.id;

    }

    addMessageListenerForID(type,callBack,id){
        return this.addMessageListener(type,callBack,id)
    }
    testGetMessage(){
        let temp = {
            id:"",
            type:this.mt.chatInfo,
            data:{code:1,msg:"haha",data:new Date().toLocaleString()}

        }
        if(!this.verConnect(temp)){
            return;
        }
        if(temp.id){

            this.tpm.result(temp);
        }else{
            this.tpm.resultList(temp);
        }
    }

    removeMessageListenerForId(id){
        this.tpm.del([id]);
    }
    removeMessageListenerForIds(ids){
        this.tpm.del(ids);
    }

    verConnect(temp){
        if(!this.ws||!this.ws.id){
            //
            this.error(temp,-2,"连接未开通")
            return false;
        }else{
            return true;
        }
    }
    getMessageType(){
        return this.mt;
    }
    /**
     * 主动发送消息给服务器
     * @param template
     */
    send(type,data,callBack,config){

        let temp = this.getTemplate(type,data,callBack,config);
        //验证连接的真实性
        if(!this.verConnect(temp)){
            return;
        }
        this.print("开始发送信息");
        this.print(temp);
       try{
           //加入发送消息队列
           this.tpm.join(temp)
           //注：在此可做序列发送，如果有此要求
           // this.ws.send(JSON.stringify(template));
           this.ws.emit(this.KEY,temp)
       }catch (e){
           this.print("发送信息失败");
           this.print(e);
           //如果发送失败，通知调用者
          this.error(template,-1,JSON.stringify(e));
       }
    }

    conversionTemplate(info){


        return {
            isBack:true,
            option:{},
            type:"",
            data:info,
            id:"",
            callBack:()=>{},
        };
    }

    /**
     * 发送消息统一模板
     * @param type
     * @param data
     * @param callBack
     * @param config
     * @returns {{option: {}, type: *, data: *, id: string, callBack: (function())}}
     */
    getTemplate(type,data,callBack,config){
        if(!config){
            config = {}
        }
        //不能重写的属性
        if(config.type){
            delete  config.type;
        }
        if(config.callBack){
            delete  config.callBack;
        }
        if(config.data){
            delete  config.data;
        }


        const  uuid = uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'


        return Object.assign({
            option:{},
            type:type,
            data:data,
            id:uuid,//生成唯一的ID
            callBack:callBack?callBack:()=>{},}, config);
        //用于让上级可扩展属性的重写
    }


    keepConnect(skipTime){
        const exe = ()=>{
            // 发送一个消息
            this.print("定时请求")
            this.ws.emit(this.KEY,{type:this.mt.testing})
            if(this.ws&&this.ws.id){

                this.keepConnect();
            }
        };

        if(skipTime){
            exe();
        }else{
            setTimeout(exe,this.time)
        }
    }

    error(template,code,message){
        if(template&&template.callBack){
            template.callBack({
                code:code,
                message:message,
            });
        }
    }







}
class MessageType{
    //type : "testing" 聊天发送消息
    //type : "schat" 聊天发送消息 单聊
    //type : "logout" 退出登录
    //type : "chatInfo" 消息数量显示
    //type : "chatCallMe" 发送给我的消息/或者我的群消息
    constructor(){
        this.testing="testing";
        this.schat="schat";
        this.chatInfo="chatInfo";
        this.chatCallMe="chatCallMe";
        this.systemMsg="systemMsg";
    }

}

/**
 * 线程池
 */
class ThreadPoolManage{

    constructor(){
        this.threadMap = new Map();

    }

    join(template){
        this.threadMap.set(template.id,template)
    }
    del(ids){
        if(!ids){
            return;
        }
        for(let id of ids){
            if(this.threadMap.has(id)){
                //卸磨杀驴
                this.threadMap.delete(id);
            }
        }
    }
    /**
     * 返回指定连接的回调事件
     * @param template
     */
    result(template){
       if(template&&this.threadMap.has(template.id)){
           let temp = this.threadMap.get(template.id);
           temp.callBack(template.data)
           //卸磨杀驴
           this.threadMap.delete(template.id);
       }else{

       }
    }


    /**
     * 返回模板类型的通用连接
     * @param template
     */
    resultList(template){
        if(template){

            for(var [id, temp] of this.threadMap) {
               if(temp.type==template.type){
                   temp.callBack(template.data)
               }
            }

        }
    }


}
module.exports = new TcpTool();