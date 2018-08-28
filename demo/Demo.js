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
import DemoToast from "./DemoToast"
import DemoLoading from "./DemoLoading"
import DemoSelect from "./DemoSelect"
import DemoUpImg from "./DemoUpImg"
import DemoImageZoom from "./DemoImageZoom"
import DemoModal from "./DemoModal"
import DemoLayoutBox from "./DemoLayoutBox"
// import DemoNavigation from "./DemoNavigation"
import RootSiblings from "react-native-root-siblings";


//添加DEMO
setTimeout(()=>{
    let view = (
        <TouchableOpacity
            style={{
                position: "absolute",
                bottom: 50,
                right: 50,
                width: 50,
                height: 50,
                alignItems:"center",
                justifyContent:"center",
                borderRadius:25,
                backgroundColor: "#e9c576"
            }}

            onPress={()=>{
                this.rootDemo =  new RootSiblings(
                    <Demo
                        hide={()=>this.rootDemo.destroy()}
                    />
                )
            }}
        >
            <Text>DEV</Text>
        </TouchableOpacity>
    );

    if(this.root){
        this.root.update(view)
    }else{
        this.root =  new RootSiblings(view)
    }

},300);
export default class Demo extends Component {
    render() {
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text>项目内演示组件使用功能</Text>
                    <Text>组件配置调用：项目mylib.js 配置</Text>
                    <Item
                        onPress={() => {
                            this.root = new RootSiblings(
                                <DemoToast
                                    hide={()=>this.root.destroy()}
                                />
                            )
                        }}
                        title={"Toast测试"}
                    />
                    <Item
                        onPress={() => {
                            this.root = new RootSiblings(
                                <DemoLoading
                                    hide={()=>this.root.destroy()}
                                />
                            )
                        }}
                        title={"Loading测试"}
                    />
                    <Item
                        onPress={() => {
                            this.root = new RootSiblings(
                                <DemoSelect
                                    hide={()=>this.root.destroy()}
                                />
                            )
                        }}
                        title={"选择 性别 时间 等"}
                    />
                    <Item
                        onPress={() => {
                            this.root = new RootSiblings(
                                <DemoUpImg
                                    hide={()=>this.root.destroy()}
                                />
                            )
                        }}
                        title={"上传图片"}
                    />
                    <Item
                        onPress={() => {
                            this.root = new RootSiblings(
                                <DemoImageZoom
                                    hide={()=>this.root.destroy()}
                                />
                            )
                        }}
                        title={"图片预览"}
                    />
                    <Item
                        onPress={() => {
                            this.root = new RootSiblings(
                                <DemoModal
                                    hide={()=>this.root.destroy()}
                                />
                            )
                        }}
                        title={"弹出框"}
                    />
                    <Item
                        onPress={() => {
                            this.root = new RootSiblings(
                                <DemoLayoutBox
                                    hide={()=>this.root.destroy()}
                                />
                            )
                        }}
                        title={"LayoutBox"}
                    />
                    <Item
                        onPress={() => {
                            // this.root = new RootSiblings(
                            //     <DemoNavigation
                            //         hide={()=>this.root.destroy()}
                            //     />
                            // )
                        }}
                        title={"导航页面"}
                        state={2}
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
