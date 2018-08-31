import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    NativeModules,
    InteractionManager,
    DeviceEventEmitter,
    AppState
} from 'react-native';

//1:包装
//2:消息通知

const GroupId = 163665646;

import HttpTool from '../../http/HttpTool.js'
import MessageCell from './MessageCell.js'
import {PageView, navigation, ModalBox, AppInit} from "myapplib"
import SelectCell from '../../component/SelectCell.js'
import Storage from '../../tool/Storage';

class Message extends Component {
    constructor(props) {
        super(props);
        this.listener = {};
        this.state = {
            service: {}, //客服消息
            dataList: [],
            indexCount: 0, //订单 平台 活动小红点累加
        };
    }

    componentWillMount() {
        //更新客服的小红点
        this.listener = DeviceEventEmitter.addListener('contactService', () => this.contactListen());
    }

    contactListen() {
        this.getContactMessage();
        setTimeout(() => {
            DeviceEventEmitter.emit("hasUnRead", {
                count: this.state.indexCount + (this.state.service.count || 0),
            });
        }, 100)
    }

    refreshMessage() {
        if (this.timer) {
            this.timer && clearTimeout(this.timer);
            this.timer = undefined;
        }
        this.timer = setTimeout(() => {
            this.getContactMessage();
            this.httpGetMessage();
        }, 120000)
    }

    componentDidMount() {
        this.setState({
            dataList: this.dataAnalysis(),
        });
        AppState.addEventListener('change', this.appstateChange.bind(this));
        // this.getData();
        this.httpGetMessage();
        // setTimeout()
    }


    tabBar_click(bool) {
        if (bool) {
            this.getContactMessage();
            this.httpGetMessage();
            // this.getData();
        }
    }

    getContactMessage() {
        let person = {
            targetid: "杭州易途吧",
            groupid: GroupId
        };
        // NativeModules.ChatNativeModule.getMessageDic(person, (data) => {
        //     this.setState({
        //         service: data,
        //     })
        // });
    }

    appstateChange(nextAppState) {
        if ((this.appState === 'inactive' || this.appState === 'background') && nextAppState === 'active') {
            // this.getData();
            this.getContactMessage();
            this.httpGetMessage();
        }
        this.appState = nextAppState;
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timer = undefined;
        this.timer2 && clearTimeout(this.timer2);
        this.timer2 = undefined;

        AppState.removeEventListener('change', this.appstateChange.bind(this));
        DeviceEventEmitter.removeListener('contactService', () => this.contactListen());
        this.listener.remove();
    }

    /*
    * 后台定时获取信息
    * */

    httpGetMessage() {
        let params = {};
        Storage.getUserInfo((userInfo) => {
            if (!userInfo) {
                this.timer && clearInterval(this.timer);
                this.timer = undefined;
                return;
            }
            let successCallBack = (code, message, json) => {
                if (json) {
                    //用户信息更新

                    if (json.driver) {
                        let myUserInfo = userInfo || {};
                        let obj = {
                            is_trained: json.driver.is_trained,
                            isbanned: json.driver.isbanned,
                            bannedSecond: json.driver.bannedSecond,
                            type: json.driver.type,
                            status: json.driver.status,
                            refuseReason: json.driver.refuseReason,
                            citys: json.driver.citys,
                            name: json.driver.name,
                        };
                        let newUserInfo = Object.assign({}, myUserInfo, obj);
                        Storage.saveUserInfo(newUserInfo, () => {

                            if (newUserInfo.type !== myUserInfo.type) {
                                //退出登录
                                HttpTool.clearAuthHeader();
                                Storage.clearUserInfo();
                                NativeModules.ChatNativeModule.deleteBadgeNumber();
                                NativeModules.ChatNativeModule.logout();
                                //清除所有弹框
                                for (let r of ModalBox.triggers) {
                                    if (r) {
                                        r.destroy()
                                    }
                                }
                                ModalBox.showDescCustom({
                                    desc: ("角色已变更为" + (newUserInfo.type === 1 ? "个人司导" : "车队司导") + "，请重新登录"),
                                    btnTitle: "重新登录"
                                }, () => {
                                    AppInit.ref.dispatch({
                                        type: "Navigation/NAVIGATE",
                                        routeName: "Main",
                                    });
                                });
                            }
                        });
                    }

                    //消息更新
                    let newArray = this.dataAnalysis(json);

                    this.setState({
                        indexCount: json.noread,
                        dataList: newArray
                    }, () => {
                        log("到底是啥" + json.noread);
                        DeviceEventEmitter.emit("hasUnRead", {
                            count: json.noread + (this.state.service.count || 0),
                        });

                        this.timer2 = setTimeout(() => {
                            this.refreshMessage();
                        }, 3000)
                    })
                }
            };
            let errorCallBack = (code, message, json) => {
                this.refreshMessage();
            };
            HttpTool.post("/driverapp/driver/getInfoByTiming", successCallBack, errorCallBack, params);

        });

    }

