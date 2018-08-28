/**
 * Created by lixifeng on 17/7/7.
 */
import React, {
    Component,
} from 'react';
import ReactNative, {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Animated,

} from 'react-native';
import {Select} from "myapplib";
class RowItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upData: 0,
            anim: false,
        };
        this.springValue = new Animated.Value(0);
    }

    anim() {
        this.springValue.setValue(0);
        Animated.spring(
            this.springValue,
            {
                toValue: 0, // to target value
                tension: 1000, // number smaller to bounce slowly
                friction: 5, // number smaller to bounce obeviously
                velocity: 800, // move speed
            }
        ).start();

    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        })
    }

    getSwitchView(value, select, callBack) {
        return <TouchableOpacity
            onPress={() => {
                callBack();
            }}
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Image
                style={{
                    marginLeft: YITU.space_8,
                    width: YITU.d_icon,
                    height: YITU.d_icon,
                    resizeMode: "center"
                }}
                source={select ?
                    require("../image/user/sdrz/sdrz-1.png") :
                    require("../image/user/sdrz/sdrz-2.png")

                }/>
            <Text
                style={{
                    fontSize: YITU.fontSize_4,
                    color: YITU.textColor_1,
                }}>{value}</Text>

        </TouchableOpacity>
    }

    getRightView(obj, data) {
        if (data.type === "input") {
            return (
                <View style={{
                    paddingRight: YITU.space_5,
                    padding: 0,
                    flex: 2,
                    flexDirection: "row"
                }}>
                    <TextInput
                        ref={"input"}
                        onFocus={(e) => {
                            if (obj.scrollView) {
                                obj.scrollView.scrollToFocusedInput(
                                    ReactNative.findNodeHandle(e.target)
                                )
                            }

                        }}
                        style={{
                            fontSize: YITU.fontSize_4,
                            color: YITU.textColor_1,
                            textAlign: "right",
                            height: YITU.space_5 * 2 + YITU.fontSize_4,
                            flex: 2,
                        }}
                        underlineColorAndroid="transparent"
                        key={data.title + "_"}
                        placeholderTextColor={YITU.textColor_2}
                        {...data.prop}
                        defaultValue={data.value ? data.value : ""}
                        onChangeText={(text) => {
                            data.value = text;

                            if (data.callBack) {
                                data.callBack();
                            }

                        }}

                    />
                </View>
            );
        } else if (data.type === "select" || data.type === "time" || data.type === "selectOther") {
            return <TouchableOpacity
                onPress={() => {
                    if (data.type === "selectOther") {
                        if (data.select) {
                            data.select(data);
                        }
                    } else {
                        Select.show({
                            pickerData: data.data,
                            selectedValue: data.selectedValue,
                            onSelect: (v) => {
                                data.selectedValue = v;
                                data.value = v.toString().replace(/,/g, "");
                                this.upView();
                                if (data.callBack) {
                                    data.callBack(data);
                                }
                            }
                        });
                    }
                }}
                style={{
                    flex: 2,
                    height: YITU.space_5 * 2 + YITU.fontSize_4,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                <Text
                    style={{
                        textAlign: data.textAlign || "right",
                        flex: 1,
                        fontSize: YITU.fontSize_4,
                        color: data.value ? YITU.textColor_1 : YITU.textColor_2,

                    }}>{data.value ? data.value : data.prop.placeholder}</Text>
                <Image
                    resizeMode={"contain"}
                    style={{
                        alignSelf: "center",
                        height: YITU.d_click_icon,
                        marginRight: YITU.space_0,
                    }}
                    source={require("../image/userIcon/arrow.png")}/>
            </TouchableOpacity>;

        } else if (data.type === "switch") {
            return <View
                style={{
                    flex: 2,
                    height: YITU.space_5 * 2 + YITU.fontSize_4,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: YITU.space_5,
                }}>

                {this.getSwitchView(data.data[0], data.data[0] === data.value
                    , () => {
                        data.value = data.data[0];
                        if (data.select) {
                            data.select(data);
                        }
                        this.upView();
                    }
                )}
                {this.getSwitchView(data.data[1], data.data[1] === data.value
                    , () => {
                        data.value = data.data[1];
                        if (data.select) {
                            data.select(data);
                        }
                        this.upView();
                    }
                )}

            </View>;

        } else if (data.type === "text") {

            return <Text
                style={{
                    paddingRight: YITU.space_5,
                    padding: 0,
                    fontSize: YITU.fontSize_4,
                    color: YITU.textColor_1,
                    lineHeight: YITU.space_5 * 2 + YITU.fontSize_4,
                    flex: 2,
                    textAlign: "right"
                }}>{data.value}</Text>

        } else {
            return <View
                style={{
                    flex: 2,
                    height: YITU.space_5 * 2 + YITU.fontSize_4,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                <Text
                    style={{
                        textAlign: "right",
                        flex: 1,
                        fontSize: YITU.fontSize_4,
                        color: data.value ? YITU.textColor_1 : YITU.textColor_2,

                    }}>{data.value ? data.value : data.prop.placeholder}</Text>
                <Image
                    resizeMode={"contain"}
                    style={{
                        alignSelf: "center",
                        height: YITU.d_click_icon,
                        marginRight: YITU.space_0,
                    }}
                    source={require("../image/userIcon/arrow.png")}/>
            </View>;
        }


    }

    render() {
        let {obj, data} = this.props;
        if (data.type === "line") {
            return <View style={data.isSpace ? {
                height: YITU.space_5, width: "100%",
                backgroundColor: YITU.backgroundColor_1
            } : {
                height: 0.5, width: "100%",
                backgroundColor: YITU.backgroundColor_Line, marginLeft: YITU.space_5
            }}/>
        }
        if (data.type === "remark") {
            return <Text
                style={{
                    backgroundColor: YITU.backgroundColor_1,
                    fontSize: YITU.fontSize_3,
                    color: YITU.textColor_3,
                    paddingTop: YITU.space_5,
                    paddingLeft: YITU.space_5
                }}>{data.remark || ""}</Text>
        }
        return (
            <Animated.View style={{
                transform: [{translateX: this.springValue}],
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
            }}>
                <Text
                    style={{
                        fontSize: YITU.fontSize_4,
                        color: data.titleColor || YITU.textColor_1,
                        marginRight: YITU.space_5,
                        minWidth: 60,
                        paddingLeft: YITU.space_5,
                    }}
                >{data.subTitle || data.title}</Text>

                {this.getRightView(obj, data)}
            </Animated.View>
        );
    }
}

RowItem.showMessage = (obj, page) => {

    let msg = "";
    if (obj.value) {

        if (obj.reg) {
            //存在验证
            let state = obj.reg.test(obj.value);
            if (state) {
                //数据成立,返回
                return true;
            } else {
                msg = "有效的";
            }
        } else {
            //数据成立,返回
            return true;
        }

    } else {
        //存在值,校验,不存在直接跑过
        if (obj.noCheck) {
            return true;
        }

    }

    let v = "";
    if (obj.type === "input") {
        v = "请输入"
    } else if (obj.type === "select" || obj.type === "time" || obj.type === "switch" || obj.type === "selectOther") {
        v = "请选择"
    }
    page.showToast(v + (msg ? msg : "") + (obj.hint ? obj.hint : "") + obj.title);
    if (obj.ref) {
        obj.ref.anim();
    }
    return false;
    //验证正规是否成立

};
RowItem.fTime = (obj, page) => {
    if (obj.type === "time") {
        if (obj.value.indexOf("-") > 0) {
            return obj.value;
        }
        let v = obj.value.replace(/年|月|日/g, "-");

        v = v.substring(0, v.length - 1);
        let arr = v.split("-");
        let str = [];
        for (let o of arr) {
            if (o.toString().length === 1) {
                str.push("0" + o);
            } else {
                str.push(o)
            }
        }
        return str.toString().replace(/,/g, "-")
    } else {
        return obj.value;
    }

};
module.exports = RowItem;
