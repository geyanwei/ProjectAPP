/**
 *  当以下参数都不传的时候显示当前年月日
 *  onSelectDate 回调函数 返回 年 月 日 旬
 *  current_Y_M_D 传入的当前年月日 eg:2018-1-1
 *  showDay 传入的指定要显示的年月日 eg:2018-1-1
 */
import React, {Component,} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import CalendarHelp from './CalendarHelp';
const screenWith = Dimensions.get('window').width;
class CellCalendar extends Component {
    constructor(props) {
        super(props);
        this.myArr=[{
            index:"-1",title:"上旬",i:1,isClick:true
        },{
            index:"-2",title:"中旬",i:2,isClick:true
        },{
            index:"-3",title:"下旬",i:3,isClick:true
        }];
        //用于记录日期，显示的时候，根据dateObj中的日期的年月显示
        this.state = {
            isSelXun:props.showXun&&props.showXun.i?props.showXun.i:-1,
            current_year : CalendarHelp.getFullYear(),
            current_month : CalendarHelp.getMonth(),
            current_day : CalendarHelp.getDate(),
            select_year : CalendarHelp.getFullYear(),
            select_month : CalendarHelp.getMonth(),
            select_day : CalendarHelp.getDate(),
            history_year : undefined,
            history_month : undefined,
            history_day : undefined,
            date_num_array : [],
            current_Y_M_D:"",
            showDay:"",
        };
    }
    /**
     * 组件渲染完后执行
     */
    componentDidMount() {
        let {current_Y_M_D,showDay,noBeforeClickDate,showXun} = this.props;

        let time_start = this.formatDate(noBeforeClickDate).getTime();

        this.noBeforeTimestamp = noBeforeClickDate?time_start:"";
        //终止时间是365天减14天(两头挂) 暂不减
        this.noAfterTimestamp = time_start+365*3600*24*1000;

        let showYMD_Arr = showDay?showDay.split("-"):"";
        this.showYear = showYMD_Arr[0]?parseInt(showYMD_Arr[0]):"";
        this.showMonth = showYMD_Arr[1]?parseInt(showYMD_Arr[1]):"";
        this.showDay = showYMD_Arr[2]?parseInt(showYMD_Arr[2]):0;

        //当前被选中的时间
        this.curTimestamp = showDay?this.formatDate(this.showYear+"-"+this.showMonth+"-"+this.showDay).getTime():"";
        this.initYMD(current_Y_M_D);
    }
    initYMD(current_Y_M_D){
        // 初始化状态
        let YMD_Arr = current_Y_M_D.split("-");
        let year = YMD_Arr[0]?YMD_Arr[0]:"";
        let month = YMD_Arr[1]?YMD_Arr[1]:"";
        let day = YMD_Arr[2]?YMD_Arr[2]:0;
        if(year && month) {
            year = parseInt(year);
            month = parseInt(month);
            day = day?parseInt(day):0;
            let date_num_array = this._initMonthDayNumber(year);
            let first_day = CalendarHelp.weekOfMonth(new Date(year, month - 1));

            let date = new Date(year,(month - 1),date_num_array[month - 1]);
            let last_day = date.getDay();

            this.setState({
                select_year : year,
                select_month : month - 1,
                select_day : day,
                history_year : year,
                history_month : month - 1,
                history_day : day,
                date_num_array : date_num_array,
                first_day : first_day,
                last_day : last_day,
            });
        }
    }
    /**
     * 给月份数组附上每月天数
     * @param year 年份
     * @private
     */
    _initMonthDayNumber(year) {
        let _date_array = [];
        for (let i = 0; i < 12; i++) {
            switch (i + 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    _date_array.push(31);
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    _date_array.push(30);
                    break;
                case 2:
                    if (CalendarHelp.isLeapYear(year)) {
                        _date_array.push(29);
                    } else {
                        _date_array.push(28);
                    }
                    break;
                default:
                    break;
            }
        }
        return _date_array;
    }

