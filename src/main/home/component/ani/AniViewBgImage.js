import React, {Component, PropTypes} from 'react';
import {StyleSheet, Easing, Animated, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window");

class AniViewBgImage extends Component {
    static defaultProps = {
        aniImage: require('../../../../image/userIcon/grzx-bg.png'),
        url:undefined,
        aniHeight: 207.5,

    };

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 0,
                easing: Easing.linear
            }
        ).start();
    }

    setScrollNum(y) {
        this.animatedValue.setValue((0 - y) / (YITU.screenHeight - this.props.aniHeight));
    }

    render() {
        let heightAni = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.aniHeight, YITU.screenHeight],
        });

        let {aniImage,url} = this.props;
        return (<Animated.Image
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: width,
                height: heightAni,
            }}
            defaultSource={aniImage}
            source={url?{uri:url}:aniImage}>
        </Animated.Image>);
    }
}

module.exports = AniViewBgImage;

const styles = StyleSheet.create({});
