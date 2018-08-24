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
import {Toast,ModalBox,LayoutBox,ImageZoom} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <LayoutBox.Second
                        data={[
                            {
                                title:"订单号",
                                type:"label",
                                resultValue:"4892374836573468745687456456",
                            },
                            {
                                title:"接单号",
                                type:"label",
                                resultValue:"4892374836573468745687",
                            },
                            {
                                title:"售后单号",
                                type:"label",
                                resultValue:"4892374845687456456",
                            },
                            {
                                title:"用车类型",
                                type:"label",
                                resultValue:"包车",
                            },
                            {
                                title:"售后图片",
                                type:"label",
                                resultValue:[
                                    "http://f.hiphotos.baidu.com/image/h%3D300/sign=6fd6769ae7c4b7452b94b116fffd1e78/58ee3d6d55fbb2fb2695a8a1434a20a44723dcc3.jpg",
                                    "http://cdn.duitang.com/uploads/item/201509/05/20150905201930_zZ8xR.thumb.700_0.png",
                                    "http://cdn.duitang.com/uploads/item/201509/05/20150905201930_zZ8xR.thumb.700_0.png",
                                    "http://cdn.duitang.com/uploads/item/201509/05/20150905201930_zZ8xR.thumb.700_0.png",
                                    "http://cdn.duitang.com/uploads/item/201509/05/20150905201930_zZ8xR.thumb.700_0.png",
                                ],
                                renderRight:(data)=>{
                                    //显示图片排版
                                    if(!data.resultValue){
                                        return <Text style={{color:"#000"}}>无图片</Text>
                                    }
                                    return (
                                        <View style={{
                                            width:"100%",
                                            flexWrap:"wrap",
                                            flexDirection:"row",
                                            justifyContent:"flex-end",
                                            marginTop:12,
                                        }}>

                                            {
                                                data.resultValue.map((obj,key)=>{
                                                    let url = obj;
                                                    //假设是七牛
                                                    if(obj.indexOf("http")&&obj.indexOf("?")<0){
                                                        url  = obj + "?imageView2/1/w/50/h/50"
                                                    }
                                                    return (
                                                        <TouchableOpacity
                                                            key={key}
                                                            onPress={()=>{
                                                                ImageZoom.show(data.resultValue,key)
                                                            }}
                                                        >
                                                        <Image
                                                            source={{uri:url}}

                                                               style={{
                                                                   marginLeft:5,
                                                                   marginBottom:5,
                                                                   width:50,
                                                                   height:50,
                                                                   backgroundColor:"#ddd",
                                                                   resizeMode:"cover",
                                                               }}
                                                        />
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }

                                        </View>
                                    )
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
