import React, {Component, PropTypes} from 'react';
import {
    View,
    ImageBackground,
    Image,
    Text,
    StyleSheet,
    Easing,
    Animated,
    TouchableOpacity,
    Dimensions,
    StatusBar, Platform
} from 'react-native';

const {width, height} = Dimensions.get("window");

class SelectItem extends Component {
    constructor(props) {
        super(props);
        this.fadeInOpacity = new Animated.Value(0); // 初始值
    }

    componentDidMount() {

    }

    setScrollNum(y,location_y) {
        this.fadeInOpacity.setValue(y<location_y?0:1);
    }

    render() {
        let {view} = this.props;

        let colorAni = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        let widthAni = this.fadeInOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, YITU.screenWidth],
        });

        return (<Animated.View style={[styles.navCell, {
            opacity: colorAni,
            width:widthAni
        }]}>
            {view||null}
        </Animated.View>);
    }

}

module.exports = SelectItem;

const styles = StyleSheet.create({
    navCell: {
        position: "absolute",
        top: YITU.BAR_HEIGHT + YITU.barStateHeight,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
    },
});
