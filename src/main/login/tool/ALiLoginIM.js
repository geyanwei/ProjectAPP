import {
    Platform,
    NativeModules, DeviceEventEmitter,
} from 'react-native';

export default ALiLoginIM = {
    loginIM(userid, password, callBack) {
        try {
                NativeModules.ChatNativeModule.login({userid: userid, password: password});
               this.listener =  DeviceEventEmitter.addListener("IMEventLogin",(response)=>{
                    this.listener.remove();
                    callBack&&callBack(response);
                })
        } catch (e) {
            log("IM登录出错");
        }
    },

    getMessageList(data, callBack) {
        try {
                NativeModules.ChatNativeModule.getMessageList(data);
                this.listener = DeviceEventEmitter.addListener("IMEventList", (response) => {
                    this.listener.remove();
                    callBack && callBack(response);
                });
        } catch (e) {
            log("IM登录出错");
        }
    },

    sendMessage(data,callBack){
        try {
                NativeModules.ChatNativeModule.sendMessage(data);
                this.listener =   DeviceEventEmitter.addListener("IMEventSendMessage",(response)=>{
                    this.listener.remove();
                    callBack&&callBack(response);
                })
        } catch (e) {
            log("IM登录出错");
        }
    }

}
