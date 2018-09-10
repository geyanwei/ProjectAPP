/**
 * Created by 葛艳威 on 2018/09/07.
 */
import {NativeModules,} from 'react-native';

module.exports = {
    myShearHelp(typeNum) {
        NativeModules.sharemodule && NativeModules.sharemodule.share(
            "分享",
            "描述",
            "http://www.baidu.com",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536239718267&di=9f11f02b01a31e337b3a5896bc3b37de&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011d1159784366a8012193a3e7da5c.jpg%401280w_1l_2o_100sh.jpg",
            typeNum||1,
            (msg)=>{
                alert(msg);
        })
    }
};