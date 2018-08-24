import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

class QueryCharterItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carType: props.carType||"",
        };
    }

    componentDidMount() {

    }

    setCarType(carType) {
        this.setState({
            carType: carType||""
        });
    }

    render() {
        let {myValue} = this.props;
        let {carType} = this.state;
        return (<View style={{
            marginTop: YITU.space_5,
            flex: 1, backgroundColor: YITU.backgroundColor_0,
            padding: YITU.space_5
        }}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{
                    color: YITU.textColor_warn, fontSize: YITU.fontSize_5
                }}>{"自由包车"}</Text>
                <View style={{
                    width: 1,
                    height: 20,
                    backgroundColor: YITU.textColor_0,
                    marginHorizontal: YITU.space_1
                }}/>
                <Text style={{
                    flex: 1, color: YITU.textColor_0, fontSize: YITU.fontSize_5
                }}>
                    {myValue.flight + "包车" + (myValue.days && myValue.days.length) + "日游"}
                </Text>
            </View>

            <View style={{marginTop: YITU.space_5, flexDirection: "row", alignItems: "center"}}>
                <Text style={{
                    color: YITU.textColor_1,
                    fontSize: YITU.fontSize_3,
                    marginRight: YITU.space_5
                }}>{"用车时间"}</Text>
                <Text style={{
                    flex: 1,
                    color: YITU.textColor_1,
                    fontSize: YITU.fontSize_3,
                }}>
                    {myValue.time}
                </Text>
            </View>

            <View style={{marginTop: YITU.space_0, flexDirection: "row", alignItems: "center"}}>
                <Text style={{
                    color: YITU.textColor_1,
                    fontSize: YITU.fontSize_3,
                    marginRight: YITU.space_5
                }}>{"车辆类型"}</Text>
                <Text style={{
                    flex: 1, color: YITU.textColor_1,
                    fontSize: YITU.fontSize_3
                }}>{carType}</Text>
            </View>
        </View>);
    }
}

module.exports = QueryCharterItemDetail;


const styles = StyleSheet.create({});
