import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';
import {navigation} from "myapplib";

class AreaCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || "",
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

    render() {
        let {title, obj, callBack, isSelCitys} = this.props;
        let {value} = this.state;

        let val = isSelCitys ? value : ("+" + value);

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: YITU.space_5,
                }}
                onPress={() => {
                    Keyboard.dismiss();
                    if (isSelCitys) {
                        navigation.push(obj, "LoginCity", {
                            title: '服务城市',
                            single: false,
                            cityList: this.citys || [],//传到下一界面 做数据恢复用
                            callBack: (arr) => {
                                this.citys = arr;
                                if (arr && arr.length > 0) {
                                    let valName = "";
                                    arr.map((item, index) => {
                                        valName = valName + item.name + ",";
                                    });
                                    valName = valName.substring(0, valName.length - 1); //城市名字 拼接结果

                                    this.setState({
                                        value: valName,
                                    }, () => {
                                        if (callBack) {
                                            callBack(arr);
                                        }
                                    });
                                }
                            },
                        });
                    } else {
                        navigation.push(obj, "AreaCodeChoose", {
                            title: "选择国家区号",
                            callback: (areaCode) => {
                                this.setState({
                                    value: areaCode,
                                }, () => {
                                    if (callBack) {
                                        callBack(areaCode);
                                    }
                                });
                            }
                        });
                    }
                }}>
                <Text style={{
                    fontSize: YITU.fontSize_5,
                    color: YITU.textColor_1,
                    width: 90,
                }}>{title}</Text>
                <View style={{
                    flex: 1,
                    height: YITU.d_RowHeight,
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={{
                              flex: 1,
                              fontSize: YITU.fontSize_5,
                              color: value ? YITU.textColor_1 : YITU.textColor_5,
                          }}>{value ? val : ("请选择" + title)}</Text>
                    <Image style={{
                        alignSelf: "center",
                        resizeMode: 'contain',
                        height: YITU.d_icon_small,
                        marginRight: YITU.space_0,
                    }} source={require("../../../image/userIcon/arrow.png")}/>
                </View>
            </TouchableOpacity>);
    }
}

module.exports = AreaCell;
