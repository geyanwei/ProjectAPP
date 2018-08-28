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
    Image,
} from 'react-native';
import {Toast,ModalBox,LayoutBox,Select} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <LayoutBox.Input
                        leftStyle={{
                            flex:1,
                            paddingTop:12,
                            paddingBottom:12,
                            backgroundColor:"#00000000",
                        }}
                        rightStyle={{
                            flex:4,
                        }}
                        rightTextStyle={{
                            textAlign:"left"
                        }}
                        ref={(ref)=>{
                            this.LBREF = ref;
                        }}
                        renderRightIcon={(eye)=>{
                            return  <Image
                                style={{
                                    width:40,height:20,
                                }}
                                resizeMode={"contain"}
                                source={eye?require("./image/eye2.png"):require("./image/eye.png")}
                            />
                        }}
                        data={[
                            {
                                field:"a1",
                                title:"登录密码",
                                type:"input",
                                ver:true,
                                clearText:true,
                                verMessage:"请输入登录密码",
                                rightProps:{
                                    placeholder:"请输入登录密码",
                                    defaultValue:"123",
                                },
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                required:true,
                                space:true,
                            },
                            {
                                field:"a2",
                                title:"提现密码",
                                type:"input",
                                ver:true,   clearText:true,
                                verMessage:"请输入提现密码",
                                rightProps:{
                                    secureTextEntry:true,
                                    maxLength:4,
                                    placeholder:"请输入提现密码",
                                },
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                required:true,
                            },
                            {
                                field:"a3",
                                title:"确认密码",
                                type:"input",
                                ver:true,   clearText:true,
                                verMessage:"请输确认密码",
                                rightProps:{
                                    secureTextEntry:true,
                                    maxLength:4,
                                    placeholder:"请确认密码",
                                },
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                required:true,
                            },
                        ]}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            //收集文本区域值
                            let a = this.LBREF.getLayoutBox().getLayoutValue();
                            console.log(a);
                            alert(JSON.stringify(a))
                        }}
                    >
                        <Text style={styles.submit}>提交</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
                <TouchableOpacity style={styles.close}
                                  onPress={()=>{
                                      this.props.hide&&this.props.hide();
                                  }}
                >
                    <Text >关闭</Text>
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
        backgroundColor: '#f2f3f4',
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
    },
    submit:{
        alignSelf:"center",
        width:100,
        backgroundColor:"#3da3ff",
        textAlign:"center",
        color:"#fff",
        padding:15,
    }


});
