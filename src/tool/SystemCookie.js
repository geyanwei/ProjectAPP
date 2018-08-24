
import {
    AsyncStorage
} from 'react-native';
class CookieHelp  {
    constructor(){
        try{
            this.getCookie(this.getSystemKey(),(error, result)=>{
                if(!error&&"none"!=result&&result){
                    this.systemCookie = JSON.parse(result);
                }
            })
        }catch (e){}
    }
    // alert(value.isReaded);

    getSystemInfo(){
        return this.systemCookie;
    }
    saveSystemCookie(info,callBack){
        this.saveSystem(this.getSystemKey(), info,(error)=>{

            if(!error){
                if("none"!=info){
                    this.systemCookie = info;
                }else{
                    this.systemCookie = null;
                }
                callBack();
            }else{
                callBack(error);
            }

        })
    }
    getSystemKey(){
        return "SYSTEMINFO";
    }

    clearSystemCookie(callBack){
        this.saveSystemCookie("none",callBack);
    }
    //设置

    //获取某个cookie的值
    getCookie(key,callBack){
        AsyncStorage.getItem(key, (error, result) => {
            if(callBack){
                callBack(error, result);
            }
        });
    }


    saveSystem(key, value,callBack){

        var v = '';
        if(typeof value == "string"){
            v = value;
        }else{
            v= JSON.stringify(value)
        }
        AsyncStorage.setItem(key, v, (error) => {
            if(callBack){
                callBack(error);
            }
        });
    }


}
module.exports = new CookieHelp();