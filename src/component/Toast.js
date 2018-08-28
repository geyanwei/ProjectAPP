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
    Text,
} from 'react-native'

export const DURATION = { 
    LENGTH_LONG: 2000, 
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const {height, width} = Dimensions.get('window');

class Toast extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            text: '',
            key:0,
        }
    }

    show(text, duration,pos) {
        this.pos = pos;
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;

        this.setState({
            isShow: true,
            text: text,
            key:this.state.key+1,
        });
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.timer = setTimeout(()=>{
            this.setState({
                isShow: false,
            });
        },1000)
    }


    componentWillUnmount() {
        try{
            this.timer && clearTimeout(this.timer);
            this.timer = null;
            this.setState({
                opacityValue:null,
            })
        }catch (e){

        }

    }

    render() {
        let pos = this.props.positionValue;
        switch (this.pos) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;

        }
        
        const view = this.state.isShow ?
            <View
                style={[styles.container, { top: pos }]}
                pointerEvents="none"
                >
                <View
                    style={[styles.content,  this.props.style]}
                    >
                    <Text style={this.props.textStyle}>{this.state.text}</Text>
                </View>
            </View> : null;
        return view;
    }
}
module.exports = Toast;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'white'
    }
});



Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
};
