/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org/
 * @flow
 */

import React, {Component} from 'react';
import {
    Animated,
    Image,
    ImageBackground,
    Easing
} from 'react-native'


class Loading extends Component {

    constructor(props) {
        super(props);
        this.rotateVal= new Animated.Value(0);
        this.state={
            isLoading:props.isLoading||false
        }
    }
    componentDidMount(){
        this.startAnim()
    }
    startAnim() {
        this.animationLoading = Animated.timing(
            this.rotateVal, // 初始值
            {
                toValue: 360, // 终点值
                duration: 800,
                easing: Easing.linear, // 这里使用匀速曲线
            }
        );
        Animated.loop(this.animationLoading).start(); // 开始动画
    }

    componentWillUnmount() {
        Animated.loop(this.animationLoading).stop;  //停止动画，可用于任意时刻停止动画
    }

    render() {
        let ani = this.rotateVal.interpolate({
            inputRange: [0, 360],
            outputRange: ['360deg', '0deg'],
        });
        return (<Animated.View
            style={{
                width: 21,
                height: 21,
                justifyContent: "center",
                alignItems: "center",
                transform: [{
                    rotate: ani
                }],
            }}>
            <Image
                resizeMode={"contain"}
                style={{
                    width: 21,
                    height: 21,
                    opacity:0.6,
                }} source={require('../image/loading_icon.png')}/>

        </Animated.View>);
    }

}

module.exports = Loading;