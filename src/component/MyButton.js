/**
 * Created by YITU on 2017/7/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import Loading from './Loading.js';

export default class MyButton extends Component {
    //默认属性
    static defaultProps = {
        underlayColor: '#eeeeeeff',
        underlayTxtColor: '#00000088',
        txtStyle: {color: "#ffffff", fontSize: 18, textAlign: 'center'},
        style:{
            marginHorizontal: YITU.space_5,
            marginTop: YITU.space_8,
            height: 45,
            borderRadius: YITU.radius_1,
            backgroundColor: YITU.backgroundColor_3,
        },
        disabled: false,
        backgroundColor:"#3da3ff",
        noClickedBackgroundColor:"#c6c6c6",
        loadingText:"加载中...",
        loadingView: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: props.isLoading || false,
            disabled:undefined,
            onShowUnderlay: false,
        }
    }

    onShowUnderlay = () => {
        this.setState({
            onShowUnderlay: true
        });
    };

    onHideUnderlay = () => {
        this.setState({
            onShowUnderlay: false
        });
    };

    render() {
        let {
            underlayColor, onPress, onLongPress, onPressOut, onPressIn,
            style,backgroundColor,noClickedBackgroundColor,
            loadingText, loadingView, txtStyle, underlayTxtColor, children
        } = this.props;
        let {onShowUnderlay, isLoading} = this.state;
        let disabled = this.props.disabled;
        if(this.state.disabled !== undefined){
            disabled = this.state.disabled;
        }

        let view = (
            <TouchableHighlight
                onShowUnderlay={this.onShowUnderlay.bind(this)}
                onHideUnderlay={this.onHideUnderlay.bind(this)}
                underlayColor={underlayColor}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressOut={onPressOut}
                onPressIn={onPressIn}
                disabled={isLoading || disabled}
                style={[styles.button, style,
                    {backgroundColor: isLoading ? underlayColor :
                            (disabled? noClickedBackgroundColor : (backgroundColor||style.backgroundColor))}]}>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    {
                        isLoading ?(<View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                <View style={{marginRight: 5}}>
                                    {loadingView || <Loading />}
                                </View>
                                <Text style={[{textAlign: 'center'}, txtStyle,
                                    (onShowUnderlay || isLoading) && {color: underlayTxtColor}]}>{loadingText}</Text>
                            </View>)
                            :
                            (<Text style={[{textAlign: 'center'}, txtStyle, (onShowUnderlay || isLoading) && {color: underlayTxtColor}]}>
                                {children}</Text>)
                    }
                </View>
            </TouchableHighlight>);
        return view;
    }

    setIsLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        });
    }
    setDisabled = (disabled) => {
        this.setState({
            disabled: disabled
        });
    }
}

MyButton.setIsLoading = (btn, isLoading) => {
    btn.setIsLoading(isLoading);
};
MyButton.setDisabled = (btn, disabled) => {
    btn.setDisabled(disabled);
};


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    position: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});