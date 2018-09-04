import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import HttpTool from '../../../../http/HttpTool';
import Storage from '../../../../tool/Storage.js';
import {PageView,navigation,Loading,Toast} from "myapplib"

const TIME = 60;

class VerIdentity extends Component {
    constructor(props){
        super(props);
        this.state ={
            mobileCode:"",
            time:60,
        };

    }

    componentWillUnmount() {
        this.clearTimer && clearInterval(this.clearTimer);
    }

    sendCode(){
        let userInfo = Storage.getUserInfo();
        if (!userInfo){
            return;
        }
        let data={"type":3,
        "key":userInfo.mobile};
        let successCallBack =(code,message)=>{
            this.timer();
            Toast.show(message);
        };
        let errorCallBack =(code,message)=>{
            Toast.show(message);
        };
        HttpTool.get("/base-usercenter/authapi/v1.1/smscodes"+`/${data.type}/${data.key}`, successCallBack, errorCallBack, data);
    }



    timer(){
        this.setState({
            time:this.state.time-1,

        },()=>{
            this.clearTimer&&clearInterval(this.clearTimer);
            this.clearTimer=undefined;
            this.clearTimer=setInterval(()=>{
                if (this.state.time===0){
                    this.setState({
                        time:60
                    },()=>{
                        this.clearTimer&&clearInterval(this.clearTimer);
                        this.clearTimer=undefined;
                    })
                } else {
                    this.setState({
                        time:this.state.time - 1,
                    })

                }
            }, 1000)
        })
    }

    nextAction(){
        let userInfo = Storage.getUserInfo();
        if (!userInfo){
            return;
        }
        let data={"type":3,
            "mobile":userInfo.mobile,
        "code":this.state.mobileCode,
        "check":true};
        let successCallBack =(code,message)=>{
            log(this.props.pageKey);
            log("!!!!!!!!!!")
            navigation.push(this,"SetPayPW",{
                title:"设置提现密码",
                mobileCode:this.state.mobileCode,
                pageKey:this.props.pageKey,
                callBack:()=>{
                        if(this.props.callBack){
                            this.props.callBack();
                        }
                    }
                });

        };
        let errorCallBack =(code,message)=>{
            Toast.show(message);
        };

        HttpTool.delete("/base-usercenter/authapi/v1.1/smscodes"+`/${data.type}/${data.mobile}/${data.code}?check=${data.check}`, successCallBack, errorCallBack, data);

    };

    render() {
        let userInfo = Storage.getUserInfo()||null;
        let phone="";
        if (userInfo){
            phone = userInfo.mobile||null;
        }
        phone = phone?(phone.substr(0,6)+"***"+phone.substr(phone.length-4,phone.length)):"";
        let {mobileCode} = this.state;
        let view = (<View style={styles.container}>
            <Text style={styles.title}>
                {"请输入手机号"+phone+"收到的验证码"}
            </Text>
            <View style={styles.view}>
                <TextInput style={{flex:1,padding:0}}
                           maxLength={6}
                           underlineColorAndroid="transparent"
                           placeholder={"输入验证码"}
                           keyboardType={"numeric"}
                           placeholderTextColor={YITU.textColor_2}
                           onChangeText={(text)=>{
                                   this.setState({
                                       mobileCode:text
                                   });
                           }}/>
                <TouchableOpacity style={[styles.button,{backgroundColor:this.state.time===TIME?YITU.backgroundColor_3:YITU.backgroundColor_4}]}
                                  onPress={()=>{
                                      this.sendCode()
                                  }}
                                  disabled={this.state.time!==TIME}
                >
                    <Text style={{color:'white'}}>
                        {this.state.time===TIME?"获取验证码":this.state.time+"s重试"}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.nextButton,{backgroundColor:mobileCode?YITU.backgroundColor_3:YITU.backgroundColor_4}]}
                              disabled={!mobileCode}
                onPress={() => {
                    YITU.ClickTrackFunction(YITU.TrackIdentityVerification.idvalidate_next);
                this.nextAction()
            }}>
                <Text style={{alignSelf:'center', color:'white', fontSize:YITU.fontSize_6}}>
                    下一步
                </Text>
            </TouchableOpacity>
            <Text style={styles.mark}>
                因全球地区的差异,您收到验证码的等待时间可能较长,请耐心等待
            </Text>
        </View>);
        return  (
            <PageView
                ref={(ref)=>{
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this,{
                })}
            >
                {view}
            </PageView>
        );

    }
}

module.exports = VerIdentity;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
        paddingTop:YITU.space_3,
    },
    title:{
        marginLeft:YITU.space_3,
        color:YITU.textColor_2,
        fontSize:YITU.fontSize_3,

    },
    view:{
        marginTop:YITU.space_3,
        paddingLeft:YITU.space_3,
        paddingRight:YITU.space_3,
        paddingTop:YITU.space_2,
        paddingBottom:YITU.space_2,
        backgroundColor:'white',
        flexDirection:'row',
    },
    button:{
        paddingLeft:YITU.space_3,
        paddingRight:YITU.space_3,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:YITU.backgroundColor_3,
        height: 35,
        borderRadius: 35/2,
    },
    nextButton:{
        paddingTop:YITU.space_3,
        paddingBottom:YITU.space_3,
        backgroundColor:YITU.backgroundColor_3,
        marginTop:YITU.space_7,
        width:'90%',
        alignSelf:'center',
        borderRadius:YITU.radius_1,
    },
    mark:{
        marginTop:YITU.space_7,
        width:'85%',
        alignSelf:'center',
        textAlign:'left',
        color:YITU.textColor_2,
        fontSize:YITU.fontSize_15,
    }
});
