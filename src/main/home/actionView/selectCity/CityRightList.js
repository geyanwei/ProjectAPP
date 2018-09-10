import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    PanResponder,
    NativeModules
} from 'react-native';

const ITEM_SIZE = 18;

class CityRightList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };

    }

    componentWillMount() {
        this._panGesture = PanResponder.create({
            //要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                let value = gestureState.y0;
                let array = this.props.letters || [];
                if (value >= this.rightItemY && value <= (this.rightItemY + array.length * ITEM_SIZE)) {
                    let y = value - this.rightItemY;
                    let index = parseInt(y / ITEM_SIZE);
                    this.scrollToIndex(index);
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                // console.log('移动 最近一次移动时的屏幕坐标\n moveX:' + gestureState.moveX + ',moveY:' + gestureState.moveY);
                // console.log('移动 当响应器产生时的屏幕坐标\n x0:' + gestureState.x0 + ',y0:' + gestureState.y0);
                // console.log('移动 从触摸操作开始时的累计纵向路程\n dx:' + gestureState.dx + ',dy :' + gestureState.dy);

                let value = gestureState.moveY;
                let array = this.props.letters || [];
                if (value >= this.rightItemY && value <= (this.rightItemY + array.length * ITEM_SIZE)) {
                    let y = value - this.rightItemY;
                    let index = parseInt(y / ITEM_SIZE);
                    this.scrollToIndex(index);
                    // this.refresh(index);
                }


                // console.log("移动的点 " + value);

                // console.log(this.mul(sub, myLetters.length));
            },
            onResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderRelease: (evt, gestureState) => {
                // console.log('抬手 x:' + gestureState.moveX + ',y:' + gestureState.moveY);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // console.log(`结束 = evt.identifier = ${evt.identifier} gestureState = ${gestureState}`);
            },
        });

    }

    _scrollTo(index) {
        if (this.props.scrollTo) {
            this.props.scrollTo(index);
        }
    }

    refresh(i) {
        if (this.state.index !== i) {
            this.setState({
                index: i
            });
        }
    }

    scrollToIndex(index) {
        this._scrollTo(index);
    }

    render() {
        let array = this.props.letters || [];
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    position: "absolute",
                    top: 0,
                    right: 5,
                    justifyContent:"center",
                    height:"100%",
                    width: 20,
                    // backgroundColor:"red"
                }}
                {...this._panGesture.panHandlers}>
                <View
                    // onLayout={({nativeEvent: e}) => {
                    //     this.rightItemY = e.layout.y
                    //     alert(this.rightItemY)
                    //
                    // }}
                    onLayout={(e) => {
                        NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                            this.rightItemY = pageY;
                        });
                    }}

                    style={{
                        alignItems: 'center',
                        alignSelf: "center",
                        // backgroundColor:"gray"
                    }}>
                    {
                        array.map((item, index) => {
                            return (
                                <View
                                    // activeOpacity={1}
                                    // onPress={() => {
                                    //     this._scrollTo(index)
                                    // }}
                                      style={[{
                                          height: ITEM_SIZE,
                                          width: ITEM_SIZE,
                                          backgroundColor: 'transparent',
                                          justifyContent: "center",
                                          alignItems: "center"
                                      }, this.state.index === index ? {
                                          backgroundColor: YITU.backgroundColor_3,
                                          borderRadius: 9
                                      } : null]} key={index}>
                                    <Text style={[{
                                        backgroundColor: 'transparent',
                                        fontSize: YITU.fontSize_14,
                                        color: YITU.textColor_1
                                    }, this.state.index === index ? {color: "#fff"} : null]}>{item}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}


module.exports = CityRightList;