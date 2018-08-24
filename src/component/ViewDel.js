/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org/
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Interactable from 'react-native-interactable';

class index extends Component {

    constructor(props) {
        super(props);

    }


    componentWillUnmount() {

    }

    render() {
        return <View style={{}} {...this.props}>
            {
                this.props.isEdite ?
                    <View style={[
                        {
                            position: "absolute",
                            right: 15,
                            height: "100%",
                            width: this.props.number === "one" ? 65 : 130,
                            flexDirection: "row",
                        }
                    ]}>
                        {
                            this.props.number === "one" ? null :
                                <TouchableOpacity
                                    onPress={(e) => {

                                        if (this.props.onPressEdite) {
                                            this.props.onPressEdite();
                                        }
                                        this.inter.snapTo({index: 0});
                                    }}
                                    style={{
                                        width: 60,
                                        justifyContent: "center",
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        height: "100%",
                                        backgroundColor: YITU.backgroundColor_3,
                                        marginLeft: YITU.space_0,
                                        borderRadius: 4,

                                    }}
                                >
                                    <Image style={{
                                        alignSelf: 'center',
                                        width: YITU.d_icon_small,
                                        height: YITU.d_icon_small
                                    }}
                                           resizeMode={"contain"} source={require('../image/user/set.png')}/>
                                    <Text style={{
                                        color: "#fff",
                                        marginTop: YITU.space_0 * 5,
                                        fontSize: YITU.fontSize_5
                                    }}>编辑</Text>
                                </TouchableOpacity>
                        }

                        <TouchableOpacity
                            onPress={(e) => {

                                if (this.props.onPress) {
                                    this.props.onPress();
                                }
                                this.inter.snapTo({index: 0});
                            }}
                            style={{
                                justifyContent: "center",
                                alignSelf: 'center',
                                alignItems: 'center',
                                width: 60,
                                borderRadius: YITU.radius_1,
                                paddingHorizontal: YITU.space_1,
                                height: "100%", backgroundColor: YITU.backgroundColor_12,
                                marginLeft: YITU.space_0
                            }}
                        >{
                            this.props.rightView ? this.props.rightView : <View>
                                <Image style={{
                                    alignSelf: 'center',
                                    width: YITU.d_icon_small,
                                    height: YITU.d_icon_small,
                                }}
                                       resizeMode={"contain"} source={require('../image/user/delete.png')}/>
                                <Text style={{
                                    color: YITU.c_title_white,
                                    marginTop: YITU.space_0 * 5,
                                    fontSize: YITU.fontSize_5
                                }}>{"删除"}</Text>
                            </View>
                        }

                        </TouchableOpacity>
                    </View> :
                    <TouchableOpacity
                        onPress={(e) => {

                            if (this.props.onPress) {
                                this.props.onPress();
                            }
                            this.inter.snapTo({index: 0});
                        }}
                        style={[
                            {
                                position: "absolute",
                                right: 0,
                                height: "100%",
                                alignSelf: 'center',
                                alignItems: 'center',
                                width: 75,
                                marginRight: 0,
                                backgroundColor: YITU.backgroundColor_12,
                                justifyContent: "center",
                            }
                        ]}
                    >
                        <Image style={{alignSelf: 'center', width: YITU.d_icon_small, height: YITU.d_icon_small}}
                               resizeMode={"contain"} source={require('../image/user/delete.png')}/>
                        <Text style={{
                            color: YITU.c_title_white,
                            marginTop: YITU.space_0 * 5,
                            fontSize: YITU.fontSize_5
                        }}>删除</Text>
                    </TouchableOpacity>
            }
            {this.getRightView(this.props.noDisable, this.props.children)}
        </View>

    }

    getRightView(noDisable, view) {
        if (noDisable) {
            return <View>{view}</View>
        } else {
            return <Interactable.View
                horizontalOnly={true}
                ref={(ref) => {
                    this.inter = ref;
                }}
                onSnap={(e) => {
                    const snapPointId = e.nativeEvent.id;
                }}
                snapPoints={[{x: 0, id: 'open'}, {
                    x: this.props.isEdite ? (this.props.number === "one" ? -65 : -130) : -75,
                    id: 'closed'
                }]}
            >
                {view}
            </Interactable.View>
        }
    }

}

module.exports = index;
