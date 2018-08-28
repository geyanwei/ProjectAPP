//创建一个加载动画
//属性:color 字符串颜色
//属性:size 图标大小  small=20, large=36 big=large*2 或者写数字3 代表large*3

//调用方法如下:
//导入引用组件
// var LoadIngView = require('./LoadIngView.js');

//用法

// <LoadIngView />  //默认灰色 大小:small
// <LoadIngView  color="#000000" size = "small" />
// <LoadIngView  color="#000000" size = "large" />
// <LoadIngView  color="#000000" size = "big" />
// <LoadIngView  color="#000000" size = {3}/>


'use strict';

import React, {
    Component,
} from 'react';
import {
View,
    ActivityIndicator,
    Text,
} from 'react-native';

class MyEtcLoadIngView extends Component{

  //声明属性
  static defaultProps = {};



  render() {
    // this.props.color = '#fff000';
  //转换得到当前属性
    var {
        color,
        size,
    } = this.props;
    // size enum('small', 'large') #
    // 指示器的大小。small的高度为20，large为36。

    var style = null;
    if(size){
      if('small'==size || 'large'==size){
        //系统默认的 ,不做改变
      }else if('big'==size){
        //如果是大的 自定义一个52的大小
        // size = null;
        size = 'large';
        var scale = 2;
        style = {
          height:36*scale,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'#ff00ff',
          transform: [{scale: scale}],
        };
      }else{
        //默认大小
        //其它的,按倍数计算 large =  36

        //如果是一个数字,转换数字.得到倍数
        if (typeof (size) == "number") {
          scale = parseInt(size);
          size = 'large';
          style = {
            height:36*scale,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{scale: scale}],
          };
        } else {
          // size = 'small';
          //如果是一个非数字,又不认识的一个字符.默认为最小
          //当前方案:如果不认识的一个..异常爆出
        }
      }
    }else{
      //如果不传大小.默认选择小.
      size = 'small';
    }
    return (
        <View>
        <ActivityIndicator
            size={size}
            color={color}
            style={style}
        />

        </View>
    );
  }
}
//加入组件
module.exports = MyEtcLoadIngView;