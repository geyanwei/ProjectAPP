import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    PanResponder,
    Dimensions,
    Animated,
    Image,
    Slider,
    TouchableWithoutFeedback,
} from 'react-native';

const BUTTON_HEIGHT = 50;
import ShimmerPlaceHolder from './ShimmerPlaceholder';

class OrderAnimatedButton extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            x: 0
        });
        this.startX = 0;
        this.width = this.props.width;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

                this.startX = gestureState.x0;
            },
            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}

                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
                let move = gestureState.moveX - this.startX;
                let moveMax = this.width - BUTTON_HEIGHT / 12 * 14;

                if (move < 0) {
                    move = 0
                } else if (move > moveMax) {
                    move = moveMax;
                }
                this.setState({
                    x: move
                })
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderRelease: (evt, gestureState) => {
                let moveMax = this.width - BUTTON_HEIGHT / 12 * 14;

                //3.2 改为滑动一半就促发事件
                if (this.state.x < moveMax / 2) {
                    this.setState({
                        x: 0
                    })
                } else {
                    if (this.props.callBack) {
                        this.props.callBack(() => {
                            this.setState({
                                x: 0
                            })
                        });
                    }
                }
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    }

    componentDidMount() {
    }


    render() {
        let main = (
                <TouchableWithoutFeedback delayLongPress={3000} onLongPress={() => {
                    //3.2 长按3s也触发事件
                    if (this.props.callBack) {
                        this.props.callBack();
                    }
                }}>
                    <View style={{
                        height: BUTTON_HEIGHT,
                        borderRadius: BUTTON_HEIGHT / 2,
                        width: "100%",
                        overflow: "hidden",
                        justifyContent: "center",
                    }}>

                        <ShimmerPlaceHolder
                            style={{
                                width: "100%", height: BUTTON_HEIGHT,
                                borderRadius: BUTTON_HEIGHT / 2,
                                backgroundColor: 'transparent',
                                position: 'absolute'
                            }}
                            autoRun={true}
                            duration={2500}
                            widthShimmer={0.9}
                            colorShimmer={["#rgba(255,0,0,0.8)", "#rgba(255,255,255,0.5)", "#rgba(255,0,0,0.8)"]}
                            backgroundColorBehindBorder={"transparent"}
                        />
                        <Text style={{
                            color: "#fff",
                            fontSize: 14,
                            padding: 10,
                            backgroundColor: 'transparent',
                            textAlign: 'center'
                        }}>{this.props.message}</Text>


                        <View style={{
                            borderTopLeftRadius: BUTTON_HEIGHT / 2,
                            borderBottomLeftRadius: BUTTON_HEIGHT / 2,
                            position: "absolute",
                            height: BUTTON_HEIGHT,
                            width: this.state.x + BUTTON_HEIGHT / 2,
                            backgroundColor: YITU.backgroundColor_13,
                            top: 0,
                            left: 0
                        }}/>

                        <Image style={{
                            height: BUTTON_HEIGHT,
                            width: BUTTON_HEIGHT / 12 * 14,
                            position: 'absolute',
                            transform: [
                                {translateX: this.state.x,}
                            ]
                        }}

                               source={require("./image/hk.png")}
                               {...this._panResponder.panHandlers}
                        >
                        </Image>
                    </View>
                </TouchableWithoutFeedback>
            )
        ;
        return main;
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
});

module.exports = OrderAnimatedButton;