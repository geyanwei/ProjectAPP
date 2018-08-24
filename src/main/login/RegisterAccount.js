import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Platform, NativeModules,
} from 'react-native';
import {PageView, navigation, Toast, Loading, ModalBox} from 'myapplib';
import HttpTool from '../../http/HttpTool';
import TimeDown from './component/TimeDown';
import MyButton from "../../component/MyButton.js";
import LayoutInput from './component/LayoutInput.js';
import AreaCell from './component/AreaCell.js';
import MD5 from 'md5';
import APIGYW from '../../http/APIGYW';
import Config from "../../Config";
import ToolGetGuiderInfor from "./tool/ToolGetGuiderInfor";
import ALiLoginIM from "./tool/ALiLoginIM.js";
import Storage from "../../tool/Storage";
import VerHelp from "../../tool/VerHelp";
import MyNativeMoudles from "../../myNativeModules";
import Tool from "../../tool/Tool";

let keyBoard = {};
if (Platform.OS === 'ios') {
    keyBoard.behavior = "padding"
}

class RegisterAccount extends Component {

    constructor(props) {
        super(props);
        let profileObj = Storage.getAppConfig || {};
        this.objH5 = profileObj.h5 || {};
        this.state = {
            upData: 1,
        };
        this.isAgree = false;
        this.areaCode = "";
    }

    componentWillUnmount(){
        Keyboard.dismiss();
    }
    upView(cb) {
        this.setState({
            upData: this.state.upData + 1,
        }, cb)
    }

    /**
     * 获取验证码
     */
    httpGetCode(callback) {
        if(this.areaCode==""){
            Toast.show("请选择国家区号");
            return;
        }
        let mobile = this.mobile ? this.mobile.replace(/\s+/g, "") : "";
        let requestKey = this.areaCode + "-" + mobile;
        let param = {
            key: requestKey,
            type: "1",
            length: "6",
        };

        let successCallback = (code, message, json, option) => {
            Toast.show("发送成功");
            if (callback) {
                callback();
            }
        };
        let failCallback = (code, message) => {
            Toast.show(message);
        };
        HttpTool.get(APIGYW.base_usercenter_authapi_v1_1_smscodes + `/${param.type}/${param.key}`, successCallback, failCallback, param);
    }

    clickRegister() {
        let postValue = {};
        let userData = this.viewData || [];
        if(this.areaCode==""){
            Toast.show("请选择国家区号");
            return;
        }
        for (let obj of userData) {
            if (obj.type !== "line") {
                if (!LayoutInput.showMessage(obj, this)) {
                    return true;
                }
                postValue[obj.name] = LayoutInput.getValue(obj, this);
            }
        }
        if (postValue.password && postValue.password.length < 6) {
            Toast.show("密码不能少于6位");
            return;
        }
        if (!VerHelp.getPassWord(postValue.password)) {
            ModalBox.showDescCustom({
                desc:"您的密码安全性太弱，存在风险，请设置由6-12位字母和数字组合的密码",
                btnTitle:"确定",
            });
            return;
        }

        if (!this.isAgree) {
            Toast.show("请先同意《易途吧司导协议》");
            return;
        }
        this.httpRegister(postValue);
    }

    dealCityData(arr) {
        let cityArr = [];
        arr.map((item, index) => {
            cityArr.push({
                id: item.id,
                name: item.name,
                country_id:item.countryId
            });
        });
        return cityArr;
    }

