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
import {Toast,Select} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Item
                        onPress={() => {
                            Select.show({
                                pickerData:["男","女"],
                                selectedValue:["男"],
                                onSelect:(data)=>{
                                    Toast.show(JSON.stringify(data))
                                }
                            });
                        }}
                        title={"选择性别"}
                    />
                    <Item
                        onPress={() => {
                            Select.show({
                                pickerData:["男,女,".repeat(100).split(",",100-1),"A,B,".repeat(100).split(",",100-1),"死亡,活着,".repeat(100).split(",",100-1)],
                                selectedValue:["男"],
                                onSelect:(data)=>{
                                    Toast.show(JSON.stringify(data))
                                }
                            });
                        }}
                        title={"选择两维数组无关联"}
                    />
                    <Item
                        onPress={() => {
                            Select.showTime('1990,10,1', '1890,1,1', new Date(),{
                                onSelect:(data)=>{
                                    Toast.show(JSON.stringify(data))
                                }
                            });
                        }}
                        title={"选择时间"}
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
