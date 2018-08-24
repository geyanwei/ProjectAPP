import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    View,
} from 'react-native';
import {ModalBox,navigation} from "myapplib";

class InforModuleView extends Component {
    static show(obj) {
        let mb = ModalBox.showConfig({
            modal: <InforModuleView
                obj={obj}
                onClose={() => {
                    mb.close();
                }}
            />,
            modalConfig: {
                animationDuration: 0,
                backdropOpacity: 0,
                clickToClose: false,
                swipeToClose: false,
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

    setValue(value,i) {
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value === 0) {
                this.props.onClose && this.props.onClose(i);
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
            <TouchableOpacity
                style={{width: "100%", height: "100%"}}
                activeOpacity={1}
                onPress={() => {
                    this.setValue(0);
                }}>
                <View style={{
                    alignSelf: "flex-end",
                    marginTop: YITU.navBarHeight,
                    alignItems: "flex-end",
                    paddingRight: YITU.space_6
                }}>
                    <Image style={{
                        backgroundColor: YITU.backgroundColor_3,
                        marginRight: YITU.space_5,
                        width: 15,
                        height: 15,
                    }}/>
                    <View style={{
                        backgroundColor: YITU.backgroundColor_0,
                        paddingHorizontal: YITU.space_5,
                        paddingVertical: YITU.space_0,
                        borderRadius: YITU.radius_1
                    }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: YITU.space_1,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderColor: YITU.backgroundColor_Line,
                            }}
                            onPress={() => {
                                this.setValue(0);
                                if (this.props&&this.props.obj) {
                                    navigation.push(this.props.obj,"BrowserPage",{
                                        title:"预订须知",
                                        url:"Http://www.baidu.com"
                                    });
                                }
                            }}>
                            <Image style={{
                                backgroundColor: YITU.backgroundColor_3,
                                width: 20,
                                height: 20,
                                marginRight: YITU.space_0
                            }}/>
                            <Text style={{fontSize:YITU.fontSize_4,color:YITU.textColor_1}}>
                                预订须知
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            paddingVertical: YITU.space_1,
                            flexDirection: "row",
                            alignItems: "center"
                        }} onPress={() => {
                            this.setValue(0);
                            if (this.props&&this.props.obj) {
                                navigation.push(this.props.obj, "BrowserPage", {
                                    title: "常见问题",
                                    url: "Http://www.baidu.com"
                                });
                            }
                        }}>
                            <Image style={{
                                backgroundColor: YITU.backgroundColor_3,
                                width: 20,
                                height: 20,
                                marginRight: YITU.space_0
                            }}/>
                            <Text style={{fontSize:YITU.fontSize_4,color:YITU.textColor_1}}>
                                常见问题
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>);
    }
}

module.exports = InforModuleView;

const styles = StyleSheet.create({
    bg: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        alignItems: "center",
        justifyContent: "center"
    },
});