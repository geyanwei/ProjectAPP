import React, {Component, PropTypes} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';

class SelItemViewLocalPlay extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            clickedIndex: 0,
            dataArr: [
                {
                    title: "全部分类",
                    isHasSign: true,
                    isTop: false
                },
                {
                    title: "智能排序",
                    isHasSign: true,
                    isTop: true
                },
                {
                    title: "使用时间",
                    isHasSign: true,
                    isTop: true
                },
                {
                    title: "价格区间",
                    isHasSign: false,
                    isTop: false
                }],
        });
    }

    //外部控制sign是否朝上
    setData(index,value){
        let {dataArr} = this.state;
        let isStr = Object.prototype.toString.call(value) === "[object String]";
        dataArr[index].title = isStr?value:dataArr[index].title;

        dataArr[index].isTop = false;
        this.setState({
            dataArr: dataArr,
            clickedIndex: index,
        });
    }

    render() {
        let {cb} = this.props;
        let {dataArr} = this.state;
        return (<View style={styles.main}>
            <View style={{
                flexDirection: "row",
                paddingHorizontal: YITU.space_5,
                paddingVertical: YITU.space_1,
                borderColor: YITU.backgroundColor_Line,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderStyle: "solid",
            }}>
                {this.createItem(dataArr || [], cb)}
            </View>
        </View>);
    }

    createItem(dataArr, cb) {
        return dataArr.map((item, index) => {
            return (<TouchableOpacity
                key={index}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    borderColor: YITU.backgroundColor_Line,
                    borderRightWidth: index !== 3 ? 1 : 0,
                    borderStyle: "solid",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    this.dealData(dataArr, index, cb);
                }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                    style={{
                    maxWidth:60,
                    paddingVertical: YITU.space_0,
                    fontSize: YITU.fontSize_3,
                    color: this.state.clickedIndex === index ? YITU.textColor_4 : YITU.textColor_1
                }}>{item.title}</Text>

                {item.isHasSign ?
                    <Image
                        style={{
                            marginLeft: YITU.space_0, width: 13, height: 13
                        }}
                        source={this.state.clickedIndex === index ?
                            (item.isTop ?
                                    require("../image/blue_top.png") :
                                    require("../image/blue_bottom.png")
                            ) : require("../image/black_bottom.png")}
                    /> : null}
            </TouchableOpacity>);
        });
    }

    dealData(dataArr, index, cb) {
        for (let i in dataArr) {
            let item = dataArr[i];
            item.isTop = this.state.clickedIndex===index ? !item.isTop : true;
            dataArr[i] = item;
        }
        this.setState({
            dataArr: dataArr,
            clickedIndex: index,
        }, () => {
            cb && cb(this, dataArr[index], index);
        });
    }
}

module.exports = SelItemViewLocalPlay;


const styles = StyleSheet.create({
    main: {
        width: "100%",
        backgroundColor: YITU.backgroundColor_0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: "solid",
        borderBottomColor: YITU.backgroundColor_Line,
    },
});
