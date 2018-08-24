/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org/
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Image,
    Text,
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
        return <View {...this.props}>
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
                        alignItems: 'center',
                        width: 78,
                        marginRight: 25,
                        backgroundColor: "#ff3b30",
                        justifyContent: "center",
                    }
                ]}>
                <Image style={{
                    width:24,
                    height:24,
                    alignSelf:"center",
                }}
                       source={require('../image/delete.png')}/>

                <Text style={{marginTop:5,color:YITU.c_title, fontSize: YITU.f_h13}}>删除</Text>
            </TouchableOpacity>
            {this.getRightView(this.props.noDisable,this.props.children)}
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
                snapPoints={[{x: 0, id: 'closed'}, {x: -78, id: 'open'}]}
            >
                {view}
            </Interactable.View>
        }
    }

}

module.exports = index;
