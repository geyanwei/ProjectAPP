import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Platform, NativeModules,
    DeviceEventEmitter,
} from 'react-native';
import {ModalBox, Loading, Toast, navigation, PageView} from 'myapplib';
import Storage from '../../tool/Storage.js';
import MD5 from 'md5';
import Config from '../../Config.js';
import HttpTool from '../../http/HttpTool';
import APIGYW from '../../http/APIGYW';
import Safe_ from "../../http/Safe.js";
import MyNativeMoudles from '../../myNativeModules.js';
import MyButton from "../../component/MyButton.js";
import LayoutInput from './component/LayoutInput.js';
import AreaCell from './component/AreaCell.js';
import Tool from "../../tool/Tool";
import ToolGetGuiderInfor from "./tool/ToolGetGuiderInfor.js";
import Orientation from "react-native-orientation";
import MyShearHelp from "../share/MyShearHelp.js";

import TimeDown from './component/TimeDown.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../component/ModifiedScrollableTabBar';

let Safe = new Safe_();

let keyBoard = {};
if (Platform.OS === 'ios') {
    keyBoard.behavior = "padding"
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.areaCode = "";
        this.initMobile();
        this.smallIndex = 0;

        this.state = {
            label: ["易途吧账号登录","动态密码登录"] ,
            isLeft:true,
            upData: 1,
        }
    }

    upView(cb) {
        this.setState({
            upData: this.state.upData + 1,
        }, () => {
            cb && cb();
        });
    }

    componentDidMount() {
        Orientation.lockToPortrait()
    }

    initMobile() {
        Storage.getInfo("myMobile", (error, obj) => {
            if (!error) {
                this.mobile = obj && obj.mobile || "";
                this.areaCode = obj && obj.areaCode || "";
                this.upView();
            }
        });
    }

    login() {
        let postValue = {};
        let userData = this.viewData || [];
        if (this.areaCode == "") {
            Toast.show("请选择国家区号");
            return;
        }
        for (let obj of userData) {
            if (obj.type !== "line") {
                if (obj && obj.value && obj.field === "mobile" && (obj.areaCode === "" || !obj.areaCode)) {
                    Toast.show("请选择国家区号");
                    return;
                }

                if (!LayoutInput.showMessage(obj, this)) {
                    return true;
                }
                postValue[obj.name] = LayoutInput.getValue(obj, this);
            }
        }
        postValue.mobile = postValue.mobile ? postValue.mobile.replace(/\s+/g, "") : "";
        this.getLogin(postValue);
    }

    getLogin(postValue) {
        let account = this.areaCode + "-" + postValue.mobile;
        let params = {
            account: account,
            type: 0
        };
        Loading.show();
        let successCallback = (code, message, json, option) => {
            this.httpLogin(json, account, postValue.password||"q111111");
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.get(APIGYW.base_usercenter_authapi_v1_1_tokens_codes, successCallback, failCallback, params);
    }

    httpLogin(dataStr, account, password) {
        let signature = "";
        if (dataStr.length === 32) {
            signature = MD5(MD5(account + MD5(password)) + dataStr);
        } else {
            signature = "-" + Safe.AESEncryption(dataStr, password, true);
        }
        let params = {
            appId: Config.appId,
            account: account,
            signature: signature,
            deviceId: MyNativeMoudles.registrationId
        };
        let successCallback = (code, message, json, option) => {
            Storage.saveInfo("myMobile", {
                mobile: this.mobile,
                areaCode: this.areaCode
            });

            //* 保存用户信息
            let userInfor = json.userInfo || {};
            userInfor.userName = userInfor.name || null;

            HttpTool.setAuthHeader({Authorization: json.accessToken});
            //再次保存用户信息，覆盖删除配置信息
            ToolGetGuiderInfor.getGuiderInfor((myCode, myMsg, data) => {
                if (myCode === 1) {
                    Storage.saveUserInfo(Object.assign(json, userInfor, data), (error) => {
                        if (error) {
                            Loading.hide();
                            Toast.show("保存用户信息失败");
                        } else {
                            this.props.login && this.props.login();
                        }
                    }, true);
                } else {
                    Loading.hide();
                    Toast.show("获取信息失败");
                }
            });
        };
        let failCallback = (code, message) => {
            Storage.saveInfo("myMobile", {
                mobile: this.mobile,
                areaCode: this.areaCode
            });
            Loading.hide();
            ModalBox.showDescCustom({desc: message});
        };
        HttpTool.get(APIGYW.base_usercenter_authapi_v1_1_tokens, successCallback, failCallback, params);
    }

    //数据源
    renderInputData() {
        this.viewData = [
            // {
            //     type: "line",
            // },
            {
                title: "手机号码",
                placeHolder: "必填",
                type: "phone",
                name: "mobile",
                areaCode: this.areaCode || "",
                value: this.mobile ? Tool.getMobileGroup(this.mobile) : "",
                isCheck: true,
                prop: {
                    defaultValue: "",
                    placeholder: "请填写手机号",
                    keyboardType: "numeric",
                    maxLength: 31
                },
                option: {
                    isMobileNum: true,
                    isGroup: true,
                    isNeedClear: true,
                    isNeedEyes: false,
                },
                callBack: (valueData, obj) => {
                    if (obj && obj.isArea) {
                        navigation.push(this, "AreaCodeChoose", {
                            title: "选择国家区号",
                            callback: (areaCode) => {
                                this.areaCode = areaCode|| "";
                                valueData.areaCode = this.areaCode;
                                valueData.value = this.mobile ? Tool.getMobileGroup(this.mobile) : "";
                                valueData.refs && valueData.refs.setData(valueData);
                                this.checkValue();
                            }
                        });
                    } else {
                        let text = obj && obj.value;
                        this.mobile = text;
                        valueData.value = this.mobile ? Tool.getMobileGroup(this.mobile) : "";
                        this.refCodeBtn&&this.refCodeBtn.setPhoneNumber(text);
                        this.checkValue();
                    }
                }
            },
            // {
            //     type: "line",
            // },
            // {
            //     type: "input",
            //     title: "手机号码",
            //     value: this.mobile ? Tool.getMobileGroup(this.mobile) : "",
            //     name: "mobile",
            //     prop: {
            //         defaultValue: "",
            //         placeholder: "请填写手机号",
            //         keyboardType: "numeric",
            //         maxLength: 31
            //     },
            //     option: {
            //         isMobileNum: true,
            //         isGroup: true,
            //         isNeedClear: true,
            //         isNeedEyes: false,
            //     },
            //     callBack: (text) => {
            //         this.mobile = text;
            //         this.refCodeBtn&&this.refCodeBtn.setPhoneNumber(text);
            //         this.checkValue();
            //     }
            // },
            {
                type: "line",
            },
        ];

        if (this.state.isLeft){
            this.viewData.push({
                type: "input",
                title: "密码",
                name: "password",
                value:this.password||"",
                prop: {
                    defaultValue: "",
                    secureTextEntry: true,
                    placeholder: "请输入密码",
                    keyboardType: "ascii-capable",
                    maxLength: 30
                },
                option: {
                    isNeedClear: true,
                    isNeedEyes: true,
                    isCloseEyes: true,
                },
                callBack: (text) => {
                    this.password = text;
                    this.checkValue();
                }
            });
        } else {
            this.viewData.push( {
                type: "input",
                title: "验证码    ",
                value: this.mobileCode || "",
                name: "mobileCode",
                reg: /^\d{6}$/,
                msg: "请输入验证码（6位数字）",
                prop: {
                    defaultValue: "",
                    placeholder: "请输入验证码",
                    keyboardType: "numeric",
                    maxLength: 6
                },
                option: {
                    isNeedClear: true,
                },
                callBack: (text) => {
                    this.mobileCode = text;
                    this.checkValue();
                }
            },)
        }

        this.viewData.push({
            type: "line",
        });
        return this.viewData;
    }

    //校验数据 按钮变色
    checkValue() {
        let userData = this.viewData || [];
        for (let obj of userData) {
            if (obj.type !== "line") {
                if (this.areaCode == "" || LayoutInput.getValue(obj, this) == "") {
                    MyButton.setDisabled(this.refBtn, true);
                    return;
                } else {
                    MyButton.setDisabled(this.refBtn, false);
                }
            }
        }
    }

    //输入框
    renderInput(dataS) {
        if (!dataS || dataS.length < 1) {
            return;
        }
        let dataViewS = [];
        for (let i = 0; i < dataS.length; i++) {
            let obj = dataS[i];
            dataViewS.push(<View key={i} style={styles.cell}>
                <View style={{flex: 1}}>
                    <LayoutInput ref={(ref) => obj.refs = ref} data={obj}/>
                </View>
                {obj.name == "mobileCode" ? <TimeDown
                    ref={(a) => this.refCodeBtn = a}
                    style={styles.timeDownBtn}
                    obj={this}
                    func={(callback) => {
                        this.httpGetCode(callback)
                    }}/> : null}
            </View>);
        }
        return dataViewS;
    }

    render() {
        let {label,isLeft} = this.state;
        let main = (
            <KeyboardAvoidingView {...keyBoard} style={{flex: 1}}>
                {this.createNavHead()}
                <View style={{height:50}}>
                    <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar/>}
                        tabBarBackgroundColor={YITU.backgroundColor_0}
                        tabBarActiveTextColor={YITU.textColor_4}
                        tabBarInactiveTextColor={YITU.textColor_0}
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        tabBarTextStyle={{fontSize:15}}
                        initialPage={this.smallIndex}
                        onChangeTab={(obj) => {
                            this.setState({
                                isLeft:obj.i===0?true:false
                            },()=>{
                                this.refCodeBtn&&this.refCodeBtn.setPhoneNumber(this.mobile);
                                this.checkValue();
                            });
                        }}>
                        {
                            label.map((item, index) => {
                                return (<View style={{flex: 1}} key={index} tabLabel={item}/>)})
                        }
                    </ScrollableTabView>
                </View>


                <ScrollView style={styles.main} scrollEnabled={false} keyboardShouldPersistTaps={"handled"}
                            keyboardDismissMode={"none"}>

                    <View style={{marginHorizontal: YITU.space_2}}>
                        {/*<AreaCell obj={this}*/}
                                  {/*value={this.areaCode}*/}
                                  {/*title={"国家区号"}*/}
                                  {/*callBack={(areaCode) => {*/}
                                      {/*this.areaCode = areaCode;*/}
                                      {/*this.checkValue();*/}
                                  {/*}}/>*/}
                        {this.renderInput(this.renderInputData() || {})}
                    </View>

                    <MyButton
                        ref={(a) => this.refBtn = a}
                        disabled={true}
                        underlayColor={YITU.backgroundColor_11}
                        underlayTxtColor='#FFFFFFf0'
                        noClickedBackgroundColor={YITU.backgroundColor_15}
                        onPress={() => {
                            this.login();
                        }}>登录
                    </MyButton>

                    <View style={{marginTop: YITU.space_5, flexDirection: "row", paddingHorizontal: YITU.space_5}}>
                        <TouchableOpacity
                            style={{flexDirection: "row"}}
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.push(this, "RegisterAccount",{
                                    title:"立即注册"
                                });
                            }}>
                            <Text style={{fontSize: YITU.fontSize_3, color: YITU.textColor_2}}>
                                没有账号？
                            </Text>
                            <Text style={{fontSize: YITU.fontSize_3, color: YITU.textColor_4}}>
                                立即注册
                            </Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>

                        {isLeft?<TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.push(this, "PasswordForget", {
                                    title: "忘记密码",
                                    callBack: (mobile, areaCode) => {
                                        this.mobile = mobile;
                                        this.areaCode = areaCode;
                                        this.upView(() => {
                                            this.checkValue();
                                        });
                                    }
                                });
                            }}>
                            <Text style={{fontSize: YITU.fontSize_3, color: YITU.textColor_2}}>
                                忘记密码
                            </Text>
                        </TouchableOpacity>:null}
                    </View>
                </ScrollView>

                {this.createSanFangView()}

            </KeyboardAvoidingView>);
        return main;
    }

    //创建三方View
    createSanFangView(){
        return (<View style={{
            position:"absolute",
            bottom:0,
            left:0,
            width:"100%",
            backgroundColor: YITU.backgroundColor_0}}>
            <View style={styles.row}>
                <View style={styles.line}/>
                <Text style={styles.text}>第三方登录</Text>
                <View style={styles.line}/>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={{alignSelf: "center", marginBottom: YITU.space_8 * 2}}
                onPress={() => {
                    this.sanFangLogin();
                }}>
                <Image
                    resizeMode={"contain"}
                    style={{width: 50, height: 50}}
                    source={require("../../image/order/image/icon_weChat.png")}/>
            </TouchableOpacity>
        </View>)
    }
    //调用三方事件
    sanFangLogin() {
        MyShearHelp.myLoginHelp(2, (userData) => {
            alert(JSON.stringify(userData));
        });
    }
    //创建头部Nav
    createNavHead(){
        return (<View style={styles.navCell}>
            <TouchableOpacity
                style={styles.navBackIconBg}
                onPress={() => {
                    alert("关闭");
                }}>
                <Text style={{
                    paddingLeft: YITU.space_6,
                    fontSize: YITU.fontSize_5,
                    color: YITU.textColor_4,
                }}>{"关闭"}
                </Text>
            </TouchableOpacity>

            <View style={styles.navTitleBg}>
                <Text style={styles.navTitle}>{"登录"}</Text>
            </View>

            <View style={[styles.navBackIconBg]}/>
        </View>);
    }
}
module.exports = Login;

