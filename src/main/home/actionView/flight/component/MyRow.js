import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Toast} from "myapplib";

class MyRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || {},

        };
    }

    setData(data) {
        this.setState({
            data: data
        });
    }

    render() {
        let {data} = this.state;
        if (data.type === "line") {
            return (<View style={{height: 15}}/>)
        }
        return (<View style={{
            width: "100%",
            paddingLeft: YITU.space_3,
            backgroundColor: YITU.backgroundColor_0,
        }}>
            <View style={{
                width: "100%",
                height: 45,
                flexDirection: "row",
                alignItems: "center",
            }}>
                <Text style={styles.title}>{data.title}</Text>
                {this.createRight(data || {})}
            </View>
            {
                data.noShowLine ? null : <View style={{
                    width: "100%",
                    height: StyleSheet.hairlineWidth,
                    marginLeft: data.marginLeft || 0,
                    backgroundColor: YITU.backgroundColor_Line
                }}/>
            }
        </View>);
    }

    createRight(data) {
        if (!data || data === {}) {
            return null;
        }
        let view = null;
        switch (data.type) {
            case "select":
                view = (<TouchableOpacity
                    style={styles.rightStyle}
                    onPress={() => {
                        data.onPress && data.onPress(data);
                    }}>
                    <Text style={[styles.valueStyle, {color: data.value ? YITU.textColor_1 : YITU.textColor_5}]}>
                        {data.value || data.placeHolder}
                    </Text>
                    <Image resizeMode={"contain"} style={{height: 15}} source={data.icon}/>
                </TouchableOpacity>);
                break;
            case "add":
                view = (<View style={styles.rightStyle}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}>
                        <TouchableOpacity
                            style={{height: 45, width: 25, alignItems: "center", justifyContent: "center"}}
                            onPress={() => {
                                data.onPress && data.onPress(data, false);
                            }}>
                            <Image resizeMode={"contain"}
                                   style={[styles.image, {marginRight: 0}]}
                                   source={require("../../image/icon_jian.png")}/>
                        </TouchableOpacity>

                        <Text style={{minWidth: 60, textAlign: "center"}}>{data.value || 0}</Text>
                        <TouchableOpacity
                            style={{height: 45, width: 25, alignItems: "center", justifyContent: "center"}}
                            onPress={() => {
                                data.onPress && data.onPress(data, true);
                            }}>
                            <Image resizeMode={"contain"}
                                   style={[styles.image, {marginRight: YITU.space_1}]}
                                   source={require("../../image/icon_jia.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>);
                break;
            case "input":
                view = (<View style={{flex: 1, paddingRight: YITU.space_2}}>
                    <TextInput
                        style={[styles.valueStyle, {height: 45}]}
                        placeholder={data.placeHolder}
                        defaultValue={data.value}
                        onChangeText={(value) => {
                            data.onPress && data.onPress(data, value);
                        }}
                        {...data.props||{}}
                    />
                </View>);
                break;
            case "phone":
                view = (<View style={{flex: 1, flexDirection: "row", paddingRight: YITU.space_2, alignItems: "center"}}>
                    <TouchableOpacity
                        style={{flexDirection: "row", alignItems: "center"}}
                        onPress={() => {
                            data.onPress && data.onPress(data, {
                                isArea: true,
                            });
                        }}>
                        <Text style={[styles.valueStyle, {
                            minWidth: 28,
                            color: data.value ? YITU.textColor_1 : YITU.textColor_5
                        }]}>{data.areaNum || "区号"}</Text>
                        <Image resizeMode={"contain"}
                               style={{height: 12, marginLeft: YITU.space_0, marginRight: YITU.space_2}}
                               source={require('../../../../../image/userIcon/arrow_black.png')}/>
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.valueStyle, {flex: 1, height: 45}]}
                        placeholder={data.placeHolder}
                        defaultValue={data.mobile}
                        onChangeText={(text) => {
                            data.onPress && data.onPress(data, {
                                isArea: false,
                                value: text
                            });
                        }}
                        {...data.props||{}}
                    />
                </View>);
                break;
            default:
                break;
        }
        return view;
    }
}

module.exports = MyRow;

MyRow.showMessage = (obj, page) => {
    if (obj.isCheck && (!obj.value || obj.value === "")) {
        Toast.show((obj.msg || obj.title) + "不能为空");
        return false;
    }
    return true;
};
MyRow.getValue = (obj, page) => {
    return obj.value || "";
};

const styles = StyleSheet.create({
    title: {
        width: 70,
        fontSize: YITU.fontSize_4,
        color: YITU.textColor_0
    },
    rightStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: YITU.space_2
    },
    valueStyle: {
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_4
    },
    image: {
        width: YITU.d_icon,
        height: YITU.d_icon,
        marginRight: YITU.space_1
    },

});