    /**
     * 注册
     */
    httpRegister(postValue) {
        if (!this.cityArr||this.cityArr.length<1){
            Toast.show("请选择服务城市");
        }
        let citys = this.dealCityData(this.cityArr || []);
        let mobile = postValue.mobile ? postValue.mobile.replace(/\s+/g, "") : "";
        let param = {
            mobile: this.areaCode + "-" + mobile,
            mobileCode: postValue.mobileCode,
            password: MD5(postValue.password),
            appId: Config.appId,
            source: 1,
            serviceCitys: citys,
            deviceId: MyNativeMoudles.registrationId
        };
        Loading.show();
        let successCallback = (code, message, json, option) => {
            Storage.saveInfo("myMobile",{
                mobile:this.mobile,
                areaCode:this.areaCode,
            });

            //* 保存用户信息
            let userInfor = json.userInfo || {};
            userInfor.userName = userInfor.name||null;
            //登录阿里百川
            ALiLoginIM.loginIM(userInfor.id, userInfor.id);

            HttpTool.setAuthHeader({Authorization: json.accessToken});
            //再次保存用户信息，覆盖删除配置信息
            ToolGetGuiderInfor.getGuiderInfor((myCode,myMsg,data)=>{
                if (myCode===1){
                    Storage.saveUserInfo(Object.assign(json, userInfor,data), (error) => {
                        if (error) {
                            Loading.hide();
                            Toast.show("保存用户信息失败");
                        } else {
                            Loading.hide();
                            Keyboard.dismiss();
                            let person = {
                                userid: "杭州易途吧",
                                groupid: 163665646,
                                content: "新司导注册成功"
                            };
                            //TODO 注册后发消
                            // NativeModules.ChatNativeModule.sendMessage(person, (err) => {
                            //     log("注册后发消息!!!!!!!!!!!!!!!!!!");
                            //     log(err)
                            // });

                            navigation.push(this, "RegisterSuccess", {
                                title: "注册成功",
                            });
                        }
                    }, true);
                } else {
                    Loading.hide();
                    Toast.show("获取信息失败");
                }
            });
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.post(APIGYW.driverapp_user_register, successCallback, failCallback, param);
    }

    renderInputData() {
        this.viewData = [
            {
                type: "line",
            },
            {
                type: "input",
                title: "手机号码",
                value: this.mobile ? Tool.getMobileGroup(this.mobile) : "",
                name: "mobile",
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
                callBack: (text) => {
                    this.checkValue();
                    this.mobile = text;
                    this.refCodeBtn.setPhoneNumber(text);
                }
            },
            {
                type: "line",
            },
            {
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
            }, {
                type: "line",
            }, {
                type: "input",
                title: "设置密码",
                name: "password",
                prop: {
                    defaultValue: "",
                    placeholder: "6-12位字母和数字组成",
                    secureTextEntry:true,
                    keyboardType: "ascii-capable",
                    maxLength: 12
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
            }, {
                type: "line",
            }];
        return this.viewData;
    }

    checkValue() {
        let userData = this.viewData || [];
        for (let obj of userData) {
            if (obj.type !== "line") {
                if ((!this.cityArr||this.cityArr.length<1)||this.areaCode==""||LayoutInput.getValue(obj, this) == "") {
                    MyButton.setDisabled(this.refBtn,true);
                    return;
                } else {
                    MyButton.setDisabled(this.refBtn,false);
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
            dataViewS.push(<View key={i} style={{flexDirection: "row",}}>
                <View style={{flex: 1}}>
                    <LayoutInput
                        ref={(ref) => {
                            obj.ref = ref;
                        }}
                        obj={this}
                        data={obj}/>
                </View>
                {obj.name == "mobile" ? <TimeDown
                    ref={(a) => this.refCodeBtn = a}
                    style={styles.timeDownBtn}
                    obj={this}
                    func={(callback) => {
                        this.httpGetCode(callback)
                    }}/> : null}
            </View>);
        }
        return (<View style={{marginHorizontal: YITU.space_5,}}>
            {dataViewS}
        </View>);
    }


    render() {
        let main = (
            <KeyboardAvoidingView {...keyBoard} style={{flex: 1}}>
                <ScrollView style={styles.main}
                            keyboardShouldPersistTaps={"handled"}
                            keyboardDismissMode={"none"}>
                    <ImageBackground style={{width: YITU.screenWidth, height: 0.5 * YITU.screenWidth}}
                                     source={require("../../image/login/new_resister_pic.png")}>
                        <View style={styles.titleRow}>
                            <TouchableOpacity onPress={() => {
                                navigation.pop(this)
                            }}>
                                <Image
                                    style={{marginLeft: YITU.space_5, width: YITU.BAR_HEIGHT, height: YITU.BAR_HEIGHT}}
                                    source={require('../../image/login/zc-back.png')}/>
                            </TouchableOpacity>

                            <View style={{marginRight: YITU.space_5, width: YITU.BAR_HEIGHT, height: YITU.BAR_HEIGHT}}/>
                        </View>
                        <Image style={styles.descImg} source={require('../../image/login/slogan.png')}/>
                    </ImageBackground>

                    <AreaCell obj={this} title={"服务城市"} isSelCitys={true}
                              callBack={(val)=>{
                                  this.cityArr = val;
                                  this.checkValue();
                              }}/>
                    <View style={{marginHorizontal:YITU.space_5,height:StyleSheet.hairlineWidth,backgroundColor:YITU.backgroundColor_Line}}/>

                    <AreaCell obj={this} title={"国家区号"}
                              callBack={(areaCode)=>{
                                  this.areaCode = areaCode;
                                  this.checkValue();
                              }}/>

                    {this.renderInput(this.renderInputData() || {})}

                    <AgreeBtn isAgree={this.isAgree}
                              url={this.objH5 && this.objH5.driverProtocol || ""}
                              obj = {this}
                              cb={(isAgree)=>{
                                  this.isAgree = isAgree;
                              }}/>

                    <MyButton ref={(a)=>this.refBtn = a}
                              disabled={true}
                              underlayColor={YITU.backgroundColor_11}
                              underlayTxtColor='#FFFFFFf0'
                              onPress={() => {
                                  Keyboard.dismiss();
                                  this.clickRegister()
                              }}>立即注册
                    </MyButton>
                </ScrollView>
            </KeyboardAvoidingView>
        );
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    pageLoading: false,
                    full: true
                })}
            >
                {main}
            </PageView>
        );
    }
}

