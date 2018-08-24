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
    TouchableOpacity,ColorPropType,
    Image,
} from 'react-native';
import {Toast,ModalBox,LayoutBox,ImageZoom,Select} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <LayoutBox.Input
                        ref={(ref)=>{
                            this.LBREF = ref;
                        }}
                        data={[
                            {
                                title:"姓名",
                                type:"label",
                                resultValue:"高大大",
                            },
                            {
                                title:"姓名",
                                type:"label",
                                resultValue:"高大大",
                                space:true,

                            },
                            {
                                title:"导游资格证",
                                type:"label",
                                resultValue:"有",

                            },
                            {
                                title:"导游资格证照片",
                                type:"other",
                                resultValue:"http://f.hiphotos.baidu.com/image/h%3D300/sign=6fd6769ae7c4b7452b94b116fffd1e78/58ee3d6d55fbb2fb2695a8a1434a20a44723dcc3.jpg",
                                preview:true,
                                renderRow:(props,viewLeft,viewRight)=>{
                                    return <LayoutBox.InputFile  {...props} />
                                },
                                space:true,
                            },
                            {
                                title:"我是个switch",
                                type:"label",
                                resultValue:"换成switch组件",
                                renderRight:(data)=>{

                                    return <Text>{data.resultValue}</Text>
                                }

                            },
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
    },
    submit:{
        alignSelf:"center",
        width:100,
        backgroundColor:"#3da3ff",
        textAlign:"center",
        color:"#fff",
        padding:15,
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
