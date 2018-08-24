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


class ActivityMessageCell extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let {data,onPress,disabled} = this.props;
        if (!data.params.parame) {
            data.params.parame = {}
        }
        let image = data.params.parame.icon;
        let footer =  (<View>
            <View style={styles.line}/>
            <Image style={styles.mainImage}
                   defaultSource={require('../../../image/message/xxzx-activity.png')}
                   source={image ? {uri:image}:require('../../../image/message/xxzx-activity.png')}
            >
            </Image>
            <Text style={styles.content}>
                {data.content}
            </Text>
        </View>);

        let view=(<View style={styles.container}>

            <Text style={styles.time}>
                {data.createdTime}
            </Text>
            <SelectCell style={styles.view} onPress={onPress} disabled={disabled}>
            <View>
            <View style={{backgroundColor:YITU.backgroundColor_0, flexDirection:'row'}}>
                <Text style={styles.look}>
                    {data.title}
                </Text>
                <Image style={styles.image}
                       source={require('../../../image/message/MessageRightImage.png')}/>
            </View>
                {footer}
            </View>
            </SelectCell>
        </View>);

        return view;

    }

}

module.exports = ActivityMessageCell;
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
        backgroundColor:'white',
        borderRadius:4,
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
        marginTop:YITU.space_2,
        height:0.5,
        width:'100%',
        backgroundColor:YITU.backgroundColor_Line,
        marginBottom:YITU.space_2,
    },
    look:{
        flex:1,
        fontSize:YITU.fontSize_4,
        color:'black',
    },
    image:{
        width:10,
        height:17,

    },
    mainImage:{
        height:130,
        width:'100%',
    }

});
