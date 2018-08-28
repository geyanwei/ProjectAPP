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
import { Loading} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Item
                        onPress={() => {
                            Loading.show();
                            //3秒后关闭
                            setTimeout(()=>{
                                Loading.hide();
                            },3000)
                        }}
                        title={"Loading 3秒后关闭"}
                    >
                    </Item>
                    <View style={{flexDirection:"row", justifyContent:"space-around",padding:10}}>
                        <Loading
                            text={"少年别走"}
                            {...this.getLoadingTheme(true)}
                        />
                        <Loading
                            text={"少女非走"}
                            // hasBG={true} //是否有黑色背影
                            {...this.getLoadingTheme()}
                        />
                    </View>
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
    getLoadingTheme(isWhiteTheme){
        if(isWhiteTheme){
            return {
                contentStyle: {
                    backgroundColor: '#fff',
                },//LOADING背影样式 默认
                textStyle:{
                    color: '#545454',
                    marginTop:10,
                    fontSize:14,
                    textAlign:"center",
                    backgroundColor: '#00000000',
                    width:"100%",
                    maxWidth:90,
                },//文本样式  默认
                circleRing:{
                    color:['#3da3ff'],
                    thickness:2,
                    spinDuration:2000,
                    ringColor:"#cccccc",
                }, //环形转圈样式  默认
            }
        }else{
            return {
                contentStyle: {
                    backgroundColor: '#000000',
                },//LOADING背影样式 默认
                textStyle:{
                    color: 'white',
                    marginTop:10,
                    fontSize:14,
                    textAlign:"center",
                    backgroundColor: '#00000000',
                    width:"100%",
                    maxWidth:90,
                },//文本样式  默认
                circleRing:{
                    color:['#3da3ff'],
                    thickness:2,
                    spinDuration:2000,
                    ringColor:"#cccccc",
                }, //环形转圈样式  默认
            }
        }
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
