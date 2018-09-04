import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import PasswordInput from '../../../../component/PasswordInput.js'
import HttpTool from '../../../../http/HttpTool';
import APIGYW from "../../../../http/APIGYW";
import Storage from "../../../../tool/Storage";
import md5 from 'md5';
import {PageView, navigation, Loading, Toast, AppInit, ModalBox} from "myapplib"

class SetPayPW extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstPw: "",
            secondTFState: false,
        };
        this.pageKey = this.props.pageKey;
    }

    navBar() {
        return {
            leftButtonFunc: () => {
                if (this.state.firstPw.length < 6) {
                    navigation.pop(this)
                } else {
                    this.setState({
                        firstPw: "",
                    })
                }
            }
        }
    }

    render() {
        let {firstPw} = this.state;
        let view = (<View style={styles.container}>
            <View style={styles.cellTitle}>
                <View style={styles.line}/>
                <Text style={styles.desc}>输入提现密码</Text>
                <View style={styles.line}/>
            </View>
            {<Text
                style={[styles.title, {alignSelf: "center"}]}>{firstPw.length !== 6 ? "该6位数字密码将用于账户提现" : "请再次输入以确认"}</Text>}
            {firstPw.length !== 6 ? <View style={styles.cell}>
                <PasswordInput maxLength={6} onEnd={(pw) => {
                    setTimeout(() => {
                        this.setState({
                            firstPw: pw
                        });
                    }, 200);
                }}/>
            </View> : null}

            {firstPw.length === 6 ? <View style={styles.cell}>
                <PasswordInput maxLength={6}
                               onChange={(text) => {
                                   if (text && text.length >= 6) {
                                       this.setState({
                                           secondTFState: true,
                                       })
                                   } else {
                                       this.setState({
                                           secondTFState: false,
                                       })
                                   }
                               }}
                               onEnd={(pw) => {
                                   this.secondPw = pw;

                               }}/>
            </View> : null}
            {firstPw.length === 6 ? <TouchableOpacity
                onPress={() => {
                    YITU.ClickTrackFunction(YITU.TrackIdentityVerification.setwalletpassword_done);
                    this.resetPayPW(firstPw, this.secondPw);
                }}
                disabled={!(this.secondPw && this.state.secondTFState)}
                style={[styles.btnBg, {backgroundColor: !(this.secondPw && this.state.secondTFState) ? YITU.backgroundColor_4 : YITU.backgroundColor_3}]}>
                <Text style={styles.btn}>完成</Text>
            </TouchableOpacity> : null}

        </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    pageLoading: false,
                    barConfig: this.navBar(),
                })}
            >
                {view}
            </PageView>
        );
    }

    //重置提现密码
    resetPayPW(firstPw, secondPw) {
        // return;
        if (!secondPw || secondPw === "") {
            Toast.show("确认密码不能为空");
            return;
        }
        if (secondPw.length < 6) {
            Toast.show("确认密码为6位数字");
            return;
        }

        let param = {};
        let sort = "";
        let userinfo = Storage.getUserInfo();

        this.userId = userinfo && userinfo.uid || "";

        if (firstPw !== secondPw) {
            Toast.show("密码不一致!");
            return;
        }
        param = {
            "option": this.props.mobileCode,
            "mobile": userinfo.mobile,
            "paypw": md5(secondPw + this.userId + "paypassword"),
            "id": userinfo.id,
        };

        sort = APIGYW.driver_usercenter_forGetPayPasswordDriver;


        Loading.show();
        let hasPay = userinfo.hasPaypw;
        let successCallback = (code, message, json, option) => {
            Loading.hide();
            Storage.getUserInfo((obj) => {
                Storage.saveUserInfo(Object.assign(obj, {"hasPaypw": true}))
            });

            ModalBox.showDescCustom({
                desc: hasPay ? "提现密码重置成功" : "提现密码设置成功",
                btnTitle: "确定",
            }, () => {
                YITU.ClickTrackFunction(YITU.TrackIdentityVerification.setwalletpassword_successensure);
                AppInit.removeRoutes(AppInit.ref, ["VerIdentify"]);
                navigation.popTo(this, this.props.pageKey, () => {
                    if (this.props.callBack) {
                        this.props.callBack();
                    }
                });
            });
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);

        };
        HttpTool.put("/base-usercenter/userapi/v1.1/users/" + `${param.id}` + "/paypw", successCallback, failCallback, param);
    }
}

module.exports = SetPayPW;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: YITU.space_1,
        backgroundColor: YITU.backgroundColor_1,
    },
    cellTitle: {
        paddingHorizontal: YITU.space_8,
        paddingVertical: YITU.space_6 * 2,
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: YITU.backgroundColor_Line,
    },
    desc: {
        paddingHorizontal: YITU.space_6,
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_2
    },
    title: {
        paddingBottom: YITU.space_8,
        fontSize: YITU.fontSize_5,
        color: YITU.textColor_0,
        textAlign: "center",
    },

    cell: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    btnBg: {
        paddingVertical: YITU.space_3,
        backgroundColor: YITU.backgroundColor_3,
        marginTop: YITU.space_8 * 2,
        marginHorizontal: YITU.space_5,
        borderRadius: YITU.radius_1,
    },
    btn: {
        textAlign: "center",
        fontSize: YITU.fontSize_6,
        color: YITU.c_title_white
    }

});
