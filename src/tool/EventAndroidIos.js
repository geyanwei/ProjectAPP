/**
 * 页面 this is page
 */

/**
 * 安卓IOS原生
 *
 *
 *
 */
import React, {Component} from 'react';
import {
    NativeModules,
    Platform,
    NativeAppEventEmitter,
    DeviceEventEmitter,
    AlertIOS,
} from 'react-native';
var WeChat = require('react-native-wechat');
var openShare = require('react-native-open-share');
import fs from 'react-native-fs';
import Config from '../Config.js';//配置文件；
var UMNative = require('react-native').NativeModules.UMAnalyticsModule;

class DemoEventAndroidIos {

    constructor() {
        WeChat.registerApp(Config.wxChatAppId);
    }
    //友盟统计点击事件
    static umOnEvent(eventID){
        UMNative.onEvent(eventID);
    }
    //友盟统计进入页面
    static umOnPageBegin(pageName){
        UMNative.onPageBegin(pageName);
    }
    //友盟统计页面结束
    static umOnPageEnd(pageName){
        UMNative.onPageEnd(pageName);
    }
    static onPause() {
        Platform.select({
            android: () => UMNative.onPause(),
            ios: () => { }
        })
    }
    static onResume() {
        Platform.select({
            android: () => UMNative.onResume(),
            ios: () => { }
        })
    }
    installedLoginSDK(callBack){
        if (Platform.OS == "android") {
            if(callBack){
                callBack([
                    {
                        title:"weChat",
                        desc:"weChat login",
                        iSInstall:true,
                        login:(callBack)=>{
                            this.eventAndroidIosLogin(1,callBack)
                        }
                    },
                ]);
            }
        }else{
            var sdkArray = [];
            this.verInstall(undefined,sdkArray,()=>{
                if(callBack){
                    callBack(sdkArray)
                }
            });
        }
    }


    verInstall(type,sdkArray,back){
        if(type=="qq"){
            openShare.isQQAppInstalled(

                (error, events) => {
                    sdkArray.push(
                        {
                            title:"QQ",
                            desc:"qq login",
                            iSInstall:events,
                            login:(callBack)=>{
                                this.eventAndroidIosLogin(0,callBack)
                            }
                        }
                    );
                    this.verInstall("weibo",sdkArray,back);
                });
        }else if(type=="weibo"){
            openShare.isWeiboAppInstalled(
                (error, events) => {

                    sdkArray.push(
                        {
                            title:"weibo",
                            desc:"weibo login",
                            iSInstall:events,
                            login:(callBack)=>{
                                this.eventAndroidIosLogin(2,callBack)
                            }
                        }
                    );
                    back();

                });
        }else {
            WeChat.isWXAppInstalled().then((isInstalled) => {
                sdkArray.push(
                    {
                        title:"weChat",
                        desc:"weChat login",
                        iSInstall:isInstalled,
                        login:(callBack)=>{
                            this.eventAndroidIosLogin(1,callBack)
                        }
                    }
                );
                this.verInstall("qq",sdkArray,back);
            });
        }
    }

