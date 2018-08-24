import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import SelectCell from '../../../component/SelectCell.js'

class OrderMessageCell extends Component{
    constructor(props){
        super(props)
    }




    render(){

        let {data,onPress,disabled} = this.props;
        let params=data.params;
        let footer = params && params.path && params.isClick ? (<View style={{borderBottomLeftRadius:4,borderBottomRightRadius:4}}>
            <View style={styles.line}/>
            <View style={{flexDirection:'row',paddingHorizontal:YITU.space_3,paddingBottom:YITU.space_3,borderBottomLeftRadius:4,borderBottomRightRadius:4 }}>
                <Text style={styles.look}>
                    点击进入行程查看
                </Text>
                <Image style={styles.image}
                       source={require('../../../image/message/MessageRightImage.png')}
                >
                </Image>
            </View>
        </View>) : null;

        let view=(<View style={styles.container}>
            <Text style={styles.time}>
                {data.createdTime}
            </Text>
                <SelectCell style={{backgroundColor:YITU.backgroundColor_0}} onPress={onPress} disabled={disabled}>
                <View >
                    <View style={[styles.view,{borderBottomLeftRadius:params && params.path?0:4, borderBottomRightRadius:params && params.path?0:4}]}>
                        <Text style={styles.type}>
                            {data.title}
                        </Text>
                        <Text style={styles.content}>
                            {data.content}
                        </Text>
                    </View>
                    {footer}
                </View>
                </SelectCell>
            </View>

    );
        return view;

    }

}

module.exports = OrderMessageCell;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:YITU.space_2,
        backgroundColor: YITU.backgroundColor_1,
    },
    time:{
        color:YITU.textColor_2,
        fontSize:YITU.fontSize_3,
        alignSelf:'center',
        marginBottom:YITU.space_2,
    },
    view:{
        // backgroundColor:YITU.backgroundColor_0,
        borderRadius:YITU.radius_1,
        borderTopLeftRadius:YITU.radius_1,
        borderTopRightRadius:YITU.radius_1,
        padding:YITU.space_3,
    },
    type:{
        color:'black',
        fontSize:YITU.fontSize_4,
    },
    content:{
        marginTop:YITU.space_4,
        color:YITU.textColor_2,
        fontSize:YITU.fontSize_4,
    },
    line:{
        height:0.5,
        width:'100%',
        backgroundColor:YITU.backgroundColor_Line,
        marginBottom:YITU.space_2,
    },
    look:{
        flex:1,
        fontSize:YITU.fontSize_4,
        color:YITU.textColor_0,
    },
    image:{
        width:10,
        height:17,

    },
});
