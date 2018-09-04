import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput, NativeModules,
} from 'react-native';
import HttpTool from '../../../../http/HttpTool';
import APIJH from '../../../../http/APIJH';
import Storage from "../../../../tool/Storage";
import {PageView, ModalBox, Toast, navigation} from "myapplib"
import md5 from 'md5'
import InputSpace from '../../../../component/InputSpace.js';
import VerHelp from "../../../../tool/VerHelp.js";


class AlterLoginPW extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            secondPassword: "",
            show: false,
        };

        this.textAry = [
            {
                title: "输入旧密码",
                icon: require('../../../../image/user/xgdlmm-2.png')
            },
            {
                title: "输入新密码",
                icon: require('../../../../image/user/xgdlmm-2.png')
            },
            {
                title: "再次输入新密码",
                icon: require('../../../../image/user/xgdlmm-2.png')
            },];
    }


    createTextInput(ary) {
        return ary.map((item, index) => {
            return (<MyInput key={index} data={item} cb={(text) => {
                if (index === 0) {

                    this.setState({
                        oldPassword: text
                    })
                } else if (index === 1) {
                    this.setState({
                        newPassword: text
                    })
                } else {
                    this.setState({
                        secondPassword: text
                    })
                }
            }}/>)
        })

    }

    commit() {
        log(this.state.oldPassword + "------" + this.state.newPassword + "????" + this.state.secondPassword);
        if (this.state.newPassword !== this.state.secondPassword) {
            Toast.show("新密码两次输入密码不一致");
            return;
        }
        if (this.state.newPassword.length < 6 || !VerHelp.getPassWord(this.state.newPassword)) {
            Toast.show("新密码格式不正确,请重新输入");
            return;
        }
        let userinfo = Storage.getUserInfo();
        let data = {
            "id": userinfo.id,
            "option": md5(this.state.oldPassword),
            "password": md5(this.state.newPassword)
        };
        let successCallBack = (code, message, json) => {
            ModalBox.showDescCustom({
                desc: "密码修改成功,请重新登录",
                btnTitle: "重新登录",
            }, () => {
                YITU.ClickTrackFunction(YITU.TrackChangeLoginPassword.mine_accountssafe_modifypassword_login);
                Storage.clearUserInfo(() => {
                    NativeModules.ChatNativeModule.deleteBadgeNumber();
                    NativeModules.ChatNativeModule.logout();
                    navigation.resetTo(this, "Main")
                });
            });
        };
        let errorCallBack = (code, message, json) => {
            Toast.show(message);
            // PageView.toError(this.pageView,message);
            log(message + json);
            log("############")
        };

        HttpTool.put("/base-usercenter/userapi/v1.1/users/" + `${data.id}` + "/sign", successCallBack, errorCallBack, data);

    }

    render() {
        let view = (<View style={styles.container}>
            <Text style={styles.title}>
                更改密码后需要重新登录
            </Text>
            {this.createTextInput(this.textAry)}
            <TouchableOpacity
                style={[styles.button, {backgroundColor: (this.state.oldPassword.length >= 6 && this.state.newPassword.length >= 6 && this.state.secondPassword.length >= 6) ? YITU.textColor_4 : YITU.backgroundColor_4}]}
                disabled={!(this.state.oldPassword.length >= 6 && this.state.newPassword.length >= 6 && this.state.secondPassword.length >= 6)}
                onPress={() => {
                    YITU.ClickTrackFunction(YITU.TrackChangeLoginPassword.mine_accountssafe_modifypassword_done);
                    this.commit();
                }}
            >
                <Text style={{color: 'white', fontSize: YITU.fontSize_6, alignSelf: 'center'}}>
                    完成
                </Text>
            </TouchableOpacity>
            <Text style={styles.mark}>
                注：密码为6-12位数字和字母的组合
            </Text>
        </View>);
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {})}
            >
                {view}
            </PageView>
        );
    }
}

/**
 * MyInput
 */
class MyInput extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {data, cb} = this.props;
        return (<View style={styles.textView}>
            <Image style={styles.image}
                   source={data.icon}/>
            <View style={styles.line}/>
            <View style={styles.textInput}>
                <InputSpace style={{flex: 1, fontSize: YITU.fontSize_4, padding: 0}}
                            option={{
                                isNeedClear: true,
                            }}
                            value={this.value || ""}
                            placeholderTextColor={YITU.textColor_5}
                            underlineColorAndroid="transparent"
                            maxLength={12}
                            secureTextEntry={true}
                            placeholder={data.title}
                            cb={(text) => {
                                this.value = text;
                                if (cb) {
                                    cb(text);
                                }
                            }}/>
            </View>

        </View>);
    }
}

module.exports = AlterLoginPW;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
        paddingTop: YITU.space_6,
        paddingLeft: YITU.space_6,
        paddingRight: YITU.space_6,
    },
    title: {
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_2,

    },
    textView: {
        marginTop: YITU.space_5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: YITU.c_title_white,
        paddingVertical: YITU.space_2,
        paddingLeft: YITU.space_3,
        borderRadius: 5,
    },
    image: {
        resizeMode: 'contain',
        width: YITU.space_5,
        height: YITU.space_7,
    },
    line: {
        marginLeft: YITU.space_5,
        width: 0.5,
        height: YITU.space_7,
        backgroundColor: YITU.backgroundColor_2,
    },
    textInput: {
        flex: 1,
        marginLeft: YITU.space_5,
        padding: 0,
        alignSelf: 'center',
    },
    button: {
        marginTop: YITU.space_6,
        backgroundColor: YITU.backgroundColor_3,
        height: YITU.BAR_HEIGHT,
        borderRadius: YITU.radius_1,
        justifyContent: 'center',
    },
    mark: {
        marginTop: YITU.space_6,
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_2,
        alignSelf: 'center',
    }
});
