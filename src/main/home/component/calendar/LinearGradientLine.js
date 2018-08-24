import React, {Component} from 'react';
import {View, Dimensions} from 'react-native'
import Svg, {
    LinearGradient,
    Rect,
    Defs,
    Stop
} from 'react-native-svg';
import LinearGradient1 from "react-native-linear-gradient";
const {height, width} = Dimensions.get('window');

class LinearGradientLine extends Component {

    constructor(props) {
        super(props);
    }

    mainPage() {
        let w = width, h = 6;
        let fromColor = "#e0e1e0";
        return (
            <Svg
                height={h}
                width={w}
            >
                <Defs>
                    {
                        this.props.reverse ?
                            <LinearGradient id="grad" x1={0} y1={0} x2={0} y2={h}>
                                <Stop offset="0" stopColor={"#fff"} stopOpacity="0"/>
                                <Stop offset="0.3" stopColor={fromColor} stopOpacity="0.1"/>
                                <Stop offset="1" stopColor={fromColor} stopOpacity="0.9"/>
                            </LinearGradient> :
                            <LinearGradient id="grad" x1={0} y1={0} x2={0} y2={h}>
                                <Stop offset="0" stopColor={fromColor} stopOpacity="0.9"/>
                                <Stop offset="0.7" stopColor={fromColor} stopOpacity="0.1"/>
                                <Stop offset="1" stopColor={YITU.backgroundColor_1} stopOpacity="0"/>
                            </LinearGradient>
                    }

                </Defs>
                <Rect
                    x="0"
                    y="0"
                    width={w}
                    height={h}
                    fill="url(#grad)"
                />
            </Svg>
        )
    }

    normal(){
        return (
            <LinearGradient1
                colors={this.props.reverse ?[YITU.backgroundColor_Line_1,YITU.backgroundColor_Line]:[YITU.backgroundColor_Line,YITU.backgroundColor_Line_1]}
                style={{width:"100%", height:6}}
            />
        )
    }

    render() {
        return null;
    }
}

module.exports = LinearGradientLine;