import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import SelectCell from '../../../../component/SelectCell.js';
import {Toast} from "myapplib";

class ActionCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upData: 1,
        };
    }

    componentDidMount() {

    }

    upView() {
        this.setState({
            upData: this.state.upData + 1,
        });
    }

    refresh() {
        this.upView();
    }

    render() {
        let {data, cb} = this.props;

        if (data.type === "line") {
            return (<View style={{backgroundColor: YITU.backgroundColor_0}}>
                <View style={{
                    marginLeft: YITU.space_5,
                    height: StyleSheet.hairlineWidth, backgroundColor: YITU.backgroundColor_Line
                }}/>
            </View>);
        }
        return (<SelectCell
            style={styles.main}
            onPress={() => {
                cb && cb(data);
            }}>
            <View style={styles.cell}>
                <Image
                    resizeMode={"contain"}
                    style={styles.image}
                    source={data.icon||require("../../../../image/userIcon/grzx-zhaq.png")}/>
                <View style={{justifyContent:"center"}}>
                    <Text style={[
                        styles.title, {
                            color: data.value && data.value != "" ? YITU.textColor_1 : YITU.textColor_5
                        }
                    ]}>{data.value || data.defaultValue}</Text>

                    {data.littleValue ? <Text style={{
                        marginTop:3,
                        color: YITU.textColor_5,
                        fontSize: YITU.fontSize_2
                    }}>{data.littleValue}</Text> : null}
                </View>


                <Text style={styles.text}>{data.text||""}</Text>
                {data.isNoShowRightIcon ? null :
                    <Image resizeMode={"contain"}
                           style={styles.icon}
                           source={require("../../../../image/userIcon/arrow.png")}/>}
            </View>
        </SelectCell>);
    }
}

module.exports = ActionCell;

ActionCell.showMessage = (obj, page,isNoShowToast) => {
    if (!obj.value || obj.value === "") {
        if (isNoShowToast){
            return false;
        }
        Toast.show(obj.defaultValue);
        return false;
    }
    return true;
};

ActionCell.getValue = (obj, page) => {
    return obj.value || "";
};

const styles = StyleSheet.create({
    main: {
        paddingLeft: YITU.space_5,
        backgroundColor: YITU.backgroundColor_0
    },
    cell: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: YITU.space_5,
        height: 50,
    },
    image: {
        width: YITU.d_icon,
        height: YITU.d_icon,
        marginRight: YITU.space_1
    },
    title: {
        fontSize: YITU.fontSize_7,
        color: YITU.textColor_1,
        minWidth: 140,
        maxWidth: 170
    },
    text: {
        flex: 1,
        marginLeft: YITU.space_5,
        fontSize: YITU.fontSize_3,
        color: YITU.textColor_5,
        textAlign: "right"
    },
    icon: {
        width: YITU.d_icon_small,
        height: YITU.d_icon_small,
        marginLeft: YITU.space_1
    },
});