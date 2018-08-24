import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import MyButton from "../../../../../component/MyButton.js";
import {ModalBox} from "myapplib";

class BottomItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price || ""
        };
    }

    setMoney(price) {
        this.setState({
            price: price
        });
    }

    render() {
        let {btnTitle, isTop, cb, callBack} = this.props;
        let {price} = this.state;
        return (<View style={styles.main}>
            <View style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
                paddingHorizontal: YITU.space_2
            }}>
                <View style={{flexDirection: "row", alignItems: "flex-end"}}>
                    <Text style={{
                        fontSize: YITU.fontSize_3, color: YITU.textColor_1
                    }}>实付金额:</Text>
                    <Text style={{
                        flex: 1,
                        fontSize: YITU.fontSize_6,
                        color: YITU.textColor_adorn
                    }}>{"￥" + price}</Text>
                </View>
            </View>
            <TouchableOpacity style={{
                flexDirection: "row",
                width: 60,
                height: 45,
                alignItems: "center"
            }} onPress={() => {
                // this.setState({
                //     isTop:!isTop,
                // },()=>{
                //
                // })
                callBack && callBack(!isTop);
            }}>
                <Text style={{}}>{"明细"}</Text>
                <Image
                    resizeMode={"contain"}
                    style={{
                        marginLeft: YITU.space_0,
                        width: 13, height: 13,
                    }}
                    source={isTop ? require("../../image/show_top.png") :
                        require("../../image/show_bottom.png")}/>
            </TouchableOpacity>


            <MyButton
                style={{
                    width: 120,
                    height: 45,
                    backgroundColor: YITU.backgroundColor_3,
                }}
                ref={(a) => this.refBtn = a}
                // disabled={true}
                underlayColor={YITU.backgroundColor_11}
                underlayTxtColor='#FFFFFFf0'
                noClickedBackgroundColor={YITU.backgroundColor_4}
                onPress={() => {
                    cb && cb();
                }}>{btnTitle}
            </MyButton>
        </View>);
    }
}

module.exports = BottomItemView;


const styles = StyleSheet.create({
    main: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 45,
        backgroundColor: YITU.backgroundColor_0,
        flexDirection: "row",
        alignItems: "center"
    },
});