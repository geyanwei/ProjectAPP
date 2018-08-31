import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    Animated,
    Easing
} from 'react-native';
import Storage from "../../../tool/Storage.js";
import {ModalBox} from "myapplib";

class GuiderModuleView extends Component {
    static show() {
        // (myNativeModules && myNativeModules.versionName==="3.0.0" && (!obj||(obj&&obj.isShow))) 是否指定版本号控制显隐条件之一
        Storage.getInfo("controlGuideIsShow", (error, obj) => {
            if (!error) {
                if (!obj || (obj && obj.isShow)) {
                    setTimeout(() => {
                        let mb = ModalBox.showConfig({
                            modal: <GuiderModuleView
                                onClose={() => {
                                    mb.close()
                                }}
                            />,
                            modalConfig: {
                                animationDuration: 0,
                                backdropOpacity: 0,
                                clickToClose: false,
                                swipeToClose: false,
                            }
                        });
                    }, 200);
                }
            }
        });
    }

    constructor(props) {
        super(props);
        this.fadeInOpacity = new Animated.Value(0); // 初始值
    }

    componentDidMount() {
        this.setValue(1);
    }

    setValue(value) {
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value === 0) {
                this.props.onClose && this.props.onClose();
            }
        });
    }

    render() {
        let opacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        //要不要加动画右上角收起
        // let opacity1 = this.fadeInOpacity.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, YITU.screenWidth],
        // });
        // let opacity2 = this.fadeInOpacity.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, YITU.screenHeight],
        // });

        return (<Animated.View style={[styles.bg, {opacity: opacity}]}>
            <Image resizeMode={"contain"}
                   style={{
                       alignSelf: "flex-end",
                       marginTop: YITU.barStateHeight + 5 * YITU.screenScaleWidth,
                       width: 260 * YITU.screenScaleWidth,
                       height: 260 * YITU.screenScaleWidth * (249 / 483),
                   }}
                   source={require('../../../image/order/guider_qu_line.png')}/>

            <Text style={{
                width: 312 * YITU.screenScaleWidth,
                paddingVertical: YITU.space_1,
                color: YITU.c_title_white,
                fontSize: YITU.fontSize_5,
                lineHeight: 34,
            }}>复制订单和取消订单移到这里了哦，新增了分享到微信好友、短信分享和联系客服
            </Text>

            <TouchableHighlight
                underlayColor={"rgba(0,0,0,0.7)"}
                style={styles.btn}
                onPress={() => {
                    Storage.saveInfo("controlGuideIsShow", {
                        isShow: false,
                    });
                    this.setValue(0);
                }}>
                <Text style={{
                    color: YITU.c_title_white,
                    fontSize: YITU.fontSize_5,
                    fontFamily: YITU.fontName_medium
                }}>我知道了</Text>
            </TouchableHighlight>
        </Animated.View>);
    }
}

module.exports = GuiderModuleView;

class ModuleGuide extends Component {
    constructor(props) {
        super(props);
        this.fadeInOpacity = new Animated.Value(0); // 初始值
    }

    componentDidMount() {
        this.setValue(1);
    }

    setValue(value) {
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value === 0) {
                this.props.onClose && this.props.onClose();
            }
        });
    }

    render() {
        let opacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        //要不要加动画右上角收起
        // let opacity1 = this.fadeInOpacity.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, YITU.screenWidth],
        // });
        // let opacity2 = this.fadeInOpacity.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, YITU.screenHeight],
        // });

        return (<Animated.View style={[styles.bg, {
            opacity: opacity,
        }]}>
            <Image
                resizeMode={"contain"}
                style={{
                    alignSelf: "flex-end",
                    marginTop: YITU.barStateHeight + 5 * YITU.screenScaleWidth,
                    width: 260 * YITU.screenScaleWidth,
                    height: 260 * YITU.screenScaleWidth * (249 / 483),
                }}
                source={require('../../../image/order/guider_qu_line.png')}/>

            <Text style={{
                width: 312 * YITU.screenScaleWidth,
                paddingVertical: YITU.space_1,
                color: YITU.c_title_white,
                fontSize: YITU.fontSize_5,
                lineHeight: 34,
            }}>复制订单和取消订单移到这里了哦，新增了分享到微信好友、短信分享和联系客服
            </Text>

            <TouchableHighlight
                underlayColor={"rgba(0,0,0,0.7)"}
                style={styles.btn}
                onPress={() => {
                    Storage.saveInfo("controlGuideIsShow", {
                        isShow: false,
                    });
                    this.setValue(0);
                }}>
                <Text style={{
                    color: YITU.c_title_white,
                    fontSize: YITU.fontSize_5,
                    fontFamily: YITU.fontName_medium
                }}>我知道了</Text>
            </TouchableHighlight>
        </Animated.View>);
    }
}

const styles = StyleSheet.create({
    bg: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        alignItems: "center",
    },
    btn: {
        marginTop: YITU.space_6,
        borderRadius: 42 * YITU.screenScaleWidth * 0.5,
        height: 42 * YITU.screenScaleWidth,
        width: 122 * YITU.screenScaleWidth,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: YITU.backgroundColor_0,
        borderStyle: "solid",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    }
});