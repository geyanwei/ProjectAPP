import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    Linking,
    Platform
} from 'react-native';
import {PageView, LayoutBox, navigation, Toast} from 'myapplib';
import Storage from "../../tool/Storage";
import MyNativeModule from "../../myNativeModules";

import Communications from 'react-native-communications';

class AboutYiTuBa extends Component {
    constructor(props) {
        super(props);
        let profileObj = Storage.getAppConfig || {};
        this.objH5 = profileObj.h5 || {};
        this.state = {
            upData: 1,
        };
    }

    componentDidMount() {

    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    navBack() {
        navigation.pop(this,);
    }

    getRowData() {
        return [
            {
                title: "易途8介绍",
                onPress: () => {
                    this.openPage('BrowserPage', {
                        title: '关于我们',
                        url: this.objH5 && this.objH5.aboutUs || "",
                    });
                }
            }, {
                title: "意见与建议",
                onPress: () => {
                    this.openPage('Suggestion', {
                        title: '意见与建议',
                    });
                }
            }, {
                title: "给小易个好评",
                onPress: () => {
                    Linking.openURL("")
                }
            }
        ];
    }

    //跳转界面
    openPage(path, option) {
        navigation.push(this, path, option);
    }

    render() {
        let view = (<ScrollView
            style={styles.container}
            keyboardShouldPersistTaps={"handled"}>
            <Image style={styles.headImg} source={require("../../image/user/aboutUs/icon_logo.png")}/>
            <Text style={styles.title}>{"易途吧 V" + MyNativeModule.versionName}</Text>

            <LayoutBox.Icon
                rightTextStyle={{color: YITU.textColor_2, fontSize: YITU.fontSize_5}}
                data={this.getRowData()}/>

            <View style={styles.row}>
                <View style={styles.line}/>
                <Text style={styles.text}>联系我们</Text>
                <View style={styles.line}/>
            </View>

            <View style={{
                alignItems: "center",
                flexDirection: "row",
            }}>
                {this.createItem()}
            </View>

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

    createItem() {
        return [
            {
                title: "yitu8jwzwzc",
                icon: require("../../image/user/aboutUs/icon_weChat.png")
            },
            {
                title: "service@yitu8.cn",
                icon: require("../../image/user/aboutUs/icon_email.png")
            },
            {
                title: "400-0630-655",
                icon: require("../../image/user/aboutUs/icon_kefu.png")
            }].map((item, index) => {
            return (<TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={{flex: 1, alignItems: "center"}}
                onPress={() => {
                    this.action(index, item.title);
                }}>
                <Image
                    resizeMode={"contain"}
                    style={{width: 60, height: 60}} source={item.icon}/>
                <Text style={{
                    marginTop: YITU.space_2, color: YITU.textColor_4, fontSize: YITU.fontSize_3
                }}>{item.title}</Text>
            </TouchableOpacity>)
        });
    }

    action(index, title) {
        switch (index) {
            case 0:
                Linking.canOpenURL('weixin://').then(supported => { // weixin://  alipay://
                    if (supported) {
                        Linking.openURL('weixin://');
                    } else {
                        Toast.show("请先安装微信");
                    }
                }).catch(err => Toast.show("请先安装微信"));
                break;
            case 1:
                Communications.email([title], null, null, '反馈', '易途吧服务真好！！！');
                // Linking.canOpenURL('mailto:').then(supported => {
                //     if (!supported) {
                //         Toast.show("您的设备不支持直接发送邮件");
                //     } else {
                //         return Linking.openURL("mailto:" + title);
                //     }
                // }).catch(err => Toast.show("您的设备不支持直接发送邮件"));
                break;
            case 2:
                Communications.phonecall(title, true);
                // Linking.canOpenURL("tel:").then(supported => {
                //         if (supported) {
                //             return Linking.openURL("tel:"+title);
                //         }else {
                //             Toast.show("您的设备不支持直接打电话");
                //         }
                //     }
                // ).catch(err => {
                //     Toast.show("您的设备不支持直接打电话");
                // });
                break;
            default:
                break;
        }
    }
}

module.exports = AboutYiTuBa;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    headImg: {
        marginVertical: YITU.space_6,
        alignSelf: "center",
        width: 90,
        height: 90
    },
    title: {
        alignSelf: "center",
        marginBottom: YITU.space_6,
        fontSize: YITU.fontSize_8,
        color: YITU.textColor_2
    },
    row: {
        marginHorizontal: YITU.space_6,
        marginVertical: YITU.space_8,
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