    dataAnalysis(json) {
        let ary = [];
        let orderMsg = json && json.orderMsg && json.orderMsg.lastMsg || {};
        let noticeMsg = json && json.noticeMsg && json.noticeMsg.lastMsg || {};
        let activityMsg = json && json.activityMsg && json.activityMsg.lastMsg || {};
        ary.push({
            title: "订单消息",
            path: "OrderMessage",
            imageSource: require("../../image/message/xx-ddxx.png"),
            time: orderMsg.createdTime || "",
            content: orderMsg.title || "暂无消息",
            unreadNum: json && json.orderMsg && json.orderMsg.unreadNum || 0
        });
        ary.push({
            title: "互动消息" || "平台通知",
            path: "NotificationMessage",
            imageSource: require("../../image/message/xx-pttz.png"),
            time: noticeMsg.createdTime || "",
            content: "系统消息通知" || noticeMsg.title || "暂无消息",
            unreadNum: json && json.noticeMsg && json.noticeMsg.unreadNum || 0
        });
        ary.push({
            title: "活动推荐",
            path: "ActivityMessage",
            imageSource: require("../../image/message/xx-hdtj.png"),
            time: activityMsg.createdTime || "",
            content: activityMsg.title || "暂无消息",
            unreadNum: json && json.activityMsg && json.activityMsg.unreadNum || 0
        });
        ary.push({
            title: "联系客服",
            imageSource: require("../../image/message/xx-lxkf.png"),
            time: this.state.service.date || "",
            content: this.state.service.content || "暂无消息",
            unreadNum: this.state.service.count || 0,
        });
        return ary;
    }

    navBar() {
        return {
            showLeftButton: false,
            title: "消息",
            mainContainerStyle: {backgroundColor: YITU.textColor_4},
            titleStyle: {
                fontSize: YITU.fontSize_7,
                color: "#fff",
                fontFamily: YITU.fontName_regular,
                fontWeight: "bold"
            },
        }
    }

    renderItem(array) {

        return array.map((item, index) => {

            if (index === 3) {
                // item.unreadNum = this.state.service.count;
                // return (<SelectCell key={index}
                //                     style={{backgroundColor: YITU.c_bg_white}}
                //                     onPress={() => {
                //                         let person = {
                //                             targetid: "杭州易途吧",
                //                             groupid: GroupId
                //                         };
                //                         alert("杭州易途吧客服");
                //                         // InteractionManager.runAfterInteractions(() => {
                //                         //     NativeModules.ChatNativeModule.jumpToIM(person, (err) => {
                //                         //         log(err)
                //                         //     });
                //                         // })
                //                     }}>
                //     <MessageCell data={item} serviceMessage={this.state.service}/>
                // </SelectCell>)
            }

            if (index !== 1) {
                return null;
            }
            return (<SelectCell key={index}
                                style={{backgroundColor: YITU.c_bg_white}}
                                onPress={() => {
                                    this.setState({
                                        indexCount: this.state.indexCount - item.unreadNum
                                    });
                                    // alert(2);
                                    navigation.push(this, item.path, {
                                        title: item.title,
                                        titleStyle: {color: YITU.textColor_4},
                                        titleColor: YITU.textColor_4,
                                        callBack: () => {
                                            DeviceEventEmitter.emit("hasUnRead", {
                                                count: item.unreadNum,
                                                type: true,
                                            });

                                            item.unreadNum = 0;
                                            if (this.pageView.refresh) {
                                                this.pageView.refresh();
                                            }
                                        }
                                    })
                                }}>
                <MessageCell data={item}/>
                <View style={{
                    marginLeft: YITU.space_5,
                    backgroundColor: YITU.backgroundColor_Line,
                    height: 0.5
                }}/>
            </SelectCell>)

        });
    }

    render() {
        let view = (<View style={styles.container}>
            {/*<StatusBar barStyle={'light-content'}/>*/}
            {
                this.renderItem(this.state.dataList)
            }
        </View>);

        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    barConfig: this.navBar(),
                    hiddenIphoneXBottom: true,
                })}
            >
                {view}
            </PageView>
        );
    }
}

module.exports = Message;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: YITU.space_2,
    },
    cycle: {
        marginBottom: 30,
        marginLeft: -25,
        width: YITU.space_2,
        height: YITU.space_2,
    }
});
