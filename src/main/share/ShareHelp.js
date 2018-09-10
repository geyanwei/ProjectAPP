/**
 * Created by apin on 2017/6/13.
 */

import React, {
    Component,
} from 'react';
import {
    Platform,
    NativeModules,
    DeviceEventEmitter,
    NativeAppEventEmitter,
} from 'react-native';

var WeChat = require('react-native-wechat');

module.exports = {
    initShare(wxid) {
        WeChat.registerApp(wxid);
    },
    openShare(type, data, callBack) {
        if (type == "WECHAR") {
            this.openWXShare(data, callBack);
        } else {
            callBack({code: -1, msg: "请选择正确的分享方式"})
        }
    },
    openWXShare(data = {}, callBack) {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    try {
                        if (data.title && data.length > 512) {
                            //标题太长，截取
                            data.title = data.title.substr(0, 512);
                        }
                        if (data.description && data.description > 1024) {
                            //描述太长，截取
                            data.description = data.description.substr(0, 1024);
                        }
                        WeChat.shareToSession(data)
                            .then((result) => {
                                callBack({code: 1, msg: "分享成功"})
                            })
                            .catch((error) => {
                                callBack({code: -1, msg: "分享失败"})
                            });
                    } catch (e) {
                        if (e instanceof WeChat.WechatError) {
                            callBack({code: -2, msg: "微信分享失败"})
                        } else {
                            callBack({code: -3, msg: "微信分享失败"})
                        }
                    }
                } else {
                    callBack({code: -4, msg: "未安装微信，请安装后分享"})
                }
            });
    }
};