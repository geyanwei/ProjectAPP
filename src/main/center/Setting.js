import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image, AppState, NativeModules,
} from 'react-native';
import {PageView, LayoutBox, ModalBox, Toast, Loading, navigation} from 'myapplib';
import Storage from '../../tool/Storage.js';
import HttpTool from '../../http/HttpTool';
import APIGYW from '../../http/APIGYW';
import {MyNativeModule} from 'myapplib';
import SelectCell from '../../component/SelectCell.js';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOn: this.isOn,
            upData: 0,
            isNoticeOpen: true
        }
        let userInfor = Storage.getUserInfo() || {};
        this.userId = userInfor && userInfor.id || "";
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {
        this.getNotificationStatus();
        //设置监听
        AppState.addEventListener('change', this.appstateChange.bind(this));
    }

    //监听事件
    appstateChange(nextAppState) {
        if ((this.appState === 'inactive' || this.appState === 'background') && nextAppState === 'active') {
            this.getNotificationStatus();
        }
        this.appState = nextAppState;
    }

    //退出移除监听
    componentWillUnmount() {
        AppState.removeEventListener('change', this.appstateChange.bind(this));
    }

    //获取监听状态
    getNotificationStatus() {
        MyNativeModule.getNotificationStatus((bool) => {
            this.setState({
                isNoticeOpen: bool
            })
        });
    }


    httpLogout(cb) {
        //点击退出登录 强退
        let param = {
            deviceId: ""
        };

        // NativeModules.ChatNativeModule.deleteBadgeNumber();
        // NativeModules.ChatNativeModule.logout();

        let successCallback = (code, message, json, option) => {

        };
        let failCallback = (code, message) => {

        };
        HttpTool.delete(APIGYW.base_usercenter_delete_authapi_v1_1_tokens, successCallback, failCallback, param);

        HttpTool.clearAuthHeader();
        Storage.clearUserInfo((error) => {
            if (!error) {
                cb && cb();
            } else {
                Storage.clearUserInfo(() => {
                    cb && cb();
                });
            }
        });
    }

    httpHinttone(hintTone) {
        let param = {
            hintTone: hintTone,
            id: this.userId || ""
        };
        Loading.show();
        let successCallback = (code, message, json, option) => {
            Loading.hide();
            Toast.show(hintTone == 1 ? "开启成功" : "关闭成功");
            Storage.getUserInfo((obj) => {
                Storage.saveUserInfo(Object.assign(obj, {setting: {hintTone: hintTone}}), () => {
                    this.upView();
                });
            });
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.put(APIGYW.base_usercenter_userapi_v1_1_users + `${param.id}` + "/hinttone", successCallback, failCallback, param);
    }


    render() {
        let userInfo = Storage.getUserInfo();
        let setObj = userInfo && userInfo.setting || {};
        let isOn = setObj && setObj.hintTone == 1 ? true : false;
        let {isNoticeOpen} = this.state;
        let view = <ScrollView style={styles.container}>
            <LayoutBox.Icon
                leftStyle={{flexDirection: "row", alignItems: "center", backgroundColor: "#00000000"}}
                data={[
                    {
                        title: "接收新消息通知",
                        resultValue: isNoticeOpen ? "已开启" : "去开启",
                        type: isNoticeOpen ? "label" : "select",
                        space: true,
                        onPress: () => {
                            MyNativeModule.openSettingNotification((bool) => {

                            });
                        }
                    },
                    {
                        title: "订单提示音",
                        type: "label",
                        rightStyle: {
                            paddingHorizontal: 0,
                            marginVertical: YITU.space_0 + 2,
                        },
                        renderRight: (data) => {
                            return (<SwitchBtn
                                isOn={isOn}
                                cb={(bool) => {
                                    this.httpHinttone(bool ? 1 : 0);
                                }}/>);
                        },
                        space: true,
                        renderSpace: () => {
                            return <Text style={styles.markText}>若关闭提示音，您将不再听到推送通知消息的语音提示。</Text>
                        }
                    },

                    {
                        title: "清除缓存",
                        resultValue: "15.02M" || "",
                        space: true,
                        onPress: () => {

                        }
                    },
                ]}/>

            <SelectCell
                style={styles.button}
                onPress={() => {
                    ModalBox.showSelect({
                        desc: "确认退出?",
                    }, (index) => {
                        if (index === 1) {
                            this.httpLogout(() => {
                                navigation.resetTo(this, "Main");
                            });
                        }
                    });
                }}>
                <Text style={styles.buttonText}>{"退出登录"}</Text>
            </SelectCell>
        </ScrollView>;
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    navBack: () => {
                        navigation.pop(this,);
                    },
                    pageLoading: false,
                    full: false,
                })}>
                {view}
            </PageView>
        );
    }
}

/**
 * switchBtn按钮
 */
class SwitchBtn extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {isOn, cb} = this.props;
        return (<TouchableOpacity
            onPress={() => {
                this.setState({
                    isOn: !isOn
                }, () => {
                    if (cb) {
                        cb(!isOn)
                    }
                });
            }}>
            <Image
                resizeMode={"contain"}
                style={{
                    height: 31,
                    width: 51,
                }} source={isOn ?
                require('../../image/userIcon/switch_on.png') :
                require('../../image/userIcon/switch_off.png')}/>
        </TouchableOpacity>);
    }
}

module.exports = Setting;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
        paddingTop: YITU.space_5
    },
    contentLine: {
        backgroundColor: YITU.c_bg_white,
        width: "100%",
    },
    setCell: {
        // flex:1,
        marginTop: YITU.space_6,
    },
    button: {
        height: YITU.d_RowHeight_1,
        backgroundColor: YITU.backgroundColor_0,
        marginTop: YITU.space_6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        backgroundColor: YITU.backgroundColor_1,
        height: YITU.space_5,
        justifyContent: 'center',
    },
    buttonText: {
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_5,
    },
    markText: {
        color: YITU.textColor_2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: YITU.space_5,
        marginVertical: YITU.space_1,
        paddingVertical: YITU.space_0,
        fontSize: YITU.fontSize_15,
        lineHeight: YITU.fontSize_15 + 5,
    },
    sound: {
        flex: 1,
        flexDirection: 'row',

    },
    soundImg: {
        marginVertical: YITU.d_icon_small,
        alignSelf: "center",
        height: YITU.d_icon,
        width: YITU.d_icon,
    },
    soundTitle: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: YITU.space_6,
        fontSize: YITU.fontSize_4,
        color: YITU.textColor_1,
    },
    switch: {
        alignSelf: 'center',
        marginRight: YITU.space_4
    },

});
