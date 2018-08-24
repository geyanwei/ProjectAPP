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
    TouchableOpacity,ColorPropType,
    Image,
} from 'react-native';
import {Toast,ModalBox,LayoutBox,ImageZoom,Select} from "myapplib";



export default class App extends Component {
    render() {

        //注：统一样式，现配置在mylib.js文件中
        return (
            <View style={styles.main}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>

                    <LayoutBox.Input
                        ref={(ref)=>{
                            this.LBREF = ref;
                        }}
                        data={[
                            {
                                field:"a1",
                                title:"姓名",
                                type:"input",
                                resultValue:"高大大",

                            },
                            {
                                field:"a2",
                                title:"导游资格证",
                                type:"select",
                                ver:true,
                                verMessage:"请选择导游资格证",
                                resultValue:"有",
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                onPress:(e,data)=>{
                                    Select.show({
                                        pickerData:["有","无"],//选择源
                                        selectedValue:["有"],//默认选择
                                        onSelect:(arr)=>{
                                            if(arr&&arr.length===1){
                                                data.resultValue  = arr[0];
                                                data.refItem.refresh();
                                                //控制其他组件
                                                let refDataArray = this.LBREF.getLayoutBox().getItemRefArrayForKey("title","导游资格证照片")
                                                if(refDataArray&&refDataArray.length===1){
                                                    refDataArray[0].display  = data.resultValue==="有";
                                                    refDataArray[0].refItem.refresh();
                                                }
                                                console.log(refDataArray)

                                            }
                                        }
                                    });
                                }
                            },
                            {
                                field:"a3",
                                title:"导游资格证照片",
                                desc1:"图片必须大天600*600",
                                desc2:"证件上的所有信息必须清晰可识别",
                                type:"other",
                                display:true,
                                ver:true,
                                verMessage:"请选择导游资格证照片",
                                reg:(v)=>{
                                    //验证必须是个URL
                                    return v&&v.indexOf("http")===0
                                },
                                required:true,
                                renderRow:(props,view1,view2)=>{
                                    return <LayoutBox.InputFile  {...props}/>
                                },
                            }, {
                                field:"a4",
                                title:"文本区域输入",
                                type:"input",
                                resultValue:"高大大",
                                rightProps:{
                                    maxLength:50,
                                },

                                renderRow:(props,view1,view2)=>{
                                    return <LayoutBox.InputArea  {...props} view1={view1}/>
                                }
                            },
                        ]}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            //收集文本区域值
                            let box = this.LBREF.getLayoutBox().getLayoutValue();
                            console.log(box)
                            if(box.error&&box.error.length>0){
                                Toast.show(box.error[0].verMessage)
                                return;
                            }else{
                                Toast.show(JSON.stringify(box.parameter))

                            }
                        }}
                    >
                        <Text style={styles.submit}>提交</Text>
                    </TouchableOpacity>
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
    },
    submit:{
        alignSelf:"center",
        width:100,
        backgroundColor:"#3da3ff",
        textAlign:"center",
        color:"#fff",
        padding:15,
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
