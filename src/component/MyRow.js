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
    static defaultProps = {
        rowBgStyle: {
            width: "100%",
            paddingLeft: YITU.space_3,
            backgroundColor: YITU.backgroundColor_0,
        },
        rowStyle: {
            width: "100%",
            flexDirection: "row",
        },
        titleViewStyle: {
            minWidth: 70,
            height: 45,
            flexDirection: "row"
        },
        titleStyle: {
            alignSelf: "center",
            paddingRight: 5,
            fontSize: YITU.fontSize_4,
            color: YITU.textColor_0
        },
        rightStyle: {
            flex: 1,
            flexDirection: "row",
            paddingRight: YITU.space_2
        },
        valueStyle: {
            flex: 1,
            color: YITU.textColor_1,
            fontSize: YITU.fontSize_4,
        },
    };

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
        return (<View style={[this.props.rowBgStyle, {...data.rowBgStyle}]}>
            <View style={[this.props.rowStyle, {...data.rowStyle}]}>
                <View style={[this.props.titleViewStyle, {...data.titleViewStyle}]}>
                    <Text style={[this.props.titleStyle, {...data.titleStyle}]}><Text>{data.title}</Text></Text>
                </View>
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
                    style={{flex: 1, flexDirection: "row", alignItems: "center"}}
                    onPress={() => {
                        data.onPress && data.onPress(data);
                    }}>
                    <View style={[this.props.rightStyle, {...data.rightStyle}]}>
                        <Text style={[
                            this.props.valueStyle,
                            {
                                color: data.value ? YITU.textColor_1 : YITU.textColor_5,
                                ...data.valueStyle || {}
                            }]}>
                            {data.value || data.placeHolder}
                        </Text>

                        {data.isShowClickIcon ?
                            <Image resizeMode={"contain"}
                                   style={{height: 15}}
                                   source={data.icon || require('../image/userIcon/arrow.png')}/> : null}
                    </View>

                </TouchableOpacity>);
                break;
            case "input":
                view = (<View style={{flex: 1, paddingRight: YITU.space_2}}>
                    <TextInput
                        style={[this.props.valueStyle, {height: 45}]}
                        placeholder={data.placeHolder}
                        defaultValue={data.value}
                        onChangeText={(value) => {
                            data.onPress && data.onPress(data, value);
                        }}
                        {...data.valueStyle || {}}
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
                        <Text style={{
                            fontSize: YITU.fontSize_4,
                            minWidth: 32,
                            color: data.value ? YITU.textColor_1 : YITU.textColor_5
                        }}>{data.areaNum || "区号"}</Text>
                        <Image resizeMode={"contain"}
                               style={{height: 12, marginLeft: YITU.space_0, marginRight: YITU.space_2}}
                               source={require('../image/userIcon/arrow_black.png')}/>
                    </TouchableOpacity>
                    <TextInput
                        style={[this.props.valueStyle, {flex: 1, height: 45,...data.valueStyle}]}
                        placeholder={data.placeHolder}
                        defaultValue={data.mobile}
                        onChangeText={(text) => {
                            data.onPress && data.onPress(data, {
                                isArea: false,
                                value: text
                            });
                        }}
                        {...data.valueStyle || {}}
                    />
                </View>);
                break;
            case "add":
                view = (<View style={[this.props.rightStyle, {...data.rightStyle}]}>
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
                                   source={require("../main/home/actionView/image/icon_jian.png")}/>
                        </TouchableOpacity>

                        <Text style={{minWidth: 60, textAlign: "center"}}>{data.value || 0}</Text>
                        <TouchableOpacity
                            style={{height: 45, width: 25, alignItems: "center", justifyContent: "center"}}
                            onPress={() => {
                                data.onPress && data.onPress(data, true);
                            }}>
                            <Image resizeMode={"contain"}
                                   style={[styles.image, {marginRight: YITU.space_1}]}
                                   source={require("../main/home/actionView/image/icon_jia.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>);
                break;
            case "switch":
                view = (<View style={[this.props.rightStyle, {...data.rightStyle}]}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                        {this.createSwitchItem(data)}
                    </View>
                </View>);
                break;
            case "textArea": {
                view = (<View style={{flex: 1, paddingRight: YITU.space_2}}>
                    <TextInput
                        multiline={true}
                        style={[this.props.valueStyle, {marginVertical: 8, height: 60, ...data.valueStyle}]}
                        placeholder={data.placeHolder}
                        defaultValue={data.value}
                        onChangeText={(value) => {
                            data.onPress && data.onPress(data, value);
                        }}
                        {...data.valueStyle || {}}
                    />
                </View>);
                break;
            }
            case "text": {
                view = (<View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                    <View style={[this.props.rightStyle, {...data.rightStyle}]}>
                        <Text style={[this.props.valueStyle, {color: data.value ? YITU.textColor_1 : YITU.textColor_5}]}>
                            {data.value || data.placeHolder}
                        </Text>
                    </View>
                </View>);
                break;
            }
            default:
                break;
        }
        return view;
    }

    createSwitchItem(data) {
        if (!data || !data.switchArr || data.switchArr.length < 1) {
            return null;
        }

        return data.switchArr.map((item, index) => {
            return (<TouchableOpacity
                key={index}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: YITU.space_5 * 2
                }}
                onPress={() => {
                    data.onPress && data.onPress(data, index + 1, item);
                }}>
                <Image resizeMode={"contain"}
                       style={[styles.image, {marginRight: YITU.space_0}]}
                       source={data.value === (index + 1) ? data.selIcon : data.defIcon}/>
                <Text style={{}}>{item.title}</Text>
            </TouchableOpacity>)
        })
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
    image: {
        width: YITU.d_icon,
        height: YITU.d_icon,
        marginRight: YITU.space_1
    },

});