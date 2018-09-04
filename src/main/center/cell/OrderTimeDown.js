import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class TimeDown extends Component {

    constructor(props) {
        super(props);
        let show = this.firstLoading(this.props.time);
        this.state = {
            timeDown: this.props.time,
            show: show,
        };
    }

    firstLoading(time) {
        let show = false; //判断是否显示
        if (time && time > 0) {
            show = true;
        }
        return show;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.time !== nextProps.time) {
            if (nextProps.time >= 0) {
                let show = !!this.firstLoading(nextProps.time);
                this.setState({
                    timeDown: nextProps.time,
                    show: show
                }, () => {
                    clearInterval(this.timer);
                    this.start();
                })
            } else {
                this.setState({
                    show: false
                })
            }
        }
    }

    addZero(number) {
        if (number < 10) {
            return "0" + number;
        }
        return number;
    }

    componentDidMount() {
        this.start()
    }

    changeData(time) {
        let data = {};
        ////计算时间
        let oSec = parseInt(time / 1000);
        //秒转换成天
        let oDay = parseInt(oSec / 86400);
        //不到一天剩下的秒数;
        oSec %= 86400;
        //转换成小时
        let oHour = parseInt(oSec / 3600);
        //不到一小时剩下的秒数;
        oSec %= 3600;
        //转换成分钟
        let oMin = parseInt(oSec / 60);
        //不到一分钟剩下的秒数;
        oSec %= 60;

        data.oDay = oDay;
        data.oHour = oHour;
        data.oMin = oMin;
        data.oSec = oSec;

        return data;
    }

    timeDownTime(data) {
        let time = "";
        if (data) {
            if (data.oHour) {
                time = time + data.oHour + ":" + this.addZero(data.oMin) + ":" + this.addZero(data.oSec) + "";
            } else if (data.oMin) {
                time = time + this.addZero(data.oMin) + ":" + this.addZero(data.oSec) + "";
            } else {
                time = "00:" + time + this.addZero(data.oSec) + "";
            }
        }
        return time;
    }

    start() {
        if (!isNaN(this.state.timeDown)) {
            if (this.state.timeDown > 0) {
                //为了精确倒计时，做时间补偿
                this.startTime = new Date().getTime();
                this.count = 0;
                this.timeDown();
            } else {
                if (this.props.callBack) {
                    this.props.callBack()
                }
            }
        }
    }

    timeDown() {
        let offset = new Date().getTime() - (this.startTime + this.count * 1000);
        this.count++;
        let nextTime = 1000 - offset;
        if (nextTime < 0) nextTime = 0;
        if (this.state.timeDown > 0) {
            this.setState({
                timeDown: this.state.timeDown - 1000,
                show: true
            }, () => {
                this.timer = setTimeout(() => this.timeDown(), nextTime);
            })
        } else {
            this.timer && clearInterval(this.timer);
            if (this.props.callBack) {
                this.props.callBack()
            }
        }


    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    render() {
        return (
            this.state.show && this.state.timeDown >= 0 ?
                <Text style={this.props.style}>{this.timeDownTime(this.changeData(this.state.timeDown))}</Text> : null
        )
    }
}

module.exports = TimeDown;

