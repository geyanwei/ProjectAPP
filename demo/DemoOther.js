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
    ImageBackground,
    TextInput
} from 'react-native';
import Item from "./Item"
import {Toast, ImageZoom, UpImage} from "myapplib";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
        };
        this.maxLength = 10;
    }

    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>

                        <Text
                            numberOfLines={1}
                        >123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123</Text>
                        <TextInput
                            style={{
                                width:100,
                                height:50,
                                backgroundColor:"#f00",
                                color:"#fff"
                            }}
                            value={this.state.text}
                            maxLength={this.maxLength}
                            onChangeText={(e)=>{
                                console.log(e);

                                let text =e;
                                let index = e.indexOf(".");
                                if(index===0){
                                    //首位是. 强制清空
                                    text = "";
                                    this.maxLength = 10
                                } else if(index>0){
                                    //存在. 计算，可输入长度
                                    // e.length + e.length - index-1
                                    //点前长度+（2-点后长度）
                                    this.maxLength = text.length+(2-(text.length-index-1))
                                }else {
                                    //不存在
                                    this.maxLength = 10
                                }
                                this.setState({text:text});

                                // e.nativeEvent.text = e.nativeEvent.text+"1"
                                return false;
                            }}

                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.close}
                                  onPress={() => {
                                      this.props.hide && this.props.hide();
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
    main: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
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
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#e9c576"
    }

});
