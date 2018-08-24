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
import {AppInit,Toast,ModalBox,LayoutBox} from "myapplib";
import DemoNavigationFull from "./navigation/DemoNavigationMain.js";
import RootSiblings from "react-native-root-siblings";

import routeList from "./navigation/route.js";
let routeMain = AppInit.initRoute(routeList);

let RouteStack = AppInit.initApp(routeMain);

export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
                <RouteStack ref={(ref) => {
                    AppInit.ref = ref;
                }}
                            testtext={"1213232"}
                            onNavigationStateChange={(prevState, currentState) => {
                            }}/>

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
    close2: {
        position: "absolute",
        bottom: 50,
        left: 50,
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
