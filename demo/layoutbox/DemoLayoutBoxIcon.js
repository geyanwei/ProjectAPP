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
import {Toast,ModalBox,LayoutBox} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <LayoutBox.Icon
                        data={[
                            {
                                icon:this.props.icon,
                                title:"司导认证",
                                type:"label",
                                onPress:()=>{
                                    alert("打开司导认证")
                                }
                            },
                            {
                                icon:this.props.icon,
                                title:"我的车辆",
                                type:"label",
                                onPress:()=>{
                                    alert("打开我的车辆")
                                },
                                space:true
                            },
                            {
                                icon:this.props.icon,
                                title:"我的订单",
                                type:"label",
                                onPress:()=>{
                                    alert("打开我的订单")
                                },
                                space:true
                            },
                            {
                                icon:this.props.icon,
                                title:"账户安全",
                                type:"label",
                                resultValue:"设置及修改密码",
                                onPress:()=>{
                                    alert("打开账户安全")
                                }
                            }
                        ]}
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

    ,
    rowStyle:{
        backgroundColor:"#ffffff",
        paddingLeft:15,
        paddingRight:15,
    },
    leftStyle:{
        backgroundColor:"#00000000",
        paddingTop:12,
        paddingBottom:12,
    },
    row:{

        flexDirection:"row",
        alignItems:"center"
    },
    space:{
        height:15,
        backgroundColor:"#00000000",
    },
    icon:{
        width:20,
        height:20,
    },
    title:{
        marginLeft:15,
        fontSize:16,
        color:"#333",
    },
    desc:{
        marginRight:10,
        fontSize:16,
        color:"#999",
    }

});
