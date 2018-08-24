import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

class ErrorPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {callBack} = this.props;
        return (<View style={{position:"absolute",top:0,left:0,bottom:0,right:0,
                backgroundColor:YITU.backgroundColor_0,justifyContent:"center",alignItems:"center"}}>
                <Image resizeMode={"contain"}
                       style={{marginTop:-50,width:120,height:120,}}
                       source={require('../../../image/login/logo.png')}/>

                <Text style={{marginTop:YITU.space_6,color:YITU.textColor_2,fontSize:YITU.fontSize_4}}>抱歉，出错了</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        marginTop:YITU.space_6*2,
                        alignItems: "center",
                        justifyContent:"center",
                        marginHorizontal:YITU.space_5,
                        borderWidth:1,
                        borderColor:YITU.backgroundColor_Line,
                        borderStyle:"solid",
                        borderRadius:YITU.radius_1,
                        height:33,
                        width:163
                    }}
                    onPress={() => {
                        if (callBack) {
                            callBack();
                        }
                    }}
                    >
                    <Text style={{color:YITU.textColor_3,fontSize:YITU.fontSize_4}}>重新加载</Text>
                </TouchableOpacity>
            </View>
            );
    }
}
module.exports = ErrorPage;
