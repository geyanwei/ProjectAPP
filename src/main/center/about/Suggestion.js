import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    KeyboardAvoidingView,
    TextInput,
    Linking,
} from 'react-native';
import HttpTool from '../../../http/HttpTool.js';
import APIGYW from '../../../http/APIGYW.js';
import MyButton from '../../../component/MyButton.js';
import {PageView, navigation, Loading, Toast} from "myapplib";

class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    httpCommit() {
        Loading.show("提交中...");
        let data = {"content": this.value};
        let successCallback = (code, message, json, option) => {
            Loading.hide();
            Toast.showToast(message);
        };
        let failCallback = (code, message) => {
            Loading.hide();
            Toast.showToast(message);
        };
        HttpTool.post(APIGYW.driver_usercenter_contactUsForDriver, successCallback, failCallback, data);
    }

    communication(url) {
        Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                } else {
                    return Linking.openURL(url);
                }
            }
        ).catch(err => console.error('An error occurred', err));
    }

    render() {
        let view = (<ScrollView style={styles.container}>
            <KeyboardAvoidingView
                behavior={"padding"}
                style={{flex: 1}}
                keyboardVerticalOffset={44}>
                <TextInput style={styles.textView}
                           placeholder={"请您输入您所遇到的问题或修改建议"}
                           multiline={true}
                           underlineColorAndroid={"transparent"}
                           onChangeText={(text) => {
                               this.value = text;
                           }}/>
            </KeyboardAvoidingView>

            <MyButton
                ref={(a) => this.refBtn = a}
                disabled={false}
                underlayColor={YITU.backgroundColor_11}
                underlayTxtColor='#FFFFFFf0'
                noClickedBackgroundColor={YITU.backgroundColor_4}
                onPress={() => {
                    this.httpCommit();
                }}>提交
            </MyButton>


            <Text style={styles.title}>联系我们</Text>
            <View style={styles.bottomView}>
                <View style={[styles.titleView, {marginTop: 15}]}>
                    <Text style={styles.name}>客服电话(国内):</Text>
                    <Text style={[styles.content, {textDecorationLine: 'underline',}]}
                          onPress={() => {
                              this.communication("tel:86-571-28297302")
                          }}>86-571-28297302</Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.name}>客服电话(国内)：</Text>
                    <Text style={[styles.content, {textDecorationLine: 'underline',}]}
                          onPress={() => {
                              this.communication("tel:4000-630-655")
                          }}>4000-630-655</Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.name}>网址：</Text>
                    <Text style={[styles.content, {textDecorationLine: 'underline',}]}
                          onPress={() => {
                              this.communication("http://www.yitu8.cn")
                          }}>www.yitu8.cn</Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.name}>联系地址：</Text>
                    <Text numberOfLines={2}
                          style={[styles.content, {color: YITU.textColor_2}]}>
                        浙江省杭州市滨江区春晓路61号中赢康康谷商业中心1号楼11F
                    </Text>
                </View>
            </View>
        </ScrollView>);

        return (<PageView
            ref={(ref) => this.pageView = ref}
            config={PageView.defaultConfig(this, {
                navBack: () => {
                    navigation.pop(this);
                },
                pageLoading: false,
            })}>
            {view}
        </PageView>);
    }
}


module.exports = Suggestion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    title: {
        marginTop: YITU.space_6,
        marginLeft: YITU.space_5,
        marginBottom: YITU.space_6,
        flex: 1,
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_4,
    },
    textView: {
        marginTop: YITU.space_5,
        height: 160,
        marginHorizontal: YITU.space_5,
        backgroundColor: 'white',
        fontSize: YITU.fontSize_3,
        paddingHorizontal: YITU.space_2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: YITU.backgroundColor_Line,
    },

    bottomView: {
        flex: 1,
        height: 180,
        backgroundColor: 'white',
    },
    titleView: {
        // flex:1,
        // alignItems:'center',
        flexDirection: 'row',
        height: YITU.d_head,
        alignItems: 'flex-start',


    },
    name: {
        marginLeft: YITU.space_5,
        fontSize: YITU.fontSize_14,
        color: YITU.textColor_2,

    },
    content: {
        flex: 1,
        fontSize: YITU.fontSize_14,
        color: 'rgb(67,165,252)',
        paddingRight: YITU.space_5,
    },

});



