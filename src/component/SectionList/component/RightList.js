import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    PanResponder,
    Dimensions,
    Platform,
    DeviceInfo
} from 'react-native';

const {width, height} = Dimensions.get('window');
const BAR_HEIGHT = 44;
const barStateHeight = Platform.OS === 'android' ? 0 : DeviceInfo.isIPhoneX_deprecated ? 44 : 20;

const ITEM_SIZE = 18;

class RightList extends Component {

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
                let thisY = this.rightItemY + barStateHeight + BAR_HEIGHT + (this.props.extralTopHeight || 0);
                if (value >= thisY && value <= (thisY + array.length * ITEM_SIZE)) {
                    let y = value - thisY;
                    let index = parseInt(y / ITEM_SIZE);
                    this.scrollToIndex(index);
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                // console.log('移动 最近一次移动时的屏幕坐标\n moveX:' + gestureState.moveX + ',moveY:' + gestureState.moveY);
                // console.log('移动 当响应器产生时的屏幕坐标\n x0:' + gestureState.x0 + ',y0:' + gestureState.y0);
                // console.log('移动 从触摸操作开始时的累计纵向路程\n dx:' + gestureState.dx + ',dy :' + gestureState.dy);

                // let value = gestureState.moveY;
                // let array = this.props.letters || [];
                // let thisY = this.rightItemY + barStateHeight + BAR_HEIGHT + (this.props.extralTopHeight || 0);
                // if (value >= thisY && value <= (thisY + array.length * ITEM_SIZE)) {
                //     let y = value - thisY;
                //     let index = parseInt(y / ITEM_SIZE);
                //     this.scrollToIndex(index);
                // }


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
            })
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
                    flex: 1,
                    position: "absolute",
                    backgroundColor: 'transparent',
                    top: 0,
                    right: 5,
                    width: 20,
                    height: "100%",
                    justifyContent: 'center',
                }}
                {...this._panGesture.panHandlers}
            >
                <View
                    onLayout={({nativeEvent: e}) => {
                        this.rightItemY = e.layout.y
                    }}
                    style={{
                        alignItems: 'center',
                        alignSelf: "center"
                    }}>
                    {
                        array.map((item, index) => {
                            return (
                                <View onPress={() => this._scrollTo(index)}
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


module.exports = RightList;