const styles = StyleSheet.create({
    main: {
        backgroundColor: YITU.backgroundColor_0
    },
    navCell: {
        width: "100%",
        paddingTop: YITU.barStateHeight,
        height: YITU.BAR_HEIGHT + YITU.barStateHeight,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'white',
        borderStyle: "solid",
        borderBottomColor: "#888888",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    navTitleBg: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center"
    },
    navTitle: {
        fontSize: YITU.fontSize_7,
        color: YITU.textColor_0,
        fontFamily: YITU.fontName_regular,
        fontWeight: "bold",
        textAlign: "center",
    },
    navBackIconBg: {
        width: 70,
        flexDirection: "row",
        alignItems: "center",
    },
    tabBarUnderline: {
        backgroundColor: YITU.backgroundColor_3,
        height: 2,
    },

    cell: {
        paddingHorizontal: YITU.space_5, flexDirection: "row",
    },
    timeDownBtn: {
        alignSelf: "center",
        width: 100,
        height: 35,
        borderRadius: 35/2,
        backgroundColor: YITU.backgroundColor_3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        marginHorizontal: YITU.space_6,
        marginTop: YITU.space_8,
        marginBottom: YITU.space_6,
        alignItems: "center",
        flexDirection: "row",
    },
    line: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: YITU.backgroundColor_Line
    },
    text: {
        marginHorizontal: YITU.space_5,
        fontSize: YITU.fontSize_4,
        color: YITU.textColor_5
    },
});

