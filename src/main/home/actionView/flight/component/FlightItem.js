import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import SelectCell from "../../../../../component/SelectCell.js";

class FlightItem extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {data, onPress} = this.props;
        return (<SelectCell
            style={{
                width: "100%",
                backgroundColor: YITU.backgroundColor_0,
            }}
            onPress={() => {
                onPress && onPress(data);
            }}>
            <View style={styles.row}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={styles.time}>{data.startTime}
                    </Text>
                    <View style={{flex: 1.2, marginHorizontal: YITU.space_2}}>
                        <View style={styles.centerItem}>
                            <Text style={{
                                color: YITU.textColor_5,
                                fontSize: YITU.fontSize_3
                            }}>历时6h30min</Text>
                            <View style={{
                                marginLeft: YITU.space_0,
                                backgroundColor: YITU.backgroundColor_adorn,
                                borderRadius: 2,
                                padding: 2
                            }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: YITU.fontSize_2,
                                }}>+1</Text>
                            </View>
                        </View>

                        <View style={styles.transLine}/>
                        <View style={{
                            width: "100%", height: 1,
                            backgroundColor: YITU.backgroundColor_Line
                        }}/>
                    </View>

                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={[styles.time, {textAlign: "right"}]}>
                        {data.endTime}
                    </Text>
                </View>


                <View style={{flexDirection: "row", paddingBottom: 2,}}>
                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={styles.text}>{data.startAirport}</Text>
                    <View style={{flex: 0.5}}/>

                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={[styles.text, {textAlign: "right"}]}>
                        {data.endAirport}
                    </Text>
                </View>


                <View style={{flexDirection: "row"}}>
                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={styles.text}>{data.flightStartName}
                    </Text>
                    <View style={{flex: 0.5}}/>

                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={[styles.text, {textAlign: "right"}]}>
                        {data.flightEndName}
                    </Text>
                </View>
            </View>
        </SelectCell>);
    }

}

module.exports = FlightItem;

const styles = StyleSheet.create({
    row: {
        width: "100%",
        padding: YITU.space_5,
        borderBottomColor: YITU.backgroundColor_Line,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    centerItem: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    transLine: {
        backgroundColor: YITU.backgroundColor_Line,
        transform: [{rotate: "45deg"}],
        alignSelf: "flex-end",
        marginBottom: 2,
        width: 8,
        height: 1
    },
    time: {
        flex: 1,
        color: YITU.textColor_0,
        fontSize: YITU.fontSize_9,
        marginBottom: YITU.space_2
    },
    text: {
        flex: 1,
        color: YITU.textColor_5,
        fontSize: YITU.fontSize_4
    },
});