/**
 * AgreeBtn
 */
class AgreeBtn extends Component {
    constructor(props) {
        super(props);
        this.state={
            isAgree:props.isAgree||false
        }
    }

    render() {
        let {url,obj,cb} = this.props;
        let {isAgree} = this.state;
        return (<View
            style={{marginTop: YITU.space_1, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity
                style={{width: 25, height: 30, alignItems: "center", justifyContent: "center"}}
                activeOpacity={1}
                onPress={() => {
                    this.setState({
                        isAgree: !isAgree
                    },()=>{
                        cb(!isAgree);
                    });
                }}>
                <Image style={{width: YITU.d_icon_small, height: YITU.d_icon_small}}
                       resizeMode={"contain"}
                       source={isAgree ? require("../../image/login/xz.png") : require("../../image/login/wgx.png")}/>
            </TouchableOpacity>

            <Text style={styles.agreeTitle}>{"我已阅读并同意"}</Text>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.push(obj, "BrowserPage", {
                        title: "关于我们",
                        url: url,
                    });
                }}>
                <Text style={styles.agreeDesc}>{"《易途吧司导协议》"}</Text>
            </TouchableOpacity>
        </View>);
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_0,
    },
    titleRow: {
        flexDirection: "row",
        marginTop: YITU.barStateHeight + YITU.space_2,
        height: YITU.BAR_HEIGHT,
    },
    descImg: {
        position: "absolute",
        bottom: YITU.space_3,
        right: YITU.space_5,
        height: 0.122 * 0.5 * YITU.screenWidth,
        width: 7.13 * 0.122 * 0.5 * YITU.screenWidth,
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
    descStyle: {
        textAlign: "center",
        fontSize: 14,
        color: YITU.textColor_1,
        lineHeight: 21
    },
    agreeTitle: {
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_15,
    },
    agreeDesc: {
        fontSize: YITU.fontSize_15,
        color: YITU.textColor_4,
    }
});

module.exports = RegisterAccount;
