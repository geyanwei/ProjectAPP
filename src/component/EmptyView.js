import React, {Component, PropTypes} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

const screenWith = Dimensions.get('window').width;

class EmptyView extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        let {data, imgStyle, titleStyle} = this.props;

        return (
            <View style={styles.main}>
                <View style={{height:'50%', alignItems:'center'}}>
                    {data && data.source ? <Image

                        style={[styles.image, imgStyle]}
                        source={data.source}/> : null
                    }
                    {data && data.desc ? <Text style={[styles.title,titleStyle]}>{data.desc}</Text> : null}
                </View>

            </View>
        )
    }
}

module.exports = EmptyView;
const styles = StyleSheet.create({
    main: {
        flex:1,
        alignItems: "center",
        justifyContent:'center',
        height:YITU.screenHeight - YITU.navBarHeight,
        backgroundColor:YITU.backgroundColor_1,
    },
    image:{
        marginTop: -20,
        width:185,
        height:417 / 2,
        alignSelf:'center',

        // resizeMode:'contain',
    },
    title:{
        marginTop:10,
        alignSelf:'center',
        color:YITU.textColor_2,
        backgroundColor:YITU.backgroundColor_clear,
        fontSize:YITU.fontSize_4,
        textAlign:'center',
        fontFamily:YITU.fontName_regular,
    },
    desc: {
        backgroundColor: "transparent",
        textAlign: "center",
        color: YITU.textColor_2,
        fontSize: YITU.fontSize_5,
        paddingHorizontal: YITU.space_5
    },
    subDesc: {
        backgroundColor: "transparent",
        textAlign: "center",
        color: YITU.textColor_2,
        fontSize: YITU.fontSize_4,
        marginTop: YITU.space_0,
        paddingHorizontal: YITU.space_5
    },
    btn: {
        borderRadius: YITU.radius_1,
        paddingHorizontal: YITU.space_8,
        paddingVertical: YITU.space_1 + 2,
        backgroundColor: YITU.backgroundColor_3
    },
    btnText: {
        fontSize: YITU.fontSize_4,
        color: YITU.c_title_white,

    }
});
