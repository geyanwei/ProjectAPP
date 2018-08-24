import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Easing,
    Animated,
    Text,
} from 'react-native';

import {Loading} from 'myapplib'

const Times = 100000000;

class loadingView extends Component {

    constructor(props){
        super(props);

        // this.state = {
        //     rotateValue: new Animated.Value(0),
        // };
    }

    componentDidMount() {
        // this.state.rotateValue.setValue(0);
        // Animated.timing(this.state.rotateValue,{
        //     toValue: 360*Times,
        //     duration: 800*Times,
        //     easing: Easing.linear
        // }).start();// 开始spring动画
    }

    render() {
        return <View style={styles.main}>
            <Loading text={"加载中"} {...this.getLoadingConfig()}/>
            {/*<Animated.Image style={[{width:29,height:29},{transform:[{rotate: this.state.rotateValue*/}
                        {/*.interpolate({inputRange: [0, 360],outputRange: ['0deg', '360deg']})*/}
                {/*}]*/}
            {/*}]}  defaultSource={require('./image/zj-waiting.png')} source={require('./image/zj-waiting.png')}/>*/}
            {/*<Text style={{color:YITU.textColor_2,fontSize:YITU.fontSize_5,marginTop:YITU.space_5}}>加载中</Text>*/}

        </View>

    }

    getLoadingConfig(){
        return {
            contentStyle: {
                backgroundColor: YITU.backgroundColor_clear,
            },//LOADING背影样式 默认
            textStyle:{
                color: YITU.textColor_2,
                marginTop:10,
                fontSize:YITU.fontSize_5,
                textAlign:"center",
                backgroundColor: '#00000000',
                width:"100%",
                maxWidth:90,
            },//文本样式  默认
            circleRing:{
                color:YITU.textColor_4,
                thickness:2,
                spinDuration:2000,
                ringColor:YITU.backgroundColor_4,
            }, //环形转圈样式  默认
        }
    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
        alignItems:'center',
        justifyContent:'center',
    },
});

module.exports = loadingView;
