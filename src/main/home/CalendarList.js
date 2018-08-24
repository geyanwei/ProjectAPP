import React, {Component,} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import MyEtcListView from '../../component/ListView/MyFlatList.js';
import EmptyView from '../../component/EmptyView.js';
import LinearGradientLine from './component/calendar/LinearGradientLine.js';
import CalendarHelp  from './component/calendar/CalendarHelp.js';
import CellCalendar from './component/calendar/CellCalendar.js'
import {navigation, PageView} from "myapplib";
class CalendarList extends Component {
    constructor(props) {
        super(props);
        this.state=({
            isCurCalendar:0,
        });
        let dayObj = props.myValue;
        this.showDay = (dayObj.dep_yyyy?dayObj.dep_yyyy:0)+"-"
            +(dayObj.dep_mm?dayObj.dep_mm:0)+"-"
            +(dayObj.dep_dd?dayObj.dep_dd:0);
        this.showXun = dayObj?dayObj.obj:{};

        this.minDate = this.getDateStr(1).value;

        this.list = this.getLast12Months(this.getDateStr(1).date);
        // this.list=[
        //     "2018-01","2018-02","2018-03","2018-04",
        //     "2018-05","2018-06","2018-07","2018-08",
        //     "2018-09","2018-10","2018-11","2018-12",];
    }
    //获取昨天\今天\明天及以后的时间 -1是昨天 0是今天 1 2 3 4 5
    getDateStr(AddDayCount) {
        let dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        let y = dd.getFullYear();
        let m = dd.getMonth()+1;//获取当前月份的日期
        let d = dd.getDate();
        return {
            value:y+"-"+m+"-"+d,
            date:dd
        };
    }

    //获取last12个月
    getLast12Months(today){
        let last12_Or13Months = [];
        //验证指定时间是不是本月的最后一天 如果不是则添加一个月(13个月) 否则显示12个月
        let curDay = today.getDate();
        let myDay = CalendarHelp.getDays(today.getFullYear,today.getMonth()+1);
        let centerDate = (myDay==31?16:15);
        for(let i=0;i<12;i++){
            last12_Or13Months.push((today.getFullYear()) + "-" + (today.getMonth()+1));
            today.setDate(1);
            today.setMonth(today.getMonth()+1);
            if ((curDay>centerDate)&&i==11){
                last12_Or13Months.push((today.getFullYear()) + "-" + (today.getMonth()+1));
                this.maxDate = last12_Or13Months[12];
                today.setDate(1);
                today.setMonth(today.getMonth()+1);
            }
        }
        return last12_Or13Months;
    }

    componentDidMount() {

    }

    _renderRowView(rowData) {
        let item = rowData.item;
        return (
            <CellCalendar
                onSelectDate={(select_year, select_month , select_day,xunObj)=>{
                    this.selectDate(select_year, select_month, select_day,xunObj);
                }}
                noBeforeClickDate={this.minDate}
                noAfterClickDate={this.maxDate}
                current_Y_M_D={item}
                showDay={this.showDay}
                showXun={this.showXun}
            />);
    }

    _onFetch(page = 0, callback) {
        callback(this.list.slice(2*(page-1),page*2), {
            allLoaded: page*2>=this.list.length, //显示结束的底部样式,由你来控制
        });
    }
    render() {
        var main = (<View style={{flex: 1,backgroundColor:YITU.backgroundColor_1}}>
            <View style={styles.cBodyHead}>
                {this.createWeekItem()}
            </View>
            <LinearGradientLine/>

            <View style={{flex:1,backgroundColor:YITU.backgroundColor_1}}>
                <MyEtcListView
                    startLoad={false}
                    style={{}}
                    rowView={this._renderRowView.bind(this)}//每行显示
                    onFetch={(page = 0, callback, options) => {
                        this._onFetch(page, callback, options);
                    }}//抓取数据
                    ref={(lv) => {
                        this.listView = lv;
                    }}
                    emptyView={(refreshCallback) => {
                        return (
                            <EmptyView
                                data={{
                                    source: require('../../image/order/empty.png'),
                                    desc: "当前暂无数据",
                                }}/>
                        );
                    }}
                />
            </View>
        </View>);

        return (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                navBack: () => {
                    navigation.pop(this);
                },
                pageLoading: false,
            })}>
            {main}
        </PageView>);
    }
    selectDate(year, month, day,xunObj){
        let date = {
            dep_yyyy:year,
            dep_mm:month.toString().length<2?("0"+month.toString()):month.toString(),
            dep_dd:day,
            obj:xunObj?xunObj:{},
        };
        this.props.callBack(date);
        navigation.pop(this);
    }
    createWeekItem(){
        return ["日","一","二","三","四","五","六"].map((title,index)=>{
            return (<Text style={styles.cBodyItem} key={index}>{title}</Text>)
        });
    }
}
module.exports = CalendarList;

let styles = StyleSheet.create({
    cBodyHead:{
        backgroundColor: YITU.backgroundColor_0,
        flexDirection:"row",
        paddingVertical:YITU.space_5,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:YITU.backgroundColor_Line,
    },
    cBodyItem:{
        flex: 1,
        borderWidth: 0,
        textAlign: "center",
        color:YITU.textColor_3,
        fontSize:YITU.fontSize_3
    },
});

