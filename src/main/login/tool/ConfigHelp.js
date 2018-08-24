import HttpTool from '../../../http/HttpTool.js';
import APICONFIG from "../../../http/APICONFIG.js";
import Storage from "../../../tool/Storage.js";
import ALiLoginIM from "../tool/ALiLoginIM.js";

export default ConfigHelp = {
    initConfigInfo: (callBack) => {


        let isGO = false;
        let time = setTimeout(() => {
            try {
                isGO = true;
                Storage.getAppConfig = undefined;
                callBack(-3, "连接不到服务");
                clearTimeout(time);
            } catch (e) {

            }
        }, 11 * 2 * 1000);

        let param = {};
        //配置接口 无需token
        let success = (code, message, json, option) => {
            if (isGO) {
                return;
            }
            Storage.getUserInfo((userInfo) => {
                //配置信息，缓存到内存，不做持久化处理
                if (isGO) {
                    return;
                }
                Storage.getAppConfig = json;
                if (userInfo && userInfo.accessToken) {
                    if (json && json.isLogin) {
                        //登录阿里百川 后端说阿里百川不一定登陆成功 所以尝试多次登录 即在App打开后 isLogin有效时尝试再次登录
                        ALiLoginIM.loginIM(userInfo.id, userInfo.id);
                        if (isGO) {
                            return;
                        }
                        clearTimeout(time);
                        callBack(1, "登录");
                    } else {
                        //未登录
                        HttpTool.clearAuthHeader();
                        Storage.clearUserInfo();
                        if (isGO) {
                            return;
                        }
                        clearTimeout(time);
                        callBack(-2, "登录信息已失效，请重新登录");
                    }
                } else {
                    if (isGO) {
                        return;
                    }
                    //未登录
                    clearTimeout(time);
                    callBack(-1, "未登录");
                }
            });
        };
        let fail = (code, msg, option) => {
            if (isGO) {
                return;
            }
            clearTimeout(time);
            Storage.getAppConfig = undefined;
            callBack(-3, msg);
        };
        HttpTool.post(APICONFIG.driverapp_common_getConfig, success, fail, param);
    }
}
