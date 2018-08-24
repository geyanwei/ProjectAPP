/**
 * Created by lixifeng on 17/7/4.
 */
module.exports = {


    getTime(yyyymm){
        var ym = "无日期";
        if (yyyymm) {

            let obj = yyyymm.toString();
            var year = obj.substring(0, 4);
            var month = obj.substring(4, obj.lenght);
            ym = (year + "年" + month + "月");
        }
        return ym;
    },

    createDateData(currenttime, min , max) {
          let starttime=typeof(min)==="string"?min.split(","):this.getDatedifference(min);
       let endtime=typeof(max)==="string"?max.split(","):this.getDatedifference(max);
       let pickerData =this.getjson(starttime,endtime)
       let arr = typeof(currenttime)==="string"?currenttime.split(","):this.getDatedifference(currenttime);
       let selectedValue=Array.from({'0':arr[0]+'年','1':arr[1]+'月','2':arr[2]+'日',length:3})
       return {
           pickerData,selectedValue
       }
    },
    getDatedifference (min) {
        if(!min instanceof Date){
            return
        }
        let Day = min.getDate();
        let Month =min.getMonth()+1;           //当前月
        let Year = min.getYear();             //当前年   
        Year += (Year < 2000) ? 1900 : 0;  // 
        let ymd = Array.from({'0':Year,'1':Month,'2':Day,length:3})
        return ymd
    },
    getjson (starttime, endtime) {
        let date=[];
         let start=starttime.map(function(x){
               return parseInt(x,10);
             });
        let end=endtime.map(function(x){
               return parseInt(x,10);
            });
        for(let i=start[0];i<end[0]+1;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(i===start[0]&&j<start[1]){
                            continue;
                }
                if(i===end[0]&&j>end[1]){
                            continue;
                }
                if(j===2){
                    for(let k=1;k<29;k++){
                        if(i===start[0]&&j===start[1]&&k<start[2]){
                                continue
                        }
                        if(i===end[0]&&j===end[1]&&k>end[2]){
                                continue
                        }
                        day.push(k+'日');
                    }
                    if(i%4 === 0){
                        if(i===start[0]&&j===start[1]&&k<start[2]){
                                continue
                        }
                        if(i===end[0]&&j===end[1]&&k>end[2]){
                                continue
                        }
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        if(i===start[0]&&j===start[1]&&k<start[2]){
                                continue
                        }
                        if(i===end[0]&&j===end[1]&&k>end[2]){
                                continue
                        }
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        if (i === start[0] && j === start[1] && k < start[2]) {
                            continue
                        }
                        if (i === end[0] && j === end[1] && k > end[2]) {
                            continue
                        }
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    },

    getMobileObj(phone){
        if(!phone||phone==""){
            return {
                mobileArea:"",
                mobile:""
            }
        }
        let obj = {};
        let arr = phone.split("-");
        if (arr.length>1){
            obj = {
                mobileArea:arr[0],
                mobile:arr[1],
            }
        }else {
            obj = {
                mobileArea:"",
                mobile:arr[0],
            }
        }
        return obj;
    },
    //手机号分组
    getMobileGroup(val){
        if (!val||val==""){
            return "";
        }
        //对处理过的数据进行分组 3 4 4 格式等
        let textArr=[];
        textArr.push(val.substring(0,3));
        val = val.substring(3,val.length);

        //判断循环多少次 即分为几组
        let num = val?(val.length%4==0?parseInt(val.length/4):parseInt(val.length/4) +1):0;
        for(let i=0;i<num;i++){
            textArr.push(val.substring(i*4,(i+1)*4));
        }
        let t = textArr.join(" ");
        return t.substring(0,t.length);
    },

    formatH5PageURL(url,data){
        let dataString = JSON.stringify(data);
        let ecodUrl = encodeURIComponent(dataString);
        let combUrl = url +'?'+ ecodUrl;
        return combUrl;
    }
}