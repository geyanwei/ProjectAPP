var MyNativeModule = require('react-native').NativeModules.MyNativeModule;
let  Platform =require('react-native').Platform ;
const packageName = MyNativeModule.packageName;//(安卓包名，iOS的BunduleID)
const versionCode = MyNativeModule.versionCode;//(版本号)
const versionName = MyNativeModule.versionName;//(版本名字)
const systemVersion = MyNativeModule.systemVersion;//(iOS系统)
const deviceId = MyNativeModule.deviceId;//(安卓ios唯一标示)
const platform = Platform.OS;//判断是ios还是安卓平台；
const registrationId = "";// 获取极光推送的id
const productName = MyNativeModule.productName;       //获取手机产品名称
const callPhone = MyNativeModule.callPhone;           //添加拨打电话的方法，传值：电话号码，回调
const isInstallWeChat = MyNativeModule.isInstallWeChat;//判断是否安装微信  返回值为true /false

module.exports =  {
    packageName,
    versionCode,
    deviceId,
    versionName,
    platform,
    registrationId,
    productName,
    callPhone,
    isInstallWeChat,
    systemVersion
};
