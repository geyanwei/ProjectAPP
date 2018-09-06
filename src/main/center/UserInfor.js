import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
} from 'react-native';
import {PageView, LayoutBox, UpImage, navigation, Toast, Loading, Select} from 'myapplib';
import HttpTool from "../../http/HttpTool";
import APIGYW from "../../http/APIGYW.js";
import Storage from "../../tool/Storage.js";


class UserInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
        };

        let userInfor = Storage.getUserInfo();
        this.userId = userInfor && userInfor.id || "";
    }

    componentDidMount() {
        this.upView();
    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    navBack() {
        if (this.props.callBack) {
            this.props.callBack();
        }
        navigation.pop(this,);
    }

    //获取服务城市和服务语言
    getStr(arr) {
        if (!arr || arr.length < 1) {
            return "";
        }
        let val = "";
        arr.map((item, index) => {
            val = val + item.name + "，"
        });
        val = val.substring(0, val.length - 1);
        return val;
    }

    //选择头像
    selHeadImg() {
        UpImage.show({
            width: 300,
            height: 300,
            cropping: true,
            cropperCancelText: "取消",
            cropperChooseText: "选择",
            loadingLabelText: "加载中，请稍候",
        }, (state, message, data) => {
            switch (state) {
                case "start":
                case "uploading":
                    //上传中显示
                    break;
                case "done":
                    Loading.show();
                    break;
                case "uploaddone":
                    Loading.show();
                    let url = data && data.imageUrl ? data.imageUrl : "";
                    this.alterHeadImage(url);
                    break;
                case "errorMessage":
                    Toast.show(message);
                    Loading.hide();
                    break;
                case "cancel":
                case "error":
                    //不处理用户取消类别错误
                    break;
                case "uploaderror":
                    //上传失败显示
                    Toast.show("选择图片失败！");
                    Loading.hide();
                    break;
                default:
                    //上传失败
                    Toast.show(message);
                    Loading.hide();
                    break;
            }
        });
    }

    getRowData(userObj) {
        return [
            {
                title: "头像",
                leftStyle: {alignItems: "flex-start", justifyContent: "center"},
                renderRight: () => {
                    return (<View>
                        <Image style={styles.conImg}
                               defaultSource={require('../../image/userIcon/grzx-user.png')}
                               source={userObj.headImg ? {uri: userObj.headImg} :
                                   require('../../image/userIcon/grzx-user.png')}/>
                    </View>)
                },
                onPress: () => {
                    this.selHeadImg();
                }
            }, {
                title: "手机号",
                resultValue: userObj.mobile || "",
                type: "label",
            }, {
                title: "昵称",
                resultValue: userObj.name || userObj.userName || "请设置昵称",
                onPress: () => {
                    this.openPage('EditInfor', {
                        title: '修改昵称',
                        data: {
                            field: "name",
                            value: userObj.name || userObj.userName,
                            placeHolder: "昵称"
                        },
                        callBack: () => {
                            this.upView();
                        }
                    });
                }
            }, {
                title: "性别",
                resultValue: userObj.gender === 2 ? "女" : "男",
                space: true,
                onPress: () => {
                    let arr = ["男", "女"];
                    Select.show({
                        pickerData: arr,
                        selectedValue: [arr[userObj.gender?userObj.gender-1:0]],
                        onSelect: (value, index) => {
                            let gender = 0;
                            for(let i in arr){
                                if (arr[i] === value[0]) {
                                    gender = parseInt(i)+1;
                                    break;
                                }
                            }
                            Storage.getUserInfo((userInfo)=>{
                                Storage.saveUserInfo(Object.assign(userInfo,{gender,gender}), ()=>this.upView());
                            });
                        }
                    });
                }
            }, {
                title: "常用邮箱",
                resultValue: userObj.email || "未填写",
                onPress: () => {
                    this.openPage('EditInfor', {
                        title: '修改邮箱地址',
                        data: {
                            field: "email",
                            value: userObj.email,
                            placeHolder: "邮箱地址",
                            type: 2
                        },
                        callBack: () => {
                            this.upView();
                        }
                    });
                }
            }, {
                title: "登录密码",
                resultValue: "修改",
                onPress: () => {
                    this.openPage('AlterLoginPW', {
                        title: '修改登录密码',
                        pageKey: this.pageKey,
                    });
                }
            }, {
                title: "支付密码",
                resultValue: "未设置",
                onPress: () => {
                    this.openPage('VerIdentity', {
                        title: '身份验证',
                        pageKey: this.pageKey,
                        callBack: () => {
                            this.upView();
                            if (this.props.callBack) {
                                this.props.callBack();
                            }
                        }
                    });
                }
            },
        ];
    }

    //跳转界面
    openPage(path, option) {
        navigation.push(this, path, option);
    }

    render() {
        let userObj = Storage.getUserInfo() || {};
        let view = (<ScrollView
            style={styles.container}
            keyboardShouldPersistTaps={"handled"}>
            <LayoutBox.Icon
                rightTextStyle={{color: YITU.textColor_2, fontSize: YITU.fontSize_5}}
                data={this.getRowData(userObj)}/>
        </ScrollView>);
        return (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                navBack: this.navBack.bind(this),
                pageLoading: false,
            })}>
            {view}
        </PageView>);
    }

    //修改头像
    alterHeadImage(val) {
        if (!val || val == "") {
            Toast.show("选择图片失败！");
            return;
        }
        let param = {
            headImg: val,
            id: this.userId || ""
        };
        let successCallback = (code, message, json, option) => {
            Storage.getUserInfo((obj) => {
                Loading.hide();
                Toast.show("头像上传成功");
                obj["headImg"] = val;
                Storage.saveUserInfo(obj, (error) => {
                    if (error) {
                        Toast.show("保存失败");
                    } else {
                        this.upView();
                    }
                });
            });
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.put(APIGYW.base_usercenter_userapi_v1_1_users + `${param.id}` + "/headimg", successCallback, failCallback, param);
    }
}

module.exports = UserInfor;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    conImg: {
        marginVertical: YITU.space_2,
        marginLeft: YITU.space_0,
        height: YITU.d_head,
        width: YITU.d_head,
        borderRadius: YITU.d_head / 2
    },
    cell: {
        flexDirection: "row",
        paddingRight: YITU.space_5,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: "solid",
        borderColor: YITU.backgroundColor_Line
    },
    title: {
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_5,

    },
    loadingStyle: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.3)"
    }
});
