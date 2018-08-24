/**
 * 明细module
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    View,
    Image,
    NativeModules,
    ScrollView
} from 'react-native';
import {ModalBox} from "myapplib";
import BottomItemView from "./BottomItemView.js";

class DetailsModule extends Component {
    static show(data, option) {
        let myOption = option || {};
        let mb = ModalBox.showConfig({
            modal: (<DetailsModule
                price={data.price || ""}
                btnTitle={myOption.btnTitle || null}
                onClose={(isHidden) => {
                    mb.close();
                    if (isHidden && myOption.callBack) myOption.callBack();
                }}
            />),
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
        this.fadeInAndOut = new Animated.Value(0); // 初始值
        this.state = {
            isShowMoneyDetail: false
        };
    }

    componentDidMount() {
        this.setValue(1);
    }

    setValue(value, isHidden) {
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value === 0) {
                this.props.onClose && this.props.onClose(isHidden);
            }
        });
    }

    setAnimation(value) {
        Animated.timing(this.fadeInAndOut, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {

        });
    }


    render() {
        let opacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        let outToinViewHeight = this.fadeInAndOut.interpolate({
            inputRange: [0, 1],
            outputRange: [240, 0],
        });
        let inToOutViewHeight = this.fadeInAndOut.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200],
        });

        let {isShowMoneyDetail} = this.state;
        let {price, btnTitle} = this.props;

        return (<Animated.View style={[styles.bg, {opacity: opacity}]}>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                }}>
                <View
                    pointerEvent={"box-none"}
                    style={{
                        paddingLeft: YITU.space_5,
                        marginBottom: 45,
                        backgroundColor: YITU.backgroundColor_0,
                    }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            paddingVertical: YITU.space_5,
                            paddingRight: YITU.space_5,
                            alignItems: "center",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderColor: YITU.backgroundColor_Line
                        }}
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({
                                isShowMoneyDetail: !isShowMoneyDetail
                            });
                            this.setAnimation(!isShowMoneyDetail ? 1 : 0);
                        }}>
                        <Text style={{fontSize: YITU.fontSize_5, color: YITU.textColor_1}}>套餐费</Text>
                        <Text style={{
                            flex: 1,
                            fontSize: YITU.fontSize_5,
                            color: YITU.textColor_1,
                            textAlign: "right"
                        }}>{"￥" + price}</Text>
                        <Image
                            resizeMode={"contain"}
                            style={{
                                marginLeft: 5,
                                width: 13,
                                height: 13,
                            }}
                            source={isShowMoneyDetail ? require("../../image/show_top.png") :
                                require("../../image/show_bottom.png")}
                        />
                    </TouchableOpacity>

                    {this.createTaoCanDescView(outToinViewHeight)}


                    <Animated.View style={{
                        backgroundColor: YITU.backgroundColor_0,
                        width: "100%",
                        height: inToOutViewHeight
                    }}>
                        <ScrollView
                            style={{width: "100%", height: "100%"}}>
                            {this.createFlightRow()}
                            {this.createViewCell({
                                desc: "套餐费",
                                price: price,
                            }, 1000)}
                        </ScrollView>

                    </Animated.View>

                    <View style={{
                        paddingVertical: YITU.space_0,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: YITU.backgroundColor_Line,
                        paddingRight: YITU.space_5
                    }}>
                        <Text style={{
                            fontSize: YITU.fontSize_3,
                            color: YITU.textColor_1,
                        }}>
                            注：如产生以上超出费用项请在服务结束后，将钱面付司机
                        </Text>
                    </View>
                </View>


                <BottomItemView
                    price={price}
                    isTop={true}
                    btnTitle={btnTitle || "下一步"}
                    cb={() => {
                        this.setValue(0, true);
                    }}
                    callBack={() => {
                        this.setValue(0);
                    }}/>
            </View>
        </Animated.View>);
    }

    //创建套餐描述View
    createTaoCanDescView(outToinViewHeight) {
        return (<Animated.View style={{width: "100%", height: outToinViewHeight}}>
            <ScrollView style={{width: "100%"}}
                        onLayout={(e) => {
                            NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                this.currentHeight0 = height;
                            });
                        }}>

                <View style={{
                    paddingVertical: YITU.space_3,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: YITU.backgroundColor_Line,
                    paddingRight: YITU.space_5
                }}>
                    <Text style={{
                        fontSize: YITU.fontSize_5,
                        color: YITU.textColor_0,
                    }}>套餐包含</Text>
                    <Text style={{
                        marginTop: YITU.space_3,
                        fontSize: YITU.fontSize_3,
                        color: YITU.textColor_1
                    }}>
                        <Text>
                            套餐价格包含：司导服务费、车辆使用费、小费、餐补、燃油费、停车费、过路费、高速费、空驶费。
                            （周边包车还包括进城费；跨城包车还包括进城费、司机住宿补助费）
                        </Text>
                    </Text>
                </View>

                <View style={{
                    paddingVertical: YITU.space_3,
                    paddingRight: YITU.space_5
                }}>
                    <Text style={{
                        fontSize: YITU.fontSize_5,
                        color: YITU.textColor_0,
                    }}>套餐不包含</Text>
                    <Text style={{
                        fontSize: YITU.fontSize_3,
                        color: YITU.textColor_1,
                        marginTop: YITU.space_3,
                    }}>
                        <Text>
                            市内包车：超时费300元/小时、超里程费10元/公里，及其它未提及费用；
                            周边包车：超时费300元/小时、超里程费10元/公里，及其它未提及费用；
                            跨城包车：超时费300元/小时、超里程费10元/公里，及其它未提及费用；
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </Animated.View>);
    }


    createFlightRow() {
        return [{
            desc: "第一天套餐包含10.0小时300公里",
            price: "1221.00",
        }, {
            desc: "第二天套餐包含10.0小时300公里",
            price: "1221.00",
        },
            {
                desc: "夜间服务费",
                price: "100.00",
            }].map((item, index) => {
            return this.createViewCell(item, index);
        })
    }

    createViewCell(item, index) {
        return (<View
            key={index}
            style={{
                flexDirection: "row",
                paddingVertical: YITU.space_5,
                paddingRight: YITU.space_5,
                alignItems: "center",
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: YITU.backgroundColor_Line
            }}>
            <Text style={{
                fontSize: YITU.fontSize_5,
                color: YITU.textColor_1
            }}>{item.desc}</Text>
            <Text style={{
                flex: 1,
                fontSize: YITU.fontSize_5,
                color: index === 1000 ? YITU.textColor_adorn : YITU.textColor_1,
                textAlign: "right"
            }}>{"￥" + item.price}</Text>
        </View>);
    }
}

module.exports = DetailsModule;

const styles = StyleSheet.create({
    bg: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        paddingHorizontal: YITU.space_5,
        paddingVertical: YITU.space_2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: YITU.backgroundColor_Line,
        borderStyle: "solid"
    }
});