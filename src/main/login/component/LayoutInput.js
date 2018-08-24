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

    getRightView(obj, data) {
        return (<View style={{
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
            </View>);
    }

    render() {
        let {obj, data} = this.props;
        let onPress = data.onPress;
        if (data.type === "line") {
            return <View style={{
                width: "100%",
                height: StyleSheet.hairlineWidth,
                backgroundColor: YITU.backgroundColor_Line,
            }}/>
        }
        return (<TouchableOpacity
                activeOpacity={1}
                disabled={onPress ? false : true}
                onPress={() => {
                    if (onPress) {
                        onPress();
                    }
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
                {this.getRightView(obj, data)}
            </TouchableOpacity>);
    }
}

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
module.exports = LayoutInput;