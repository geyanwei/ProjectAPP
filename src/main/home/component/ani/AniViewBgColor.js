import React, { Component, PropTypes } from 'react';
import {StyleSheet, Easing, Animated} from 'react-native';
class AniViewBgColor extends Component {
    static defaultProps = {
        backgroundColor: "#374354",
        aniHeight: 207.5,
    };

    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(0);
    }
    componentDidMount() {
        this.animate();
    }

    animate () {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 0,
                easing: Easing.linear
            }
        ).start();
    }

    setScrollNum(y){
        this.animatedValue.setValue((0-y)/(YITU.screenHeight-this.props.aniHeight));
    }
    render() {
        let heightAni = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.aniHeight, YITU.screenHeight],
        });
        return (<Animated.View
            style={{
                backgroundColor: this.props.backgroundColor,
                position: "absolute",
                top: 0,
                left: 0,
                width: YITU.screenWidth,
                height: heightAni,
            }}>
        </Animated.View>);
    }
}
module.exports = AniViewBgColor;

const styles = StyleSheet.create({


});
