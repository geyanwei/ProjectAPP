import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    Animated,
    Easing,
    View,
    ScrollView,
} from 'react-native';
import {ModalBox} from "myapplib";

class ModuleView extends Component {
    static show(data) {
        let mb = ModalBox.showConfig({
            modal: <ModuleView data={data||{}}
                onClose={() => {
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
        this.state={
            data:props.data||{}
        };
    }

    componentDidMount() {
        this.setValue(1);
    }

    setValue(value) {
        Animated.timing(this.fadeInOpacity, {
            toValue: value, // 目标值
            duration: 200, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(() => {
            if (value === 0) {
                this.props.onClose && this.props.onClose();
            }
        });
    }

    render() {
        let opacity = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        let {data} = this.state;

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
            <View
                style={{
                    borderRadius:YITU.radius_1,
                    padding:YITU.space_6,
                    width:YITU.screenWidth-60,
                    height:(YITU.screenWidth-60)*1.3,
                    backgroundColor:"#ffffff",
                    overflow:"hidden"
                }}>
                <Text style={{fontSize:YITU.fontSize_7,color:YITU.textColor_1,marginBottom:YITU.space_0}}>
                    <Text>{"走进"+(data.title||"")}</Text>
                </Text>

                <ScrollView style={{flex:1}}>
                    <Text style={{fontSize:YITU.fontSize_4,color:YITU.textColor_3}}>
                        <Text>{data.descs||""}</Text>
                    </Text>
                </ScrollView>
            </View>
            <TouchableHighlight
                underlayColor={"rgba(0,0,0,0.7)"}
                style={styles.btn}
                onPress={() => {
                    this.setValue(0);
                }}>
                <Image style={{width:40,height:40}} source={require("../../../image/order/image/close_icon.png")}/>
            </TouchableHighlight>
        </Animated.View>);
    }
}

module.exports = ModuleView;

const styles = StyleSheet.create({
    bg: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        alignItems: "center",
        justifyContent:"center"
    },
    btn: {
        marginTop: YITU.space_6,
        borderRadius: 40*YITU.screenScaleWidth* 0.5,
        height: 40*YITU.screenScaleWidth,
        width: 40*YITU.screenScaleWidth,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: YITU.backgroundColor_0,
        // borderStyle: "solid",
        alignItems: "center",
        justifyContent: "center",
    }
});