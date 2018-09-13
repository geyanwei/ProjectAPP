import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import MyButton from "../../component/MyButton.js";
import {PageView, navigation, AppInit} from 'myapplib';

class RegisterSuccess extends Component {
    constructor(props){
        super(props);

    }
    render() {
        let main = (
            <ScrollView style={[styles.main]}
                        scrollEnabled={false}>
                <View style={{
                    paddingVertical: 40,
                    alignItems: "center",
                    backgroundColor: YITU.backgroundColor_0
                }}>
                    <Image
                        resizeMode={"contain"}
                        style={{
                            alignSelf: "center",
                            width: 100,
                            height: 100,
                        }} source={require('../../image/login/success_icon.png')}/>
                    <Text style={{
                        textAlign: "center",
                        marginTop: YITU.space_9,
                        color: YITU.textColor_0,
                        fontSize: YITU.fontSize_8
                    }}>恭喜您，注册成功</Text>
                    <Text style={{
                        textAlign: "center",
                        marginTop: YITU.space_5,
                        color: YITU.textColor_2,
                        fontSize: YITU.fontSize_15
                    }}>完成司导认证并添加车辆后即可接单</Text>
                </View>

                <MyButton underlayColor={YITU.backgroundColor_11}
                          underlayTxtColor='#FFFFFFf0'
                          style={{
                              marginHorizontal: YITU.space_5,
                              marginTop: YITU.space_9,
                              height: 45,
                              borderRadius: YITU.radius_1,
                              backgroundColor: YITU.backgroundColor_3,
                          }}
                          onPress={() => {
                              navigation.push(this,"GuideIdentification_Enabled", {
                                  title: "司导认证",
                                  type:1
                              });
                          }}>立即认证
                </MyButton>
            </ScrollView>);
        return  (
            <PageView
                ref={(ref)=>{
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this,{
                    pageLoading:false,
                    barConfig:this.navBar(),
                })}>
                {main}
            </PageView>
        );
    }

    navBar() {
        return {
            showLeftButton:false,
            rightButtonText: "完成",
            rightButtonFunc: () => {
                navigation.push(this, "Main");
            }
        }
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
});

module.exports = RegisterSuccess;
