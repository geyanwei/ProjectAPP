import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import {PageView, Loading, navigation, ModalBox, Toast} from 'myapplib';
import TimeDown from './component/TimeDown.js';
import MyButton from "../../component/MyButton.js";
import LayoutInput from './component/LayoutInput.js';
import AreaCell from './component/AreaCell.js';
import Config from "../../Config";
import MD5 from "md5";
import APIGYW from "../../http/APIGYW";
import HttpTool from '../../http/HttpTool';
import VerHelp from "../../tool/VerHelp";
import Tool from "../../tool/Tool";

let keyBoard = {};
if (Platform.OS === 'ios') {
    keyBoard.behavior = "padding"
}

class PasswordForget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
        };
        this.areaCode = "";
    }


    componentDidMount() {

    }
    componentWillUnmount(){
        Keyboard.dismiss();
    }
    upView(cb) {
        this.setState({
            upData: this.state.upData + 1,
        }, cb);
    }

    //发送验证码
    httpGetCode(callback) {
        if(this.areaCode==""){
            Toast.show("请选择国家区号");
            return;
        }
        let mobile = this.mobile ? this.mobile.replace(/\s+/g, "") : "";
        let requestKey = this.areaCode + "-" + mobile;
        let param = {
            key: requestKey,
            type: "2",
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

    //提交修改密码请求
    httpResetPassword(postValue) {
        let mobile = postValue.mobile ? postValue.mobile.replace(/\s+/g, "") : "";
        let param = {
            mobile: this.areaCode + "-" + mobile,
            option: postValue.mobileCode,
            password: MD5(postValue.newPassword),
            appId: Config.appId,
        };

        Loading.show();
        let successCallback = (code, message, json, option) => {
            Loading.hide();
            ModalBox.showDescCustom({
                desc:"密码重设成功，请前往登录",
                btnTitle:"确定",
            },()=>{
                if (this.props.callBack){
                    this.props.callBack(this.mobile,this.areaCode);
                }
                navigation.pop(this);
            });
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.put(APIGYW.base_usercenter_userapi_v1_1_users_sign, successCallback, failCallback, param);
    }

    //校验并收集数据
    resetPassword() {
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
        if (this.password1.length < 6) {
            Toast.show("密码不能少于6位");
            return;
        }
        if (!VerHelp.getPassWord(this.password1)) {
            ModalBox.showDescCustom({
                desc:"您的密码安全性太弱，存在风险，请设置由6-12位字母和数字组合的密码",
                btnTitle:"我知道了",
            });
            return;
        }

        if (this.password1 !== this.password2) {
            Toast.show("请确保两次输入的密码相同");
            return;
        }
        this.httpResetPassword(postValue);
    }

    //数据源
    renderInputData() {
        this.viewData = [
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
            }, {
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
                type: "input",
                title: "密码",
                name: "newPassword",
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
                    isCloseEyes: true
                },
                callBack: (text) => {
                    this.password1 = text;
                    this.checkValue();
                }
            }, {
                type: "input",
                title: "确认密码",
                name: "newPassword",
                prop: {
                    defaultValue: "",
                    placeholder: "请确认密码",
                    secureTextEntry:true,
                    keyboardType: "ascii-capable",
                    maxLength: 12
                },
                option: {
                    isNeedClear: true,
                    isNeedEyes: true,
                    isCloseEyes: true
                },
                callBack: (text) => {
                    this.password2 = text;
                    this.checkValue();
                }
            }];
        return this.viewData;
    }

    //校验数据 按钮变色
    checkValue() {
        let userData = this.viewData || [];
        for (let obj of userData) {
            if (obj.type !== "line") {
                if (this.areaCode==""||LayoutInput.getValue(obj, this) == "") {
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
            dataViewS.push(
                <View key={i}
                      style={styles.row}>
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
        return dataViewS;
    }


    render() {
        let main = (
            <KeyboardAvoidingView {...keyBoard} style={{flex: 1}}>
                <ScrollView style={styles.main}
                            keyboardShouldPersistTaps={"handled"}
                            keyboardDismissMode={"none"}>
                    <View style={{marginTop:YITU.space_5,backgroundColor:YITU.backgroundColor_0}}>
                        <AreaCell obj={this}
                                  title={"国家区号"}
                                  callBack={(areaCode)=>{
                                      this.areaCode = areaCode;
                                      this.checkValue();
                                  }}/>
                        <View style={styles.row}/>

                        {this.renderInput(this.renderInputData() || {})}
                    </View>


                    <MyButton ref={(a)=>this.refBtn = a}
                        disabled={true}
                        underlayColor={YITU.backgroundColor_11}
                        underlayTxtColor='#FFFFFFf0'
                        onPress={() => {
                            this.resetPassword();
                        }}>确认重设
                    </MyButton>
                    <Text style={styles.desc}>因全球各地区的差异，您收到验证码的等待时间可能较长，请耐心等待</Text>
                </ScrollView>
            </KeyboardAvoidingView>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    navBack: () => {
                        navigation.pop(this);
                    },
                    pageLoading: false
                })}>
                {main}
            </PageView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    row: {
        paddingHorizontal: YITU.space_5, flexDirection: "row",
        borderBottomWidth: 0.5, borderColor: YITU.backgroundColor_Line,
        borderStyle: "solid"
    },
    desc: {
        marginTop: YITU.space_2,
        paddingHorizontal: YITU.space_5,
        fontSize: YITU.fontSize_15,
        color: YITU.textColor_2,
        lineHeight: YITU.fontSize_7,
    },
    alertDescStyle: {
        textAlign: "center",
        fontSize: 14,
        color: YITU.textColor_1,
        lineHeight: 21
    },
    timeDownBtn: {
        alignSelf: "center",
        width: 100,
        height: 35,
        borderRadius: 35/2,
        backgroundColor: YITU.backgroundColor_3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = PasswordForget;