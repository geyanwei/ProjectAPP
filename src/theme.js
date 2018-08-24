/**
 * Created by lixifeng on 17/6/26.
 */

import {
    Platform,
    DeviceInfo,
    Dimensions,

} from 'react-native';

const {width, height} = Dimensions.get("window");
// import MyNativeMoudles from './myNativeModules';


window.YITU = {
    //字体大小
    fontSize_1: 10,
    fontSize_2: 11,
    fontSize_3: 13,
    fontSize_4: 15,
    fontSize_5: 16,
    fontSize_6: 17,
    fontSize_7: 18,
    fontSize_8: 20,//成功失败状态页大标题
    fontSize_9: 24,
    fontSize_10: 26,
    fontSize_11: 30,
    fontSize_12: 32,//账单详情里金额数字
    fontSize_13: 46,//钱包里金额数字

    fontSize_14: 12,
    fontSize_15: 14,
    fontSize_16: 28,


    //字体类型
    // fontName_regular: Platform.OS === 'ios'? parseFloat(MyNativeMoudles.systemVersion) < 9 ?'.HelveticaNeueInterface-Regular' : "PingFangSC-Regular" : "Roboto",
    // fontName_medium: Platform.OS === 'ios'? parseFloat(MyNativeMoudles.systemVersion) < 9 ?'.HelveticaNeueInterface-MediumP4' : "PingFangSC-Medium" : "Roboto",

    //字颜色
    textColor_0: "#000",//字的主色
    textColor_1: "#333",//字的主色
    textColor_2: "#999",//字的辅色
    textColor_3: "#666",//字的辅色
    textColor_4: "#3da3ff",//字的辅色
    textColor_5: "#b2b2b2",//表单提示色
    textColor_6: "#DA8A00",//司导星级页面 几星司导名称
    textColor_warn: "#fd4957",//字的警告色
    textColor_adorn: "#febc25",//字的点缀色
    c_title_white: "#ffffff",

    //背景颜色
    backgroundColor_0:"#ffffff",//背景白色
    backgroundColor_1:"#F5F6F7",//背景颜色
    backgroundColor_2:"#eee",//hover背景颜色
    backgroundColor_3:"#3da3ff",//背景主色
    backgroundColor_4:"#c6c6c6",//背景不可点击
    backgroundColor_5:"#f8fcff",//背景
    backgroundColor_adorn:"#febc25",//背景点缀颜色
    backgroundColor_Line:"#dddddd",//线的背景颜色
    backgroundColor_Line_1:"#999999",//线的背景颜色
    backgroundColor_clear: 'rgba(0,0,0,0)',//透明色
    backgroundColorTab: "#fff",//tabbar颜色
    backgroundColor_nav: "#fff",//导航颜色
    backgroundColor_robbing:"#FFEFF0",//列表正在抢单

    backgroundColor_6: "#374534",//司导星级背景
    backgroundColor_7: "#FFFDF2",//司导拉新背景
    backgroundColor_8: "#354139",//保证金背景
    backgroundColor_9: "#413E36",//钱包背景
    backgroundColor_10: "#404549",//查看照片背景
    backgroundColor_11: "#3d97ea",//按钮点击重颜色
    backgroundColor_12: "#fd4957",//按钮点击重颜色
    backgroundColor_13: "#e3414e",//按钮点击重颜色
    backgroundColor_14:"#f5f7f9",//区背景


    c_bg_white: "#fff",
    c_tab: "#3da3ff",// 底部选项卡主色


    //圆角
    radius_0: 2,
    radius_1: 4,
    radius_2: 6,
    radius_3: 8,
    radius_4: 14,
    radius_5: 20,
    radius_6: 25,
    radius_7: 35,
    radius_8: 9,

    //间距
    space_0: 5,
    space_1: 8,
    space_2: 10,
    space_3: 13,
    space_4: 14,
    space_5: 15,
    space_6: 20,
    space_7: 22,
    space_8: 30,
    space_9: 25,
    space_10: 12,

    lineHeight_1:16,
    lineHeight_2:18,
    lineHeight_3:20,
    lineHeight_4:22,
    lineHeight_5:24,
    lineHeight_6:26,
    lineHeight_7:28,
    lineHeight_8:30,
    lineHeight_9:32,

    d_barHeight: 44,
    d_RowHeight: 50,
    d_RowHeight_1: 45,
    d_RowHeight_2: 40,
    d_icon: 20,
    d_icon_center: 18,
    d_icon_small: 15,
    d_click_icon: 20,
    d_head: 35,
    d_head_img: 50,
    d_head_img_center: 64,
    BAR_HEIGHT: 44,
    BACKIMG_SIZE: 24,
    barStateHeight: Platform.OS === 'android' ? 0 : DeviceInfo.isIPhoneX_deprecated ? 44 : 20,
    navBarHeight: Platform.OS === 'android' ? 44 : DeviceInfo.isIPhoneX_deprecated ? 88 : 64,
    default_backImg: require("./image/img_back_white.png"),
    default_backImg_blue: require("./image/img_back_blue.png"),
    IPHONEX_BOTTOM: DeviceInfo.isIPhoneX_deprecated ? 34 : 0,

    font_weidth_0: "900",

    screenScaleHeight: height / 667,// 6s尺寸比
    screenScaleWidth: width / 375,

    screenHeight: height,
    screenWidth: width
};

var obj = {};
Object.assign(window.YITU, obj);

if(!__DEV__){
    //release模式 不要打印
    console.log = ()=>{

    }
}

window.log = (e) => {
    if (__DEV__) {
        // debug模式
        console.log(e)
    } else {
        // release模式
    }

};

window.YITU.addAction = (key, callback) => {
    if (!this.globalActionArray) {
        this.globalActionArray = [];
    }
    this.globalActionArray[key] = callback;
};

window.YITU.getAction = (key) => {
    if (this.globalActionArray) {
        return this.globalActionArray[key];
    } else {
        return;
    }
};

window.YITU.removeAction = (key) => {
    if (this.globalActionArray[key]) {
        delete this.globalActionArray[key];
    }
};
window.YITU.addActionMap = (key, callback) => {
    if (!this.globalActionMap) {
        this.globalActionMap = new Map();
    }
    if (this.globalActionMap.has(key)) {
        this.globalActionMap.get(key).push(callback)
    } else {
        this.globalActionMap.set(key, [callback])
    }
};

window.YITU.getActionMap = (key) => {
    if (this.globalActionMap && this.globalActionMap.has(key)) {
        return this.globalActionMap.get(key);
    } else {
        return null;
    }
};

window.YITU.removeActionMap = (key) => {
    if (this.globalActionMap && this.globalActionMap.has(key)) {
        this.globalActionMap.set(key, [])
    }
};
window.YITU.config = {};

/**
 * 强制修改小数后两位
 * @param value
 * @returns {number}
 */
window.toDecimal2 = (value) => {
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
};
window.forceTransformationInt = (value, size) => {
    return parseInt(parseFloat(value).toFixed(size).toString().replace(".", ""))
};
window.forceTransformationFloat = (value, size) => {
    // return parseInt(parseFloat(value).toFixed(size).toString().replace(".",""))
};