    /**
     * 日期选择
     * @param s_day
     */
    selectDate(s_day) {
        let {select_year, select_month,} = this.state;
        this.setState({
            history_year : select_year,
            history_month : select_month,
            history_day : s_day,
            select_day : s_day,
            isSelXun:-1
        }, () => {
            if (this.props.onSelectDate){
                this.props.onSelectDate(select_year, select_month +1 , s_day,{});
            }
        });
    }

    /**
     * 渲染页面
     */
    render() {
        let {current_year, current_month, current_day,
            select_year, select_month, select_day,
            history_year, history_month, history_day,
            date_num_array, first_day,last_day} = this.state;

        let month_day = date_num_array[select_month],
            previous_month_days = undefined,
            previous_days = [],
            current_days = [],
            next_days = [],
            total_days = [],
            previous_month = undefined;

        if (select_month === 0) {
            previous_month = 11;
        } else {
            previous_month = select_month - 1;
        }

        previous_month_days = date_num_array[previous_month];
        //在本月之前的
        for (let i = 0; i < first_day; i++) {
            let itemView =
                (<View key={'previousItem'+i}
                       style={[styles.itemActive,{backgroundColor:YITU.backgroundColor_1}]}>
                    <Text style={[styles.dayTitle,{color:YITU.textColor_5}]}>
                        {previous_month_days - (first_day - i) + 1}
                    </Text>
                </View>);
            previous_days.push(itemView);
        }

        //在本月当中的
        let currentClassName = '',
            currentText = '';
        let itemView = null;
        for (let i = 0; i < month_day; i++) {
            // 今天样式
            if (current_year == select_year && current_month == select_month && current_day == (i + 1)) {
                currentText = '今天';
            } else {
                currentText = i + 1;
            }
            currentClassName = styles.itemActive;
            itemView = (<View key={'currentItem'+i} style={currentClassName}>
                <Text numberOfLines={1} style={styles.dayTitle}>{currentText}</Text>
            </View>);

            let selectDate=select_year+"-"+(select_month+1)+"-"+(i+1);
            let selectDateStamp = this.formatDate(selectDate).getTime();
            let isBeforeBool = selectDateStamp>=this.noBeforeTimestamp;
            let isAfterBool = (selectDateStamp<this.noAfterTimestamp)||!this.noAfterTimestamp;
            if (isBeforeBool &&isAfterBool){
                // 判断选择样式与历史样式是否相等，相等激活
                let isSelect = (this.showYear==select_year&&this.showMonth==(select_month+1)&&this.showDay==(i+1));
                currentClassName = [styles.itemActive,{backgroundColor:isSelect?YITU.backgroundColor_3:YITU.backgroundColor_white,}];
                itemView = (<TouchableOpacity
                    style={currentClassName}
                    key={'currentItemTag'+i}
                    onPress={()=>{
                        this.selectDate(i + 1);
                    }}>
                    <Text style={[styles.dayTitle,{color:isSelect?YITU.c_title_white:YITU.textColor_1}]}>
                        {currentText}
                    </Text>
                </TouchableOpacity>);
            }
            current_days.push(itemView);
        }

        //紧随本月之后的
        let last = 7-(last_day+1);
        for (let i = 0; i < last; i++) {
            let itemView = (
                <View key={"after"+i} style={[styles.itemActive,{backgroundColor:YITU.backgroundColor_1,}]} >
                    {/*<Text style={[styles.dayTitle,{color:YITU.c_title_white}]}>{i + 1}</Text>*/}
                </View>);
            next_days.push(itemView);
        }

        total_days = previous_days.concat(current_days, next_days);
        let row_number = total_days.length/7;
        let ul_list = [];
        if (total_days.length > 0) {
            for (let i = 0; i < row_number; i++) {
                let li_list = [],
                    start_index = i * 7,
                    end_index = (i + 1) * 7;
                for (let j = start_index; j < end_index; j++) {
                    li_list.push(total_days[j]);
                }
                ul_list.push(li_list);
            }
        }

        return (
            <View style={styles.calendar}>
                <View style={styles.xunCell}>
                    <Text style={{
                        flex:1,
                        color:YITU.textColor_5,
                        fontSize:YITU.fontSize_5,
                    }}>{select_year+"年"+(select_month+1)+"月"}</Text>
                    <View style={styles.xunBg}>
                        {this.createXun()}
                    </View>
                </View>
                <View style={{flex:1,backgroundColor:YITU.backgroundColor_0}}>
                    {
                        ul_list.map((u, index) => {
                            return (<View key={'ul'+index} style={{flex:1,flexDirection:"row"}}>{u}</View>);
                        })
                    }
                </View>
            </View>
        );
    }

