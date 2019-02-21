import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import HttpTool from "../../http/HttpTool";
import APIGYW from "../../http/APIGYW.js";
import {PageView, LayoutBox, Toast, ModalBox, Loading, navigation} from "myapplib";
import Communications from "react-native-communications";
import MyShearHelp from "../share/MyShearHelp.js";

class InviteFriend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
        };
    }


    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    componentDidMount() {

    }

    render() {
        let view = (<View style={styles.container}>
                <ScrollView
                    scrollEnabled={false}
                    keyboardShouldPersistTaps={"handled"}>
                    <Image resizeMode={"cover"}
                           style={{width:"100%",
                               height:0.54*YITU.screenWidth}}
                           source={require("../../image/user/invitation/head_img.png")}/>
                    <Text style={{
                        marginTop:YITU.space_5,
                        paddingHorizontal:YITU.space_5,
                        color:YITU.textColor_0,
                        fontSize:YITU.fontSize_3}}>
                        <Text>{"邀请好友通过扫码下载APP，并在注册用户时填写您的邀请码"}</Text>
                    </Text>

                    <Image resizeMode={"cover"}
                           style={{
                               marginTop:YITU.space_8,
                               alignSelf:"center",
                               width:0.45*YITU.screenWidth,
                               height:0.45*YITU.screenWidth}}
                           source={require("../../image/user/invitation/icon_erweima.png")}/>

                    <View style={{
                        flexDirection:"row",
                        marginTop:YITU.space_7,
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <Text style={{
                            color:YITU.textColor_0,
                            fontSize:YITU.fontSize_3}}>{"邀请码:"}</Text>
                        <Text style={{
                            marginLeft:YITU.space_0,
                            color:YITU.textColor_adorn,
                            fontSize:YITU.fontSize_3}}>{"1515007"}</Text>
                    </View>

                </ScrollView>
            <View style={{
                marginHorizontal:YITU.space_5,
                borderTopWidth:StyleSheet.hairlineWidth,
                borderTopColor:YITU.backgroundColor_Line,
                alignSelf:"flex-end",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                paddingTop:YITU.space_2,
                paddingBottom:YITU.space_8

            }}>
                {this.createItems()}
            </View>

                <View style={styles.navCell}>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity
                            style={styles.navBackIconBg}
                            onPress={() => {
                                navigation.pop(this);
                            }}>
                            <Image
                                resizeMode={"contain"}
                                style={styles.navBackIcon}
                                source={YITU.default_backImg_blue}/>
                        </TouchableOpacity>

                        <View style={styles.navTitleBg}>
                            <Text style={styles.navTitle}>{"邀请好友"}</Text>
                        </View>
                        <View style={styles.navBackIconBg}/>
                    </View>
                </View>
            </View>);

        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    pageLoading: false,
                    full: true,
                    navBack: () => {
                        navigation.pop(this);
                    }
                })}>
                {view}
            </PageView>
        );
    }

    createItems(){
        return [
            {
                title: "微信好友",
                i:2,
                icon: require("../../image/user/invitation/icon_weChat.png")
            },
            {
                title: "朋友圈",
                i:3,
                icon: require("../../image/user/invitation/icon_friendCircle.png")
            },
            {
                title: "新浪微博",
                i:4,
                icon: require("../../image/user/invitation/icon_weibo.png")
            },
            {
                title: "QQ空间",
                i:1,
                icon: require("../../image/user/invitation/icon_qq_space.png")
            },
            {
                title: "QQ好友",
                i:0,
                icon: require("../../image/user/invitation/icon_qq.png")
            }].map((item, index) => {
            return (<TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={{flex: 1, alignItems: "center"}}
                onPress={() => {
                    this.action(item.i);
                }}>
                <Image
                    resizeMode={"contain"}
                    style={{width: 45, height: 45}} source={item.icon}/>
                <Text style={{
                    marginTop: YITU.space_0, color: YITU.textColor_1, fontSize: YITU.fontSize_3
                }}>{item.title}</Text>
            </TouchableOpacity>)
        });
    }
    action(index) {
        MyShearHelp.myShearImageAndTextHelp(index);
    }
}

module.exports = InviteFriend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_0,
    },
    navCell: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: YITU.BAR_HEIGHT + YITU.barStateHeight,
        backgroundColor: "transparent",
        paddingTop: YITU.barStateHeight,
        flexDirection: "row",
        alignItems: "center"
    },
    navBackIconBg: {
        width: 70,
        flexDirection: "row",
        alignItems: "center",
    },
    navBackIcon: {
        alignSelf: 'center',
        marginRight: YITU.space_0,
        marginLeft: YITU.space_2,
        width: 10 / 18 * YITU.d_icon_small,
        height: YITU.d_icon_small
    },
    navTitleBg: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center"
    },
    navTitle: {
        fontSize: YITU.fontSize_7,
        color: "#fff",
        fontFamily: YITU.fontName_regular,
        fontWeight: "bold",
        textAlign: "center",
    }
});
