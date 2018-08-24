import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';

const item_width = 60;
const space_width = (YITU.screenWidth - 4 * 60) / 5;

class SelectItem extends Component {
    static defaultProps = {
        itemArr: ["产品介绍","预订须知", "注意事项", "退改规则"],
        item_width: 60,
        space_width: (YITU.screenWidth - 4 * 60) / 5
    };

    constructor(props) {
        super(props);
        this.fadeInOpacity = new Animated.Value(0); // 初始值
        this.state = {
            index: 0
        }
    }

    componentDidMount() {

    }

    setScrollSel(index) {
        this.setState({
            index: index
        });
    }

    render() {
        let {index} = this.state;
        let {cb} = this.props;
        return (<View style={styles.row}>
            <View style={{width: space_width}}/>
            {this.createItem(index, cb)}
        </View>);
    }

    createItem(i, cb) {
        let arrItem = [];
        ["产品介绍","预订须知", "注意事项", "退改规则"].map((item, index) => {
            arrItem.push(<View key={index} style={{flexDirection: "row", height: YITU.d_RowHeight_2}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        cb && cb(index);
                    }}>
                    <View style={{flex: 1}}>
                        <View style={{
                            alignItems: "center",
                            flex: 1,
                            paddingTop: YITU.space_1,
                            paddingBottom: YITU.space_0,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                paddingTop: YITU.space_0,
                                fontSize: YITU.fontSize_15,
                                color: i == index ? YITU.textColor_4 : YITU.textColor_1
                            }}>{item}</Text>
                        </View>

                        <View style={{
                            backgroundColor: i == index ? YITU.textColor_4 : "transparent",
                            height: 2
                        }}/>
                    </View>
                </TouchableOpacity>
                <View style={{width: space_width}}/>
            </View>)
        });
        return arrItem;
    }
}

module.exports = SelectItem;

SelectItem.setScrollSel = (selectItem, index) => {
    selectItem.setScrollSel(index);
};

const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: YITU.backgroundColor_0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: YITU.backgroundColor_Line,
        borderStyle: "solid",
    }
});
