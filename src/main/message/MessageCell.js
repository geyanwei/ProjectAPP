import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    DeviceEventEmitter
} from 'react-native';

class MessageCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {

    }

    render() {
        let {data, serviceMessage} = this.props;

        let noReadView = data.unreadNum > 0 ? (<View style={{
            width: data.unreadNum > 9 ? 22 : 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: YITU.textColor_warn,
            marginTop: YITU.space_2,
            justifyContent: 'center',
            alignItems:'center'
        }}>
            <Text style={{
                color: YITU.c_title_white,
                fontSize: YITU.fontSize_2,
                alignSelf:'center',
                // fontFamily: YITU.fontName_regular,
                backgroundColor: YITU.backgroundColor_clear,
            }}
                  numberOfLines={1}
            >
                {data.unreadNum > 99 ? "···" : data.unreadNum}
            </Text>
        </View>) : <View style={{height: YITU.space_7}}/>;
        let main = (
                <View style={styles.main}>
                    <Image style={styles.image}
                           defaultSource={data.imageSource}
                           source={data.imageSource}
                    >
                    </Image>

                    <View style={{flex:1, marginLeft: YITU.space_5,}}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text numberOfLines={1} style={styles.content}>{serviceMessage? serviceMessage.content:data.content}</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text  style={[styles.content, { right:0,bottom:0}]}>{serviceMessage? serviceMessage.date:data.time}</Text>
                        {noReadView}
                    </View>
                </View>
            )
        ;
        return main;
    }
}

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: YITU.space_5,
        paddingVertical: YITU.space_6,
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        height:80,
    },
    image: {
        width: 35,
        height: 35,
    },
    title: {
        color: YITU.textColor_1,
        fontSize: YITU.space_5,
        marginBottom: YITU.space_1,
    },
    content: {
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_2
    },


});

module.exports = MessageCell;
