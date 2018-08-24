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
import {Toast, ModalBox, Loading} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Item
                        onPress={() => {
                            let mbBase = ModalBox.showSelect("通知","是否再次弹一个窗口？，请选择",(v)=>{
                                Toast.show("你选择了"+v)

                                if(v===0){
                                    return true;
                                }else{
                                    let mb = ModalBox.showTitle("选择确定".repeat(Math.random()*10+1))
                                    mb.setCloseListener(()=>{
                                        //继续关闭
                                        mbBase.close();
                                    })
                                    return false;
                                }

                            })
                        }}
                        title={"叠加弹框"}
                    />
                    <Item
                        onPress={() => {
                            ModalBox.showTitle("这是标题".repeat(Math.random()*10+1),()=>{alert("closed")})
                        }}
                        title={"弹出标题"}
                    />
                    <Item
                        onPress={() => {
                            ModalBox.showDesc("这是描述".repeat(Math.random()*10+1))
                        }}
                        title={"弹出描述"}
                    />
                    <Item
                        onPress={() => {
                            ModalBox.showOK("系统通知","您已经被选中成为天选者")
                        }}
                        title={"弹出OK"}
                    />
                    <Item
                        onPress={() => {
                            ModalBox.showOK(<Text style={{color:"green"}}>恭喜您</Text>,<Text>{"您已经被选中成为\n"}<Text style={{color:"green"}}>天选者</Text></Text>)
                        }}
                        title={"弹出OK 带描述色"}
                    />
                    <Item
                        onPress={() => {
                            ModalBox.showSelect("通知","你是否准备好了？，请选择",(v)=>{
                                Toast.show("你选择了"+v)
                                return true;
                            })
                        }}
                        title={"弹出选择 默认"}
                    />
                    <Item
                        onPress={() => {
                            ModalBox.showSelect("通知","生或者死，请选择",(v)=>{
                                Toast.show("你选择了"+v)
                                return true;
                            },"生","死",)
                        }}
                        title={"弹出选择 定义"}
                    />
                    <Item
                        onPress={() => {
                            let inputValue = undefined;
                            let mb = ModalBox.showConfig({
                                title:{
                                    text:"反馈建议",

                                },//标题选项，如果是一个React.Element 替换现在，
                                input:{
                                    props:{
                                        placeholder:"输入您的建议",
                                        onChangeText:(e)=>{
                                            inputValue = e;
                                        }
                                    },
                                    style:{
                                        minHeight:80,
                                        maxHeight:80,
                                    }
                                },//object or View ,is null not show
                                foot:{
                                    direction:"row",
                                    buttons:[
                                        {
                                            text:"取消",
                                            style:{color:"#000"},
                                            onPress:(e)=>{
                                                mb.close();
                                            }
                                        },
                                        {
                                            text:"提交",
                                            style:{color:"#108ee9"},
                                            onPress:(e)=>{
                                                // if()
                                                if(inputValue){
                                                    Loading.show("反馈中")
                                                    setTimeout(()=>{
                                                        Loading.hide();
                                                        mb.close();
                                                        Toast.showOK("反馈成功")
                                                    },3000)
                                                }else{
                                                    Toast.show("请输入反馈建议")
                                                }

                                            }
                                        }
                                    ]},// object or View  存在，替换modal 操作区域视图
                            })
                        }}
                        title={"弹出输入框"}
                    />
                    <Item
                        onPress={() => {
                            let mb =   ModalBox.showConfig({
                                title:{
                                    text:"this is title",
                                    props:{},//标题参数 Text所有参数
                                    style:{},//标题样式

                                },//标题选项，如果是一个React.Element 替换现在，
                                desc:{
                                    text:<Text>this is desc! {"\n"}<Text style={{color:'red'}}>red font </Text><Text style={{color:'green'}}>{'green font'}</Text></Text>,
                                    props:{},
                                    style:{
                                    },
                                    textStyle:{
                                        textAlign:"left"
                                    },

                                },//object or View ,is null not show
                                input:null,//object or View ,is null not show
                                foot:{
                                    direction:"row",
                                    buttons:[
                                        {text:"取消",style:{color:"#000"},onPress:(e)=>{alert("取消");mb.close()}},
                                        {text:"确定",style:{color:"#108ee9"}}
                                    ]},// object or View  存在，替换modal 操作区域视图
                                content:null,// View  存在，替换modal显示区域视图
                                modal:null,// View  存在，替换modal视图,
                                modalConfig:{
                                    swipeToClose:true,
                                }
                            })
                        }}
                        title={"不满足，请完成自定义 1"}
                    />
                    <Item
                        onPress={() => {
                            let mb = ModalBox.showConfig({
                                title:{
                                    text:"神问你",
                                    props:{},//标题参数 Text所有参数
                                    style:{},//标题样式

                                },//标题选项，如果是一个React.Element 替换现在，
                                desc:{
                                    text:<Text>假如有一天! {"\n"}<Text style={{color:'red'}}>成为神很简单 </Text><Text style={{color:'green'}}>{'你愿意么？'}</Text></Text>,
                                    props:{},
                                    style:{
                                    },
                                    textStyle:{
                                        textAlign:"left"
                                    },

                                },//object or View ,is null not show
                                input:null,//object or View ,is null not show
                                foot:{
                                    direction:"column",
                                    buttons:[
                                        {text:"我不配",style:{color:"#000"},onPress:(e)=>{
                                                mb.close();}},
                                        {text:"我配",style:{color:"#108ee9"}},
                                        {text:"我不知道",style:{color:"#108ee9"}}
                                    ]},// object or View  存在，替换modal 操作区域视图
                                content:null,// View  存在，替换modal显示区域视图
                                modal:null,// View  存在，替换modal视图,
                                modalConfig:{
                                    clickToClose:false,
                                }
                            })
                        }}
                        title={"不满足，请完成自定义 2 （竖排选择）"}
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
