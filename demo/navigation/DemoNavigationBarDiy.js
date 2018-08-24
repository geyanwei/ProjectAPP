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
import {Toast, ModalBox, LayoutBox, PageView,navigation} from "myapplib";

PageView.test = 123;
export default class App extends Component {
    render() {
        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
                <PageView
                    config={{
                        parent:this,
                        barConfig:{
                            title:"导航自定义",
                        },
                        renderNavBar:(data)=>{
                            return <Text
                                style={{
                                    backgroundColor:"#ff00aa",
                                    color:"#fff",
                                    fontSize:30,
                                    padding:30,
                                }}
                                onPress={()=>{
                                    navigation.pop(this)
                                }}
                            >我这是一个导航，虽然长的不好看，但也是导航，而且，点我可以返回</Text>
                        }
                    }}
                >
                    <Text
                    >这是一个导航页面</Text>

                    <Text

                        onPress={()=>{
                            navigation.pop(this)
                        }}
                    >点我也可以返回</Text>
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
