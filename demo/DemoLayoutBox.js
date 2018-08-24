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
import Item from "./Item"
import {Toast,ModalBox,LayoutBox} from "myapplib";
import DemoLayoutBoxSecond from "./layoutbox/DemoLayoutBoxSecond.js";
import DemoLayoutBoxFirst from "./layoutbox/DemoLayoutBoxFirst.js";
import DemoLayoutBoxInputFile from "./layoutbox/DemoLayoutBoxInputFile";
import DemoLayoutBoxIcon from "./layoutbox/DemoLayoutBoxIcon.js";
import DemoLayoutBoxInput from "./layoutbox/DemoLayoutBoxInput.js";
import DemoLayoutBoxPWInput from "./layoutbox/DemoLayoutBoxPWInput.js";
import RootSiblings from "react-native-root-siblings";


export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Item
                        onPress={() => {
                            this.rootDemo =  new RootSiblings(
                                <DemoLayoutBoxSecond
                                    hide={()=>this.rootDemo.destroy()}
                                />
                            )
                        }}
                        state={1}
                        title={"文本与图片显示排版 次级效果"}
                    />
                    <Item
                        onPress={() => {
                            this.rootDemo =  new RootSiblings(
                                <DemoLayoutBoxFirst
                                    hide={()=>this.rootDemo.destroy()}
                                />
                            )
                        }}
                        state={1}
                        title={"文本与图片显示排版 一级效果"}
                    />
                    <Item
                        onPress={() => {
                            this.rootDemo =  new RootSiblings(
                                <DemoLayoutBoxInputFile
                                    hide={()=>this.rootDemo.destroy()}
                                />
                            )
                        }}
                        state={1}
                        title={"带上传图片的输入"}
                    />
                    <Item
                        onPress={() => {
                            this.rootDemo =  new RootSiblings(
                                <DemoLayoutBoxIcon
                                    icon={require("./layoutbox/image/de.png")}
                                    hide={()=>this.rootDemo.destroy()}
                                />
                            )
                        }}
                        state={1}
                        title={"带图标的排版"}
                    />
                    <Item
                        onPress={() => {
                            this.rootDemo =  new RootSiblings(
                                <DemoLayoutBoxIcon
                                    hide={()=>this.rootDemo.destroy()}
                                />
                            )
                        }}
                        state={1}
                        title={"单行无图片点击"}
                    />
                    <Item
                        onPress={() => {
                            this.rootDemo =  new RootSiblings(
                                <DemoLayoutBoxInput
                                    hide={()=>this.rootDemo.destroy()}
                                />
                            )
                        }}
                        state={1}
                        title={"输入框与选择排版"}
                    />
                    <Item
                        onPress={() => {
                            this.rootDemo =  new RootSiblings(
                                <DemoLayoutBoxPWInput
                                    hide={()=>this.rootDemo.destroy()}
                                />
                            )
                        }}
                        state={1}
                        title={"密码类输入框排版"}
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
