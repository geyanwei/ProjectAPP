import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

class configView extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 图片
     * @returns {*}
     */
    renderImage() {
        let imageSource = this.props.config.imageSource;
        let imageStyle = this.props.config.imageStyle;
        if (imageSource) {
            return <Image style={[styles.defaultImageStyle,imageStyle]} source={imageSource}/>
        }
        return null;
    }

    /**
     * 文字描述
     * @returns {*}
     */
    renderMessage() {
        let message = this.props.config.message;
        let messageStyle = this.props.config.messageStyle;
        if (message) {

            return <Text style={[styles.defaultTitleStyle,messageStyle]}>{message}</Text>;
        }
        return null;
    }

    /**
     * 按钮
     * @returns {*}
     */
    renderButton() {
        let customButton = this.props.config.customButton;
        let refresh = this.props.config.refresh;
        let buttonTitle = this.props.config.buttonTitle;
        let buttonStyle = this.props.config.buttonStyle;
        let buttonTitleStyle = this.props.config.buttonTitleStyle;

        if (customButton) {
            return customButton;
        } else if (buttonTitle || refresh) {
            return (
                <TouchableOpacity onPress={() => {
                    if (refresh) {
                        refresh(this.props.config)
                    }
                }}
                                  style={[styles.defaultButtonContainer, buttonStyle]}>
                    <Text style={[styles.defaultButtonTextStyle, buttonTitleStyle]}>{buttonTitle}</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        let {config,error} = this.props;

        let errorconfig = error.config.errorConfig || {};
        let message = errorconfig.message;

        let nav = this.props.config.full ?
            <View style={styles.navbar}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}
                                  onPress={()=>{if (config.back){config.back()} }}>
                    <Image style={{width:8,height:15}} source={require('../src/image/img_back_blue.png')}/>
                    <Text style={{marginLeft:6,color:YITU.textColor_4, fontSize:YITU.fontSize_4,}}>返回</Text>
                </TouchableOpacity>
                <Text style={[styles.title,config.errorTitleStyle]}>{config.errorTitle}</Text>
            </View>:null;

        let errorView =(
            <View style={[styles.defaultMainContainerStyle]}>
                {nav}
                <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
                    <Image style={styles.defaultImageStyle} source={require('./image/fail.png')} />
                    <Text style={styles.defaultTitleStyle}>{message || "加载失败请重试"}</Text>
                    <TouchableOpacity onPress={() => {
                        if (config && config.refresh) {
                            // Loading.show("加载中");
                            config.refresh(this.props)
                        }
                    }}
                                      style={styles.defaultButtonContainer}>
                        <Text style={styles.defaultButtonTextStyle}>重新加载</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
        return errorView;
    }
}

const styles = StyleSheet.create({
    defaultMainContainerStyle: {
        flex: 1,
        alignItems: "center",
    },
    defaultImageStyle:{
        width:250,
        height:92,
    },
    defaultTitleStyle:{
        marginTop:YITU.space_9,
        color:YITU.textColor_2,
        fontSize:YITU.fontSize_5,
        textAlign:'center',
    },
    defaultButtonContainer: {
        marginTop:YITU.space_7,
        alignSelf:'center',
        width:160*YITU.screenScaleWidth,
        height:33*YITU.screenScaleHeight,
        paddingVertical:YITU.space_3,
        backgroundColor:YITU.backgroundColor_3,
        borderRadius:4,
        justifyContent:'center'
    },
    defaultButtonTextStyle: {
        color:YITU.c_title_white,
        fontSize:YITU.fontSize_4,
        textAlign:'center'
    },
    navbar:{
        height:YITU.navBarHeight,
        width:YITU.screenWidth,
        paddingHorizontal:YITU.space_5,
        backgroundColor:'white',
        flexDirection:'row',
        paddingTop:YITU.barStateHeight,
    },
    title:{
        flex:1,
        color: YITU.textColor_0,
        fontSize: YITU.fontSize_7,
        fontFamily: YITU.fontName_medium,
        textAlign: 'center',
        backgroundColor: YITU.backgroundColor_clear,
        alignSelf: 'center',
        fontWeight: "bold",
        marginRight:49,
    }
});

module.exports = configView;
