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

export default class App extends Component {
    render() {
        console.log(this.props);

        console.log("test:"+PageView.test);
        //注：统一样式，现配置在mylib.js文件中
        return (
            <PageView
                config={{
                    parent:this,
                    full:true,
                    pageLoading:false,
                    barConfig:{
                    title:"标题",
                        }
                }}
            >
                <Text
                    style={styles.button}
                    onPress={()=>{
                        navigation.push(this,"DemoNavigationParam",{
                            tell:"回家吃饭啦",
                            callBack:(value)=>{
                                Toast.show("我儿子说："+value)
                            }}
                        )
                    }}
                >打开一个页面 参数演示</Text>
                <Text
                    style={styles.button}
                    onPress={()=>{
                        navigation.push(this,"DemoNavigationBar",{id:123})
                    }}
                >打开一个导航页面</Text>
                <Text
                    style={styles.button}
                    onPress={()=>{
                        navigation.push(this,"DemoNavigationBarDiy")
                    }}
                >打开一个页面，导航自定义</Text>
                <Text
                    style={styles.button}
                    onPress={()=>{
                        navigation.push(this,"DemoNavigationBigData")
                    }}
                >打开一个详情页面，数据很多，解决卡</Text>
                <Text
                    style={styles.button}
                    onPress={()=>{
                        navigation.push(this,"DemoNavigationError")
                    }}
                >打开一个错误交互页面</Text>

                <Text
                    style={styles.button}
                    onPress={()=>{
                         navigation.push(this,"DemoNavigationA")
                    }}
                >打开一个流程页面 A=>B=C 在C中，回退到A页面</Text>

            </PageView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    button:{
      backgroundColor:"#ffa",
      textAlign:"center",
      padding:15,
      marginTop:10
    },
});
