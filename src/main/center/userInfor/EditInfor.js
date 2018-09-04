import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Keyboard,
} from 'react-native';
import {PageView,navigation,Toast,Loading} from 'myapplib';
import HttpTool from "../../../http/HttpTool";
import APIGYW from "../../../http/APIGYW";
import Storage from "../../../tool/Storage";
import VerHelp from '../../../tool/VerHelp.js';
import InputSpace from '../../../component/InputSpace.js';
import Tool from '../../../tool/Tool.js';

class EditInfor extends Component {
    constructor(props){
        super(props);

        this.data = this.props.data||{};
        this.field = this.data.field;
        this.value = this.data.value;
        let mobileObj = {};
        if (this.data.type==1){
            mobileObj = Tool.getMobileObj(this.data.value);
            this.value = Tool.getMobileGroup(mobileObj.mobile||"");

        }
        this.state ={
            areaVal:mobileObj.mobileArea||"",
        }
    }

    commit(){
        let {areaVal} = this.state;
        let myVal = this.value;
        if (this.data.type==1){
            myVal  = myVal?myVal.replace(/\s+/g,""):"";
        }
        if (this.data.type==1&&areaVal==""){
            Toast.show("请选择区号");
            return;
        }
        if (this.data.type==1&&!VerHelp.getNum(myVal)){
            Toast.show("请核对您的手机号");
            return;
        }
        if (!myVal||myVal==""){
            Toast.show(this.data.placeHolder+"不能为空");
            return;
        }
        if (this.data.type==2&&!VerHelp.getEmail(myVal)){
            Toast.show("邮箱格式不正确");
            return;
        }

        let param = {};
        param[this.field] = (this.data.type==1?(areaVal+"-"):"") +myVal;
        Loading.show();
        let successCallback = (code, message, json, option) => {
            Storage.getUserInfo((obj)=>{
                obj[this.field] = param[this.field];
                if (this.props.callBack){
                    this.props.callBack();
                }
                Loading.hide();
                Toast.show(message);
                navigation.pop(this);
            });
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.show(message);
        };
        HttpTool.post(APIGYW.driver_app_driver_updateContact, successCallback, failCallback, param);
    }

    render() {
        let {areaVal} = this.state;
        let view = (<ScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps={"handled"}
            style={styles.container}>
            <Text style={styles.desc}>{"为便于紧急情况下与您取得联系，建议您填写您的"+ this.data.placeHolder}</Text>
            <View style={styles.cell}>
                {this.data.type==1?<TouchableOpacity style={styles.areqCell} onPress={()=>{
                    Keyboard.dismiss();
                    navigation.push(this,"AreaCodeChoose",{
                        title:"选择区号",
                        callback:(val)=>{
                            this.setState({
                                areaVal:val||"",
                            });
                        }
                    });
                }}>
                    <Text style={[styles.quHao,{color:areaVal?YITU.textColor_1:YITU.textColor_5}]}>{areaVal?("+ "+areaVal):"选择区号"}</Text>
                    <Image style={styles.signImg}
                           resizeMode = {"contain"}
                           source={require('../../../image/userIcon/arrow_black.png')}/>
                    <View style={{marginLeft:YITU.space_1,width:1,height:20,backgroundColor:YITU.backgroundColor_Line}}/>
                </TouchableOpacity>:null}


                {this.getInput()}
            </View>

        </ScrollView>);
        return  (
            <PageView
                ref={(ref)=>{
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this,{
                    navBack:()=>{
                        navigation.pop(this);
                    },
                    pageLoading:false,
                    barConfig:this.navBar(),
                })}
            >
                {view}
            </PageView>
        );
    }
    getInput(){
        let inputView = (<InputSpace
            option={{
                type:!(this.data.type==1||this.data.type==2)?1:"auto",
                isMobileNum: this.data.type == 1,
                isGroup: this.data.type == 1,
                isNeedClear: true,
            }}
            underlineColorAndroid="transparent"
            value={this.value}
            maxLength={this.data.type == 1 ? 31 : (this.data.type == 2?64:32)}
            keyboardType={this.data.type==1?"numeric":(this.data.type==2?"email-address":"default")}
            placeholder={"请输入您的" + this.data.placeHolder}
            style={styles.input}
            cb={(text) => {
                this.value = text;
            }}/>);
        return inputView;
    }

    navBar() {
        return {
            rightButtonText:"保存",
            leftContainerStyle: {width:65},
            rightContainerStyle: {width:62},
            rightButtonFunc:()=>{
                this.commit();
            }
        }
    }
}

module.exports = EditInfor;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    cell:{
        height:YITU.d_RowHeight_1,
        paddingRight:YITU.space_2,
        backgroundColor:YITU.c_bg_white,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    areqCell:{
        flexDirection:"row",
        alignItems:"center"
    },
    quHao:{
        paddingRight:YITU.space_0,
        marginLeft:YITU.space_5,
        minWidth: 20,
        fontSize:YITU.fontSize_5,
        color:YITU.textColor_1,
    },
    input:{
        flex:1,
        marginLeft:YITU.space_5,
        alignSelf:"center",
        fontSize:YITU.fontSize_5,
        color:YITU.textColor_1,
        padding:0,
    },
    headView:{
        marginRight:YITU.space_5,
        width:YITU.d_icon_small+10,
        height:YITU.d_icon_small+10,
        justifyContent:"center",
    },
    signImg :{
        height:12,
        alignSelf:"center",
    },
    desc :{
        color: YITU.textColor_2,
        marginHorizontal: YITU.space_5,
        marginTop: YITU.space_1,
        marginBottom: YITU.space_0,
        paddingVertical: YITU.space_0,
        fontSize: YITU.fontSize_15,
        lineHeight: YITU.fontSize_15 + 5,
    },
});