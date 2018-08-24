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
import {AppInit,Toast, ModalBox, LayoutBox, PageView,navigation} from "myapplib";

export default class App extends Component {
    render() {
        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
                <PageView
                    config={{
                        parent:this,
                        barConfig:{
                            title:"导航页面",
                        },
                        emptyConfig:{
                            loadingShow:true,
                            message:"aaa"
                        }
                    }}
                >
                    <Text
                        >这是B</Text>


                    <Text

                        onPress={()=>{
                            AppInit.test();
                        }}
                    >更新A</Text>
                    <Text

                        onPress={()=>{
                            navigation.push(this,"DemoNavigationC")
                        }}
                    >TOC</Text>
                </PageView>
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

    ,

});
