/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native';
import Item from "./Item"
import {Toast, ModalBox, ImageZoom} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Item
                        onPress={() => {
                            ImageZoom.show([
                                "http://f.hiphotos.baidu.com/image/h%3D300/sign=6fd6769ae7c4b7452b94b116fffd1e78/58ee3d6d55fbb2fb2695a8a1434a20a44723dcc3.jpg",
                                "http://cdn.duitang.com/uploads/item/201509/05/20150905201930_zZ8xR.thumb.700_0.png",
                            ],1);
                        }}
                        title={"图片预览  默认最后一张"}
                    />
                    <Item
                        onPress={() => {
                            ImageZoom.show([
                                "http://f.hiphotos.baidu.com/image/h%3D300/sign=6fd6769ae7c4b7452b94b116fffd1e78/58ee3d6d55fbb2fb2695a8a1434a20a44723dcc3.jpg",
                            ]);
                        }}
                        title={"图片预览单图"}
                    />
                    <Item
                        onPress={() => {
                            ImageZoom.show([
                                "http://f.",
                            ]);
                        }}
                        title={"图片预览一个错误地址"}
                    />
                </View>
            </ScrollView>
                <TouchableOpacity style={styles.close}
                                  onPress={()=>{
                                      this.props.hide&&this.props.hide();
                                  }}
                >
                    <Text>关闭</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingTop: 22
    },
    main:{
        position: "absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor: '#ddd',
    },
    container: {
        flex: 1,
    },
    close: {
        position: "absolute",
        bottom: 50,
        right: 50,
        width: 50,
        height: 50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25,
        backgroundColor: "#e9c576"
    }

});
