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
import {Toast,ModalBox,LayoutBox,Select} from "myapplib";



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
                                title:"所属国家",
                                type:"label",
                                resultValue:"中国",
                                required:true,
                                space:true,
                                rightTextStyle:{
                                    textAlign:"left"
                                }
                            },
                            {
                                field:"a2",
                                title:"持卡人英文姓",
                                type:"input",
                                ver:true,
                                verMessage:"请输入正确的英文姓",
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                required:true,
                            },
                            {
                                field:"a3",
                                title:"持卡人英文名",
                                type:"input",
                                ver:true,
                                verMessage:"请输入正确的英文名",
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                required:true,
                                space:true,
                            },
                            {
                                field:"a4",
                                title:"收款银行名称",
                                type:"input",
                                ver:true,
                                verMessage:"请输入收款银行名称",
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                required:true,
                            },
                            {
                                field:"a5",
                                title:"收款人电话",
                                type:"input",
                                ver:true,
                                verMessage:"请输入收款银行名称",
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                required:true,
                                space:true,
                                renderSpace:()=>{
                                    return <View><Text style={{
                                        padding:15,
                                        color:"#999",
                                        fontSize:14
                                    }}>电话必须含区号，如+86 1388 888 8888</Text></View>
                                }
                            },
                            {
                                field:"a6",
                                title:"邮箱",
                                type:"input",
                                ver:true,
                                verMessage:"请输入邮箱",
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                space:true,
                                renderSpace:()=>{
                                    return <View><Text style={{
                                        padding:15,
                                        color:"#999",
                                        fontSize:14
                                    }}>非必填，可能会发送打款信息到邮箱</Text></View>
                                }
                            },
                            {
                                field:"a7",
                                title:"性别",
                                type:"select",
                                ver:true,
                                verMessage:"请选择性别",
                                resultValue:"",
                                reg:(v)=>{
                                    //验证必须是字母
                                    return v.length<10
                                },
                                onPress:(e,data)=>{
                                    Select.show({
                                        pickerData:["男","女","隐藏性别"],//选择源
                                        selectedValue:["男"],//默认选择
                                        onSelect:(arr)=>{
                                            if(arr&&arr.length===1){
                                                let v  = arr[0];
                                                console.log(data.refItem);
                                                if(v ==="隐藏性别"){
                                                    data.resultValue = undefined;
                                                }else{
                                                    data.resultValue = v;
                                                }
                                                data.refItem.refresh();
                                            }
                                        }
                                    });
                                }
                            },
                        ]}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            //收集文本区域值
                            let a = this.LBREF.getLayoutBox().getLayoutValue();
                            console.log(a);
                            alert(JSON.stringify(a))
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
                    <Text >关闭</Text>
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
        backgroundColor: '#f2f3f4',
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


});
