import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const TIME = 60;

class TimeDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time || TIME,
            phoneNumber:""
        };
        this.isFirst = true;
    }

    sendMessage(callback) {
        if (this.props.func) {
            this.props.func(callback);
        }
    }

    setPhoneNumber(phoneNumber) {
        this.setState({
            phoneNumber:phoneNumber
        });
    }

    timeDown() {
        // if (!/^(\+?0?86-?)?1\d{10}$/.test(this.props.phoneNumber || this.PhoneNumber)) {
        //     this.props.obj.showToast("请输入正确的手机号");
        //     return;
        // }
        this.sendMessage(() => {
            this.setState({
                time: this.state.time - 1
            }, () => {
                this.timer && clearInterval(this.timer);
                this.timer = undefined;
                this.timer = setInterval(() => {
                    if (this.state.time === 0) {
                        this.isFirst = false;
                        this.setState({
                            time: TIME
                        }, () => {
                            this.timer && clearInterval(this.timer);
                            this.timer = undefined;
                        })
                    } else {
                        this.setState({

                            time: this.state.time - 1
                        })
                    }
                }, 1000)
            })
        });


    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render() {
        let {phoneNumber,time} = this.state;
        let isNull = !phoneNumber||phoneNumber=="";
        let main = (
            time === TIME ?
                <TouchableOpacity
                    disabled={isNull}
                    onPress={() => {
                        this.timeDown();
                    }}
                    style={[this.props.style, {
                        backgroundColor:isNull?YITU.backgroundColor_4:YITU.backgroundColor_3,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }]}>
                    <Text style={{color: "#fff", fontSize: 15}}>{this.isFirst?"获取验证码":"重发验证码"}</Text>
                </TouchableOpacity> :
                <View
                    style={[this.props.style, {
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#c0c0c0',
                    }]}>
                    <Text style={[{color: "#fff", fontSize: 15,}]}>{"已发送 "+"("+ this.state.time+"s)"}</Text>
                </View>
        );
        return main;
    }
}

const styles = StyleSheet.create({});

module.exports = TimeDown;
