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
    Image,
    Keyboard
} from 'react-native'

class InputSpace extends Component {
    static defaultProps = {
        style: {
            flex: 1,
            padding: 0,
            fontSize: YITU.fontSize_5,
            color: YITU.textColor_1,
        },
        autoCorrect: false,//禁止自动修复输入框文字
        autoCapitalize: "none",
        placeholderTextColor: "#b2b2b2",
        keyborderColor: "#3da3ff",
        selectionColor: "#3da3ff",
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || "",
            isClear: false,
            isFocus: false,
            isCloseEyes: props.secureTextEntry || false,
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value || "",
        });
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
        let {value, isClear, isFocus, isCloseEyes} = this.state;
        let {option, cb} = this.props;
        let myOption = option || {};
        return (<View style={styles.bg}>
            <TextInput {...this.props}
                       value={value}
                       secureTextEntry={isCloseEyes}
                       onFocus={() => {
                           this.setState({isFocus: true, isClear: value ? true : false});
                       }}
                       onBlur={() => {
                           this.setState({isFocus: false});
                       }}
                       onChangeText={(text) => {
                           //type==1 不对键盘进行限制 直接返回输入值
                           if (option && option.type === 1) {
                               this.setState({
                                   value: text,
                                   isClear: text ? true : false
                               }, () => {
                                   cb && cb(text);
                               });
                               return;
                           }
                           //处理输入值
                           this.changeText(text, cb, myOption);
                       }}/>
            {myOption.isNeedClear ? <TouchableOpacity style={styles.btn} onPress={() => {
                this.setState({
                    value: "",
                    isClear: false
                }, () => {
                    cb && cb("");
                });
            }}>
                {isClear && isFocus ? <Image style={styles.clearBtn} resizeMode={"contain"}
                                             source={require('../image/user/icon_delete.png')}/> :
                    <View style={styles.clearBtn}/>}
            </TouchableOpacity> : null}


            {myOption.isNeedEyes ? <TouchableOpacity style={styles.btn} onPress={() => {
                Keyboard.dismiss();
                this.setState({
                    isCloseEyes: !isCloseEyes,
                });
            }}>
                <Image resizeMode={"contain"} style={styles.isEyeBtn}
                       source={isCloseEyes ? require('../image/login/dly-3.png') : require('../image/login/dly-4.png')}/>
            </TouchableOpacity> : null}
        </View>);
    }

    //输入框值发生改变
    changeText(val, cb, myOption) {

        //数据组之间以空格分开
        if (myOption.isGroup) {
            //拿到数据时即对数据源剔除空格
            val = val ? val.replace(/\s+/g, "") : "";
            //对处理过的数据进行分组 3 4 4 格式等
            let myText = val || "";
            let textArr = [];
            if (myOption.isMobileNum) {
                textArr.push(myText.substring(0, 3));
                myText = myText.substring(3, myText.length);
            }

            //多少一组 默认4个字符一组
            let showNum = myOption.showNum || 4;
            //判断循环多少次 即分为几组
            let num = myText ? (myText.length % showNum == 0 ? parseInt(myText.length / showNum) : parseInt(myText.length / showNum) + 1) : 0;
            for (let i = 0; i < num; i++) {
                textArr.push(myText.substring(i * showNum, (i + 1) * showNum));
            }

            //拷贝数组
            let arr = [].slice.call(textArr);
            //形成空格分组字符串 填充到输入框
            this.setValue(arr.join(" "), () => {
                //回调出去正确的字符串
                cb && cb(textArr.join(""));
            });
        } else {
            this.setValue(val, () => {
                cb && cb(val);
            });
        }
    }

    //把数据转化为*号
    dealStrTransStars(str) {
        let starsStr = str ? "*".repeat(str.length) : "";
        return starsStr;
    }

    //把数据转化为*号
    dealArrTransStars(arr) {
        let tempArr = [].slice.call(arr);
        if (!tempArr || tempArr.length < 1) {
            return [];
        }
        tempArr.map((item, index) => {
            tempArr[index] = "*".repeat(item.length);
        });
        return tempArr;
    }

}

module.exports = InputSpace;

const height = 40;
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    btn: {
        width: 25,
        marginHorizontal: 3,
        height: height,
        alignItems: "center",
        justifyContent: "center",
    },
    clearBtn: {
        width: 15,
        height: 15,
    },
    isEyeBtn: {
        width: 20,
        height: 20,
    }
});