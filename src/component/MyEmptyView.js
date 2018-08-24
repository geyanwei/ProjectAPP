import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

class MyEmptyView extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 图片
     * @returns {*}
     */
    renderImage() {
        let imageSource = this.props.imageSource;
        let imageStyle = this.props.imageStyle;
        if (imageSource) {
            return <Image style={imageStyle} source={imageSource}/>
        }
        return null;
    }

    /**
     * 文字描述
     * @returns {*}
     */
    rendermessage() {
        let message = this.props.message;
        let messageStyle = this.props.messageStyle;
        if (message) {
            return <Text style={[{fontSize:YITU.fontSize_4,color:YITU.textColor_2,margin:YITU.space_6},messageStyle]}>{message}</Text>;
        }
        return null;
    }

    /**
     * 按钮
     * @returns {*}
     */
    renderButton() {
        let customButton = this.props.customButton;
        let callBack = this.props.callBack;
        let buttonTitle = this.props.buttonTitle;
        let buttonStyle = this.props.buttonStyle;
        let buttonTitleStyle = this.props.buttonTitleStyle;
        if (customButton) {
            return customButton;
        } else if (buttonTitle || callBack) {

            return (
                <TouchableHighlight activeOpacity = {1} underlayColor = {"#3d97ea"} onPress={() => {
                    if (callBack) {
                        callBack()
                    }
                }}
                                  style={[styles.defaultButtonContainer, buttonStyle]}>
                    <Text style={[styles.defaultButtonTextStyle, buttonTitleStyle]}>{buttonTitle}</Text>
                </TouchableHighlight>
            )
        }
    }

    render() {
        let mainContainerStyle = this.props.mainContainerStyle;
        return (
            <View style={[styles.defaultMainContainerStyle, mainContainerStyle]}>
                {
                    this.renderImage()
                }
                {
                    this.rendermessage()
                }
                {
                    this.renderButton()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    defaultMainContainerStyle: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },

    defaultButtonContainer: {
        height: 33,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: "#3da3ff",
        width: "100%"
    },
    defaultButtonTextStyle: {
        backgroundColor: 'transparent',
        color: "#fff",
        fontSize: 15
    }
});

module.exports = MyEmptyView;
