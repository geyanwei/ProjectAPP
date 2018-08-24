import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    View,
} from 'react-native';
import {ModalBox} from "myapplib";
import SelectCell from "../../../../component/SelectCell.js";

class CharterModuleView extends Component {
    static show(data, cb) {
        let mb = ModalBox.showConfig({
            modal: <CharterModuleView
                data={data}
                onClose={(item) => {
                    cb && cb(item);
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

    setValue(value, item) {
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value === 0) {
                this.props.onClose && this.props.onClose(item);
            }
        });
    }

    render() {
        let opacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        let {data} = this.props;
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
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                }}
                activeOpacity={1}
                onPress={() => {
                    this.setValue(0);
                }}>

                <View style={{
                    backgroundColor: YITU.backgroundColor_1,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{color: YITU.textColor_5, fontSize: YITU.fontSize_5}}>请选择包车服务范围</Text>
                </View>
                <View style={{paddingVertical: YITU.space_0, backgroundColor: YITU.backgroundColor_0,}}>
                    {this.createCharterServiceLemit(data || [])}

                    <SelectCell onPress={() => {
                        this.setValue(0,{otherCity:true});
                    }}>
                        <View style={{padding: YITU.space_2}}>
                            <Text style={{fontSize: YITU.fontSize_7, color: YITU.textColor_1}}>{"途径其他城市并停留一晚"}</Text>
                        </View>
                    </SelectCell>

                </View>
            </TouchableOpacity>
        </Animated.View>);
    }

    createCharterServiceLemit(data) {
        return data.map((item, index) => {
            return (<SelectCell
                key={index}
                style={{backgroundColor: YITU.backgroundColor_0}}
                onPress={() => {
                    this.setValue(0, item);
                }}>
                <View
                    style={styles.row}>
                    <Text style={{fontSize: YITU.fontSize_7, color: YITU.textColor_1}}>{item.title}</Text>
                    {item.cityLemit ?
                        <Text style={{marginTop: YITU.space_5, fontSize: YITU.fontSize_4, color: YITU.textColor_2}}>
                            <Text>{"室内范围：" + item.cityLemit}</Text>
                        </Text> : null}
                    <Text style={{
                        marginTop: item.cityLemit ? 0 : YITU.space_2,
                        fontSize: YITU.fontSize_4,
                        color: YITU.textColor_2
                    }}>
                        <Text>{"参考景点：" + item.referenceSites}</Text>
                    </Text>
                </View>
            </SelectCell>)
        })
    }
}

module.exports = CharterModuleView;

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