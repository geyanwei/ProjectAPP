import React, {Component,Props} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';

class CellTicket extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {data}=this.props;
        let view = (<ImageBackground style={styles.image}
                                     resizeMode={"stretch"}
                                     source={data.status===1?require('../../../image/user/yhq-5.png'):require('../../../image/user/yhq-10.png')}>
            <View style={styles.moneyView}>
                <Text style={styles.money}>{"¥"+(data.amount||0)}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>
                    {data.name}
                </Text>
                <Text style={styles.type}>
                    {"•" + data.productTypeDescription}
                </Text>
                <Text style={styles.type}>
                    {"•" + "全球所有城市"}
                </Text>
                <View style={{flexDirection:"row",}}>
                    <Text style={styles.type}>
                        {"•"  +data.expireTime+ "到期"}
                    </Text>
                    {data&&data.status==3?<Text style={[styles.type,{color:YITU.textColor_adorn}]}>{"  (已过期)"}</Text>:null}
                </View>
            </View>
        </ImageBackground>);

          return  view;

    }



}

module.exports = CellTicket;

const styles=StyleSheet.create({

    image:{
        flex:1,
        marginTop:YITU.space_5,
        width:'95%',
        // backgroundColor:'blue',
        height:110,
        flexDirection:'row',
        alignSelf:'center',
    },
    moneyView:{
        // flex:1,
        justifyContent:'center',
        // backgroundColor:'skyblue',
        width:'42%',
    },
    money:{
        color:YITU.textColor_2,
        marginLeft:YITU.space_5*2,
        fontSize:YITU.fontSize_16,
        backgroundColor:'white',
    },
    content:{
        // backgroundColor:'black',
        width:'58%',
        justifyContent:'center',
        backgroundColor:'white',
        // flex:2,
    },
    name:{
        color:YITU.textColor_2,
        fontSize:YITU.fontSize_3,
        backgroundColor:'white',
    },
    type:{
        color:YITU.textColor_2,
        marginTop:YITU.space_1,
        fontSize:YITU.fontSize_1,
        backgroundColor:'white',
    }


});