    createXun(){
        let {select_year, select_month, isSelXun} = this.state;

        //小于于最小值不能点的旬
        let beforeDate = new Date(this.noBeforeTimestamp);
        let beforeDateY = beforeDate.getFullYear();
        let beforeDateM = beforeDate.getMonth();
        let beforeDateD = beforeDate.getDate();
        let isCurMinY_M = (select_year==beforeDateY&&select_month==beforeDateM);
        if (isCurMinY_M&&beforeDateD>10){
            this.myArr[0].isClick = false;
            this.myArr[1].isClick = false;
        }


        //大于最大值不能点的旬
        let afterDate = new Date(this.noAfterTimestamp);
        let afterDateY = afterDate.getFullYear();
        let afterDateM = afterDate.getMonth();
        let afterDateD = afterDate.getDate();
        let isCurMaxY_M = (select_year==afterDateY&&select_month==afterDateM);
        if (isCurMaxY_M&&afterDateD<21){
            this.myArr[2].isClick = false
        }
        if (isCurMaxY_M&&afterDateD<11){
            this.myArr[1].isClick = false
        }

        let isShow = (select_year==this.showYear)&&((select_month+1)==this.showMonth);
        return this.myArr.map((item, index) => {
            return (<TouchableOpacity
                key={index}
                onPress={()=>{
                    if (!item.isClick){
                        return;
                    }
                    this.showDay=0;
                    this.setState({
                        isSelXun:index+1,
                    },()=>{
                        if (this.props.onSelectDate){
                            this.props.onSelectDate(select_year, select_month +1 , "",item);
                        }
                    });
                }}
                style={[styles.xunItem,{
                    backgroundColor:
                        !item.isClick?
                            YITU.backgroundColor_0
                            :
                            ((isSelXun==(index+1)&&isShow)?
                                YITU.backgroundColor_3
                                :
                                YITU.backgroundColor_0)}]}>
                <Text style={{
                    fontSize:YITU.fontSize_3,
                    color: !item.isClick?
                        YITU.textColor_2
                            :
                            ((isSelXun==(index+1)&&isShow)?
                                YITU.c_title_white
                                :
                                YITU.textColor_5),
                }}>{item.title}</Text>
            </TouchableOpacity>);
        })
    }

    formatDate(str){
        let arr = str.split("-");
        return new Date(arr[0],arr[1]-1,arr[2]);

    }
}
module.exports = CellCalendar;



const  height_item = (screenWith/7)*1.15;
let styles = StyleSheet.create({
    calendar:{
        flex:1,
        borderColor:YITU.backgroundColor_Line
    },
    xunCell:{
        flex:1,
        flexDirection:"row",
        paddingVertical:YITU.space_5,
        paddingHorizontal:YITU.space_2,
        backgroundColor:YITU.backgroundColor_2,
        alignItems:"center",
        justifyContent:"center",
    },
    xunBg:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    xunItem:{
        flex:1,
        alignItems:"center",
        marginHorizontal:YITU.space_0,
        paddingVertical:YITU.space_0,
        borderRadius:YITU.radius_2,
    },
    itemActive:{
        flex:1,
        height: height_item,
        backgroundColor:YITU.backgroundColor_0,
        alignItems:"center",
        justifyContent:"center",
    },
    dayTitle:{
        color: YITU.textColor_2,
        textAlign:"center",
        fontSize:YITU.fontSize_5
    },
});