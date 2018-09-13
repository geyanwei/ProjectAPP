import React, {
    Component,
} from 'react';
import ReactNative, {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import InputSpace from '../../../component/InputSpace';
import { Toast} from 'myapplib';

class LayoutInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data || {},
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    setData(data) {
        this.setState({
            data: data
        });
    }

    render() {
        let {data} = this.state;
        if (data.type === "line") {
            return <View style={{
                width: "100%",
                height: StyleSheet.hairlineWidth,
                backgroundColor: YITU.backgroundColor_Line,
            }}/>
        }
        return (<TouchableOpacity
                activeOpacity={1}
                disabled={data.onPress ? false : true}
                onPress={() => {
                    data.onPress && data.onPress(data);
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%"}}>
                <Text style={{
                        fontSize: YITU.fontSize_5,
                        color: data.titleColor || YITU.textColor_1,
                        width: 90,
                    }}>{data.subTitle || data.title}</Text>
                {this.getRightView(data)}
            </TouchableOpacity>);
    }
    getRightView(data) {
        if (!data || data === {}) {
            return null;
        }
        let view = null;
        switch (data.type) {
            case "input":
                view = <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                    }}>
                    <InputSpace
                        key={data.title + "_"}
                        option={data.option||{}}
                        underlineColorAndroid="transparent"
                        style={{
                            flex: 1,
                            padding:0,
                            fontSize: YITU.fontSize_5,
                            color: YITU.textColor_1,
                            height: YITU.d_RowHeight,
                        }}
                        {...data.prop}
                        value={data.value}
                        cb={(text)=>{
                            data.value = text;
                            if (data.callBack) {
                                data.callBack(text);
                            }
                        }}/>
                </View>;
                break;
            case "phone":
                view = (<View style={{flex: 1, flexDirection: "row", paddingRight: YITU.space_2, alignItems: "center"}}>
                    <TouchableOpacity
                        style={{flexDirection: "row", alignItems: "center"}}
                        onPress={() => {
                            data.callBack && data.callBack(data, {
                                isArea: true,
                            });
                        }}>
                        <Text style={{
                            fontSize: YITU.fontSize_4,
                            minWidth: 32,
                            color: data.value ? YITU.textColor_1 : YITU.textColor_5
                        }}>{data.areaCode?("+"+data.areaCode):"区号"}</Text>
                        <Image resizeMode={"contain"}
                               style={{height: 12, marginLeft: YITU.space_0, marginRight: YITU.space_2}}
                               source={require('../../../image/userIcon/arrow_black.png')}/>
                    </TouchableOpacity>
                    <InputSpace
                        key={data.title + "_"}
                        option={data.option||{}}
                        underlineColorAndroid="transparent"
                        style={{
                            flex: 1,
                            padding:0,
                            fontSize: YITU.fontSize_5,
                            color: YITU.textColor_1,
                            height: YITU.d_RowHeight,
                        }}
                        {...data.prop}
                        value={data.value}
                        cb={(text)=>{
                            data.callBack && data.callBack(data, {
                                isArea: false,
                                value: text
                            });

                            // data.value = text;
                            // if (data.callBack) {
                            //     data.callBack(text);
                            // }
                        }}/>
                </View>);
                break;
            default:
                break;
        }
        return view;
    }
}
module.exports = LayoutInput;

LayoutInput.showMessage = (obj, page) => {
    let msg = "";
    if (obj.value) {
        if (obj.reg) {
            //存在验证
            let state = obj.reg.test(obj.value);
            if (state) {
                //数据成立,返回
                return true;
            } else {
                Toast.showToast(obj.msg);
                return false;
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
    }
    Toast.showToast(v + (msg ? msg : "") + (obj.hint ? obj.hint : "") + obj.title);

    return false;
    //验证正规是否成立
};
LayoutInput.getValue = (obj, page) => {
    return obj.value||"";
};