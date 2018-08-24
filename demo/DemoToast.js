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
    TouchableOpacity,Image
} from 'react-native';
import Item from "./Item"
import {Toast,ModalBox} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Item
                        onPress={() => {
                            Toast.show("你好")
                        }}
                        title={"Toast"}
                    />
                    <Item
                        onPress={() => {
                            Toast.show("你好".repeat(1000))
                        }}
                        title={"Toast很多文字的"}
                    />
                    <Item
                        onPress={() => {
                            Toast.showOK("你好")
                        }}
                        title={"Toast OK 样式的"}
                    />
                    <Item
                        onPress={() => {
                            Toast.show("你好",{
                                style:{
                                    backgroundColor:"#f00"
                                },
                                textStyle:{
                                    color:"#ff0"
                                }
                            })
                        }}
                        title={"Toast 自定义样式的"}
                    />
                    <Item
                        onPress={() => {
                            Toast.showICON("哈哈",require("./image/ok.png"))
                        }}
                        title={"Toast 带ICON的"}
                    />
                    <Item
                        onPress={() => {
                            Toast.show("你好",{
                                position:"top",
                                style:{
                                    backgroundColor:"#000"
                                },
                                view:(
                                    <View
                                        style={{
                                            width:300,
                                            height:300,
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                    >
                                        <Image style={{
                                            width:32,
                                            height:32,
                                        }} source={require("./image/ok.png")}/>
                                        <Text
                                        style={{
                                            marginTop:10,
                                            color:"#fff"
                                        }}
                                        >4214124</Text>
                                    </View>
                                )
                            })
                        }}
                        title={"Toast 可随便定义的"}
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