    eventAndroidIosLogin(code, callBack) {
        this.callBack = callBack;
        switch (code) {
            case 1:
                let scope = 'snsapi_userinfo';
                let state = 'wechat_sdk_demo';
                //发送授权请求
                WeChat.isWXAppInstalled().then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.sendAuthRequest(scope, state).then(response => {
                            //返回code码，通过code获取access_token
                            // return this.getAccessToken(response.code)
                            return {first_code:response.code}
                        }).then((res) => {
                            this.callBack({
                                code: 1,
                                AccessToken: res.access_token,
                                'OpenId': res.unionid,
                                first_code:res.first_code
                            })
                        }).catch(err => {
                            if (err.code===-2){
                                this.callBack({code: 0, msg: '您已取消微信授权登录，请重新授权',})
                            }else {
                                this.callBack({code: 0, msg: '登录失败' + JSON.stringify(err),})
                            }
                        })
                    } else {
                        this.callBack({code: 0, msg: '请安装微信客户端'})
                    }
                });
                break;
            default:
                break
        }
    }

    /**
     *
     * 调用安卓支付必须在组件中去添加原生的监听，否则接收不到回调
     *
     *
     * */
    WXShareTimeline(shareMsg) {
        let result = WeChat.shareToTimeline({
            title: shareMsg.title,
            description: shareMsg.contentText,
            thumbImage: shareMsg.imgUrl,
            type: 'news',
            webpageUrl: shareMsg.tarGetUrl
        }).then(response => {
            //返回code码，通过code获取access_token
            // console.warn(JSON.stringify(response));
            return response;
        }).catch(err => {
            return err;
        });
        // log('分享到微信朋友圈是否成功：', result);
        return result;
    }

    /**
     *
     * 微信分享朋友圈 仅分享图片
     *
     *
     * */
    WXShareTimelineImgFile=(formUrls,callBack)=> {
        const downloadDest = fs.DocumentDirectoryPath+'/apinShare.jpg';
        const options = {
            fromUrl: formUrls,
            toFile: downloadDest,
            background: true,
        };
        fs.downloadFile(options).promise.then(res => {
            WeChat.shareToTimeline({
                type: 'imageFile',
                title: '分享探索图片',
                description: '分享图片到朋友圈',
                mediaTagName: 'email signature',
                messageAction: undefined,
                messageExt: undefined,
                imageUrl: 'file://' + downloadDest // require the prefix on both iOS and Android platform
            }).then(response => {
                callBack(1,'分享成功');
            }).catch(err=>{
                callBack(0,'分享失败');
            })
        }).catch(err => {
            callback(0,'异常');
        });
    };
    /**
     *
     * 微信分享好友 仅分享图片
     *
     *
     * */
    WXshareToSessionImgFile=(formUrls,callBack)=> {
        const downloadDest = fs.DocumentDirectoryPath+'/apinShare.jpg';
        let wxShareMsgImg =
            Platform.OS == "ios"?
                {
                    type: 'imageFile',
                    title: '分享探索图片',
                    description: '分享图片到好友',
                    mediaTagName: 'email signature',
                    messageAction: undefined,
                    messageExt: undefined,
                    thumbImage:formUrls,
                    imageUrl: 'file://' + downloadDest // require the prefix on both iOS and Android platform
                }
                :
                {
                    type: 'imageFile',
                    title: '分享探索图片',
                    description: '分享图片到好友',
                    mediaTagName: 'email signature',
                    messageAction: undefined,
                    messageExt: undefined,
                    imageUrl: 'file://' + downloadDest // require the prefix on both iOS and Android platform
                };
        const options = {
            fromUrl: formUrls,
            toFile: downloadDest,
            background: true,
        };
        fs.downloadFile(options).promise.then(res => {
            WeChat.shareToSession(wxShareMsgImg).then(response => {
                callBack(1,'分享成功');
            }).catch(err=>{
                callBack(0,'分享失败');
            })
        }).catch(err => {
            callback(0,'异常');
        });
    };
    WXshareToSession(shareMsg) {
        let result = WeChat.shareToSession(
            {
                title: shareMsg.title,
                description: shareMsg.contentText,
                thumbImage: shareMsg.imgUrl,
                type: 'news',
                webpageUrl: shareMsg.tarGetUrl
            }
        ).then(response => {
            return response;
        }).catch(err => {
            throw err;
        });
        // log('分享到微信朋友圈是否成功：', result);
        return result;
    }

    /**
     *
     * 调用安卓支付必须在组件中去添加原生的监听，否则接收不到回调
     *
     *
     * */
    SinaLogin(str) {
        if (Platform.OS == "android") {
            if (!str) {
                str = '{"name":"SINA","type":"login","result":"1","msg":"1","errCode":"0000"}';
            }
            NativeModules.MyNativeModule.rnCallBackNative(str);
        } else if (Platform.OS == "ios") {
            openShare.isWeiboAppInstalled(
                (error, events) => {
                    if (events) {
                        openShare.weiboLogin();
                    }
                });
        } else {
            alert("请安装客户端进行新浪登录操作")
        }
    }

    /**
     *
     * 调用安卓支付必须在组件中去添加原生的监听，否则接收不到回调
     *
     *
     * */
    //{title:'分享好友测试',contentText:'分享内容',imgUrl:'http://www.reactnative.vip/img/weixin_test.jpg',tarGetUrl:'http://www.baidu.com'}
    SinaShare(shareMsg) {
        if (Platform.OS == "android") {
            var str = '{"name":"SINA","type":"share","result":"1","msg":"1"}';
            var obj = JSON.parse(str);
            obj.msg = shareMsg;
            JSON.parse(str).msg = shareMsg;
            NativeModules.MyNativeModule.rnCallBackNative(JSON.stringify(obj));
        } else if (Platform.OS == "ios") {
            openShare.sinaImageShare(shareMsg);
        } else {
            alert("请安装客户端进行新浪分享操作")
        }
    }

    /**
     *
     * 调用安卓支付必须在组件中去添加原生的监听，否则接收不到回调
     *
     *
     * */
    QQShare(shareMsg,callBack) {
        if (Platform.OS == "android") {
            str = '{"name":"QQ","type":"share","result":"1","msg":"1"}';
            var obj = JSON.parse(str);
            obj.msg = shareMsg;
            JSON.parse(str).msg = shareMsg;
            NativeModules.MyNativeModule.rnCallBackNative(JSON.stringify(obj));
        } else if (Platform.OS == "ios") {
            openShare.qqImageShare(shareMsg);
        } else {
            alert("请安装客户端进行QQ分享操作")
        }

    }

    /**
     *
     * 调用安卓支付必须在组件中去添加原生的监听，否则接收不到回调
     *
     *
     * */
    QQLogin() {
        if (Platform.OS == "android") {
            var str = '{"name":"QQ","type":"login","result":"1","msg":"1","errCode":"0000"}';
            NativeModules.MyNativeModule.rnCallBackNative(str);
        } else if (Platform.OS == "ios") {
            openShare.isQQAppInstalled(
                (error, events) => {
                    if (events) {
                        openShare.qqLogin()
                    } else {
                        AlertIOS.alert('没有安装QQ，请您安装QQ之后再试');
                    }
                });
        } else {
            alert("请安装客户端进行QQ登录操作")
        }
    }
    /**
     * msg :{imgUrl:'xxx',imgName:'xxx'}或者传'0' 原生中设置有默认值
     *
     * */
    downImgUrlToLocal(msg){
        if (msg==null){
            NativeModules.MyNativeModule.rnCallNativeDownLoadNetWorkImg("0");
        }else if (msg.imgUrl!==null&&msg.imgName!==null){
            NativeModules.MyNativeModule.rnCallNativeDownLoadNetWorkImg(msg);
        }

    }
}
module.exports = DemoEventAndroidIos;
