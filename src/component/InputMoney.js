/*
 *支持自定义样式
 *isGroup 是否分组
 *isMobileNum 是否是手机号格式显示 默认不是手机号格式显示
 *isSecureTextEntry 是否要安全显示 默认不星号显示✳
 *showNum 多少个字符一组 默认是4个
 * isNeedClear 是否需要清空按钮
 * isNeedEyes 是否需要眼睛查看按钮
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native'

class InputMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || "",
            isClear: false,
            isFocus: false,
            textLength: 100
        }
    }

    componentDidMount() {

    }

    setValue(t, callBack) {
        this.setState({
            value: t,
            isClear: t ? true : false
        }, () => {
            if (callBack) {
                callBack();
            }
        });
    }

    render() {
        let {value, isClear, isFocus, textLength} = this.state;
        let {option, style, cb} = this.props;
        let {isNeedClear} = option || {};
        return (<View style={styles.bg}>
            <TextInput
                placeholder={"请输入"}
                underlineColorAndroid="transparent"
                placeholderTextColor={YITU.textColor_5}
                {...this.props}
                style={[styles.input, style || {}]}
                onFocus={() => {
                    this.setState({
                        isFocus: true,
                        isClear: value
                    });
                }}
                onBlur={() => {
                    this.setState({
                        isFocus: false
                    });
                }}
                // maxLength={textLength}
                value={value}
                onChangeText={(text) => {
                   let firstText = text.substring(0, 1);
                    if (firstText === ".") {
                        text = "";
                    }
                    this.changeText(text, cb);
                }}
            />
            {isNeedClear ? <TouchableOpacity style={styles.btn} onPress={() => {
                this.setState({
                    value: "",
                    isClear: false
                }, () => {
                    if (cb) {
                        cb("");
                    }
                });
            }}>
                {isClear && isFocus ?
                    <Image style={styles.clearBtn} resizeMode={"contain"}
                           source={require('../image/user/icon_delete.png')}/> :
                    <View style={styles.clearBtn}/>}
            </TouchableOpacity> : null}

        </View>);
    }

    //输入框值发生改变
    changeText(val, cb,) {
        val = this.myNum(val) || "";

        this.setValue(val, () => {
            if (cb) {
                cb(val);
            }
        });
        // //拿到数据时即对数据源剔除空格
        // val = val?val.replace(/\s+/g,""):"";
    }

    //处理数据 显示钱只能输入到小数点后两位
    myNum(value) {
        let regStrs = this.props.reg || [
            ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
            ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
            ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
            ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上

        ];
        for (let i = 0; i < regStrs.length; i++) {
            let reg = new RegExp(regStrs[i][0]);
            value = value.replace(reg, regStrs[i][1]);
        }
        return value;

        // //判断是否含小数点
        // let numStr = value.toString();
        // let a = numStr.indexOf(".");
        // if (a!=-1){
        //     //小数点后有几位？
        //     let subNumStr = numStr.substring(a,numStr.length);
        //
        //     this.setState({
        //         textLength:numStr.length+(3-subNumStr.length),
        //     });
        // }else {
        //     this.setState({
        //         textLength:100,
        //     });
        // }
        // return numStr;
    }
}

module.exports = InputMoney;

const height = 30;
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        fontSize: YITU.fontSize_5,
    },

    btn: {
        marginHorizontal: 6,
        height: height,
        alignItems: "center",
        justifyContent: "center",
    },
    clearBtn: {
        width: 12,
        height: 12,
    },
    isEyeBtn: {
        width: 20,
        height: 20,
        resizeMode: "center"
    }
});