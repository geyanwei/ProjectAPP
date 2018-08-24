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
import ALiLoginIM from "./tool/ALiLoginIM.js";
import Orientation from "react-native-orientation";
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
        this.state = {
            upData: 1,
        }
    }

    upView(cb) {
        this.setState({
            upData: this.state.upData + 1,
        }, () => {
            if (cb) {
                cb();
            }
        });
    }

    componentDidMount() {

        Orientation.lockToPortrait()
    }

    initMobile(){
        Storage.getInfo("myMobile",(error,obj)=>{
            if (!error){
                this.mobile = obj&&obj.mobile||"";
                this.areaCode = obj&&obj.areaCode||"";
                this.upView();
            }
        });
    }

    login() {
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
            this.httpLogin(json, account, postValue.password);
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.get(APIGYW.base_usercenter_authapi_v1_1_tokens_codes, successCallback, failCallback, params);
    }

    loginIM(userId){
        ALiLoginIM.loginIM(userId,userId,(error)=>{
            if (error && error.error){//登录失败
                this.loginIM(userId);
            } else {
                let data = {
                    userid: "杭州易途吧",
                    groupid: 163665646,
                    count:30,
                    content:"同步成功"
                };
                ALiLoginIM.getMessageList(data,(result)=>{
                    if (result.result.length > 0) {//不发消息

                    }else {//发消息
                        ALiLoginIM.sendMessage(data,(response)=>{
                            log(response);
                        })
                    }
                })

            }
        });
    }

    httpLogin(dataStr, account, password) {
        let signature = "";
        if (dataStr.length===32){
            signature = MD5(MD5(account + MD5(password)) + dataStr);
        } else {
            signature = "-"+Safe.AESEncryption(dataStr,password,true);
        }
        let params = {
            appId: Config.appId,
            account: account,
            signature: signature,
            deviceId: MyNativeMoudles.registrationId
        };
        let successCallback = (code, message, json, option) => {
            Storage.saveInfo("myMobile", {
                mobile:this.mobile,
                areaCode:this.areaCode
            });

            //* 保存用户信息
            let userInfor = json.userInfo || {};
            userInfor.userName = userInfor.name||null;
            //登录阿里百川
            this.loginIM(userInfor.id);

            HttpTool.setAuthHeader({Authorization: json.accessToken});
            //再次保存用户信息，覆盖删除配置信息
            ToolGetGuiderInfor.getGuiderInfor((myCode,myMsg,data)=>{
                if (myCode===1){
                    Storage.saveUserInfo(Object.assign(json, userInfor,data), (error) => {
                        if (error) {
                            Loading.hide();
                            Toast.show("保存用户信息失败");
                        } else {
                            if (this.props.login) {
                                this.props.login();
                            }
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
                mobile:this.mobile,
                areaCode:this.areaCode
            });
            Loading.hide();
            ModalBox.showDescCustom({desc:message});
        };
        HttpTool.get(APIGYW.base_usercenter_authapi_v1_1_tokens, successCallback, failCallback, params);
    }

    //数据源
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
                    this.mobile = text;
                    this.checkValue();
                }
            },
            {
                type: "line",
            },
            {
                type: "input",
                title: "密码",
                name: "password",
                prop: {
                    defaultValue: "",
                    secureTextEntry:true,
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
            },
            {
                type: "line",
            },
        ];
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
            dataViewS.push(<LayoutInput
                key={i}
                ref={(ref) => {
                    obj.ref = ref;
                }}
                obj={this}
                data={obj}/>);
        }
        return (<View style={{marginHorizontal: YITU.space_5}}>
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
                                     source={{uri: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532517819145&di=e56066fb17344256301bfbdcc0969d0f&imgtype=0&src=http%3A%2F%2Fimg1qn.moko.cc%2F2016-07-26%2F79726bdb-2247-4db6-ac16-6d170dc48982.jpg%3FimageView2%2F2%2Fw%2F915%2Fh%2F915"} }>
                        <Image style={styles.descImg} source={require('../../image/login/slogan.png')}/>
                    </ImageBackground>

                    <AreaCell obj={this}
                              value={this.areaCode}
                              title={"国家区号"}
                              callBack={(areaCode) => {
                                  this.areaCode = areaCode;
                                  this.checkValue();
                              }}/>

                    {this.renderInput(this.renderInputData() || {})}
                    <View style={styles.forgetPWRow}>
                        <TouchableOpacity onPress={() => {
                            Keyboard.dismiss();
                            navigation.push(this, "PasswordForget", {
                                title: "忘记密码",
                                callBack: (mobile,areaCode) => {
                                    this.mobile = mobile;
                                    this.areaCode = areaCode;
                                    this.upView(()=>{
                                        this.checkValue();
                                    });
                                }
                            });
                        }}>
                            <Text style={{color: YITU.textColor_3, fontSize: YITU.fontSize_15}}>{"忘记密码?"}</Text>
                        </TouchableOpacity>
                    </View>

                    <MyButton
                        ref={(a) => this.refBtn = a}
                        disabled={true}
                        underlayColor={YITU.backgroundColor_11}
                        underlayTxtColor='#FFFFFFf0'
                        noClickedBackgroundColor={YITU.backgroundColor_4}
                        onPress={() => {
                            // let a = undefined;
                            // alert(a.time);
                            this.login();
                        }}>登录
                    </MyButton>

                    <View style={{
                        padding:StyleSheet.hairlineWidth,
                        backgroundColor: YITU.backgroundColor_Line_1,
                        marginHorizontal: YITU.space_5,
                        marginTop: YITU.space_5,
                        borderRadius:YITU.radius_1,
                        overflow:"hidden"
                    }}>
                        <MyButton
                            style={styles.register}
                            txtStyle={{color: YITU.textColor_1, fontSize: 18, textAlign: 'center'}}
                            backgroundColor={YITU.backgroundColor_0}
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.push(this, "RegisterAccount",);
                            }}>注册
                        </MyButton>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>);
        return main;
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_0
    },
    descImg: {
        position: "absolute",
        bottom: YITU.space_3,
        right: YITU.space_5,
        height: 0.122 * 0.5 * YITU.screenWidth,
        width: 7.13 * 0.122 * 0.5 * YITU.screenWidth,
    },
    forgetPWRow: {
        marginTop: YITU.space_5,
        marginHorizontal: YITU.space_5,
        flexDirection: 'row',
        justifyContent: "flex-end",
    },
    register: {
        flex:1,
        paddingVertical: 5,
        height: 45,
        borderRadius: YITU.radius_1,
        backgroundColor: YITU.backgroundColor_0,
    }
});
module.exports = Login;
