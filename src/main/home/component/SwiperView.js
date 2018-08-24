import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
// 屏幕宽度
var screenWidth = Dimensions.get('window').width;

class SwiperView extends Component{
    //默认属性
    static defaultProps = {
        style:{
            height:screenWidth*0.6,
        },
        autoplay: true,
        showsPagination:true,
        paginationStyle:{
            bottom:YITU.space_2
        },
        autoplayTimeout:2.5
    };


    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Swiper {...this.props}
                    onIndexChanged={(index)=>{
                        log(index);
                    }}>
                {this.props.children||null}
            </Swiper>);
    }

}
module.exports = SwiperView;

const styles = StyleSheet.create({

});