import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

class CarDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data||{},
        };
    }

    setData(data) {
        this.setState({
            data: data
        });
    }

    render() {
        let {data} = this.state;
        return (<View style={{
            marginTop:YITU.space_8,
            width:"100%",
            justifyContent:"center",
            alignItems: "center"
        }}>
            <Text style={{
                color:YITU.textColor_1,
                fontWeight:"bold",
                fontSize:YITU.fontSize_6,
            }}>{data.carType}</Text>
            <View style={{marginVertical:YITU.space_1, flexDirection:"row", alignItems:"center"}}>
                <Image
                    resizeMode={"contain"}
                    style={{width:18,height:18}}
                       source={require("../../../../../image/userIcon/grzx-zhaq.png")}/>
                <Text style={{marginLeft:2,color:YITU.textColor_2}}>{"X"+data.personNum}</Text>
                <Image
                    resizeMode={"contain"}
                    style={{marginLeft:YITU.space_6,width:18,height:18}}
                    source={require("../../../../../image/userIcon/grzx-zhaq.png")}/>
                <Text style={{marginLeft:2,color:YITU.textColor_2}}>{"X"+data.luggageNum}</Text>
            </View>
            <Text style={{marginLeft:2,color:YITU.textColor_2}}>{data.brand}</Text>
        </View>);
    }
}

module.exports = CarDetail;


const styles = StyleSheet.create({});