import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native'

import Interactable from 'react-native-interactable';

/**
 * actionArr    Array 元素为对象
 *
 * signImg      icon
 * title        按钮标题
 * onPress      回调事件
 */
class ViewAniLeft extends Component {
    static defaultProps = {
        noDisable: false,
        //按钮底部背景的样式
        rowBg: {
            right: 15,
        },
        //一个点击Item的样式
        itemStyle: {
            width: 60,
            backgroundColor: "#3da3ff",
            marginLeft: 5,
            borderRadius: 4,
        },
        //内部图片样式
        signImgStyle: {
            alignSelf: 'center',
            width: 15,
            height: 15
        },
        //内部文字样式
        signTextStyle: {
            color: "#fff",
            marginTop: 20,
            fontSize: 14
        },
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {actionArr} = this.props;

        return (<View style={{backgroundColor: 'white'}} {...this.props}>
            <View style={[{position: "absolute", height: "100%", flexDirection: "row",}, this.props.rowBg]}>
                {this.createItem(actionArr || [])}
            </View>
            {this.getRightView(this.props.noDisable, this.props.children)}
        </View>);
    }

    //创建item
    createItem(arr) {
        this.scrollWidth = 0;
        return arr.map((item, index) => {
            let itemW = (item.itemStyle && item.itemStyle.width) || (this.props.itemStyle.width||0);
            let itemSpace = (item.itemStyle && item.itemStyle.marginLeft) || (this.props.itemStyle.marginLeft||0);

            //计算左滑距离
            this.scrollWidth = this.scrollWidth + parseInt(itemW) + parseInt(itemSpace);

            return (<TouchableHighlight
                key={index}
                underlayColor={"#eee"}
                disabled={item.onPress ? false : true}
                style={{marginLeft:itemSpace}}
                onPress={() => {
                    if (item.onPress) {
                        item.onPress();
                    }
                    this.inter.snapTo({index: 0});
                }}>
                <View style={[
                    {
                        height: "100%",
                        justifyContent: "center",
                        alignItems: 'center',
                    },
                    this.props.itemStyle, item.itemStyle || {},
                    {marginLeft:0},
                    ]}>
                    {item.signImg ? <Image style={[this.props.signImgStyle, item.signImgStyle || {}]}
                                           resizeMode={"contain"} source={item.signImg}/> : null}
                    {item.title ?
                        <Text style={[this.props.signTextStyle, item.signTextStyle || {}]}>{item.title}</Text> : null}
                </View>

            </TouchableHighlight>);
        });
    }

    //滑动动画
    getRightView(noDisable, view) {
        if (noDisable) {
            return (<View>{view}</View>);
        } else {
            return (<Interactable.View
                horizontalOnly={true}
                ref={(ref) => {
                    this.inter = ref;
                }}
                onSnap={(e) => {
                    const snapPointId = e.nativeEvent.id;
                }}
                snapPoints={[{x: 0, id: 'open'}, {
                    x: 0 - ((this.scrollWidth || 0) + this.props.rowBg.right-10),
                    id: 'closed'
                }]}>
                {view}
            </Interactable.View>);
        }
    }
}
module.exports = ViewAniLeft;