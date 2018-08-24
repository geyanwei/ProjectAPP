import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    NativeModules, Platform, DeviceInfo
} from 'react-native';
import {PageView, LayoutBox, navigation, Toast, AppInit, Loading, ModalBox} from 'myapplib';
import AniViewBgImage from './component/ani/AniViewBgImage.js';
import AniNavHead from './component/ani/AniNavHead.js';
import SelectItem from './component/aniSel/SelectItem.js';
import ScrollAniShowView from './component/aniSel/ScrollAniShowView.js';
import HtmlView from './component/htmlView';
import SelectCell from '../../component/SelectCell.js';

const headImage_height = 155 + (Platform.OS === 'android' ? -20 : 1 == 1 ? 24 : 0);

class SpotsDetailsHot extends Component {
    constructor(props) {
        super(props);
        this.position_Y = 0;
        this.isAutoControlScroll = true;
        this.state = ({
            data: {}
        })
    }

    componentDidMount() {
        this.createData();
    }

    createData() {
        let data = {
            title: "台湾【画中世界】台北至九月一日行（野柳公...）",
            place: "九月",
            buyNum: "12",
            price: "583.00",
            serviceArr: ["中文司机", "48小时免费取消", "大众化", "戈壁滩"],
            descHtml: "安徽窜刷会阿US繁华灰度大沙发皮肤好很佩服是好个屁换个hi姑姑IE金融股IE人品几" +
            "个人人进而进入国家而过耳机如果刚刚居然敢接进入" +
            "撒旦画覅我安徽覅hi阿hi爱好覅恢复滴地方还何地发挥返回海大富hi啊" + "\n" + "好多号王鹏凤凰网佩服为合法【仍无法】大姐夫放假" + "\n" +
            "一为合法和我皮肤 和我换个刚好和我玩光辉",
            productArr: "|".repeat(9).split("|").map(() => {
                return {
                    sits: "经济型5座",
                    sitNum: "4人座",
                    luggage: "2行李",
                    car: "伊兰特/本田飞度/等同级车",
                    price: "1450.00"
                };
            }),
        }
        this.setState({
            data: data,
        });
    }

    componentWillUnmount() {

    }

    checkSelItem(y) {
        if (y > this.currentPosY3) {
            return 3;
        } else if (y > this.currentPosY2) {
            return 2;
        } else if (y > this.currentPosY1) {
            return 1;
        } else {
            return 0;
        }
    }

    render() {
        let {data} = this.state;
        let view = (
            <View style={{
                flex: 1,
                backgroundColor: YITU.backgroundColor_0,
            }}>
                {/*{此处40是图片比原图片高度大40像素}*/}
                <AniViewBgImage
                    ref={(a) => this.AniViewBgImage = a}
                    url={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531995286064&di=7f168ef613ccc7b860baaa422c781bab&imgtype=0&src=http%3A%2F%2Ffile27.mafengwo.net%2FM00%2FEA%2FDA%2FwKgB6lO-Q2CAHobgABuR9-ffKgc01.jpeg"}
                    aniHeight={headImage_height + 40}/>

                <ScrollView
                    ref={(a) => {
                        this.myScrollView = a;
                    }}
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                    scrollEventThrottle={1}
                    onScroll={(e) => {
                        let y = e.nativeEvent.contentOffset.y;
                        this.AniViewBgImage.setScrollNum(y);
                        this.AniNavHead.setScrollNum(y);
                        this.position_Y = (YITU.navBarHeight + (this.isAutoControlScroll ? 40 : 41));
                        this.scrollAniShowView.setScrollNum(y, this.currentPosY0 - this.position_Y);

                        SelectItem.setScrollSel(this.selectItem, this.checkSelItem(y + this.position_Y));

                        // if (this.isAutoControlScroll) {
                        // }
                    }}
                    onMomentumScrollEnd={(e) => {
                        // let y = e.nativeEvent.contentOffset.y;
                        // this.position_Y=(YITU.navBarHeight+39);
                        // SelectItem.setScrollSel(this.selectItem,(y+this.position_Y)>this.currentPosY2?2:((y+this.position_Y)>this.currentPosY1?1:0));
                        this.isAutoControlScroll = true;
                    }}>

                    <View style={{
                        height: headImage_height,
                        width: "100%",
                        justifyContent: "flex-end",
                        paddingBottom: YITU.space_2,
                        paddingLeft: YITU.space_5,
                    }}>
                        <Text
                            style={{color: YITU.c_title_white, fontSize: YITU.fontSize_6, marginBottom: YITU.space_0}}>
                            {this.props.title}
                        </Text>
                        <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_6}}>
                            Bangkok
                        </Text>
                    </View>

                    {this.createDetailView(data)}

                    <View style={[styles.actionCon, {marginBottom: YITU.space_7}]}>
                        {/*{产品介绍 预订须知 注意事项 退改规则}*/}
                        <View style={{width: "100%"}}>
                            <SelectItem cb={(index) => {
                                this.scrollToViewAction(index);
                            }}/>
                        </View>

                        <View style={{backgroundColor: YITU.backgroundColor_0, paddingHorizontal: YITU.space_5}}>
                            <View style={styles.titleRow}
                                  onLayout={(e) => {
                                      NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                          this.currentPosY0 = pageY;
                                      });
                                  }}>
                                <Text style={styles.title}>• 产品介绍</Text>
                            </View>
                            <HtmlView
                                value={"<div>" + "芭东海滩距普集镇15公里，是普吉岛开发最完美的海滩区。" + "</div>"}
                                stylesheet={htmlStyle}/>

                            <View style={styles.titleRow}
                                  onLayout={(e) => {
                                      NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                          this.currentPosY1 = pageY;
                                      });
                                  }}>
                                <Text style={styles.title}>• 预订须知</Text>
                            </View>
                            <HtmlView
                                value={
                                    "<div>" + "每当看到这一张相片，我都会细细端详：一个精瘦的男人，尖下巴，眼神锐利，皮肤黝黑，露出洁白的牙齿，" +
                                    "怀里抱着一个模样与他十分相像，且与他一样瘦的女孩子，在烈日下看着一个乞丐孩子，那个男孩子也同样在看着他们。这些照片让我记起那次回家后" +
                                    "的那种兴奋：“妈妈，我们同乞丐照相了！”回忆总是这么的温暖，这么的愉快，这么的令人久久不能忘怀。\n" +
                                    "\n" +
                                    "“小燕子，穿花衣，年年春天来这里，我问燕子它为啥来，燕子说，这里的春天最美丽！”这么稚嫩清脆的歌声从收音机传出来，多么使人愉悦，我问母亲，" +
                                    "“这是谁录的？”“是爸爸叫录的”我心里美滋滋的。\n" +
                                    "\n" +
                                    "“叮当、叮当……”，一阵熟悉的单车铃声从外面传来，给我的第一直觉是爸爸回来了！我急急跑出去，果然是他，我嗲声嗲气的喊着：“爸爸，爸爸——”。他见到我，" +
                                    "眼里发出慈爱的光芒，赶忙放好单车，微笑着抱起我，不断地亲着我的小脸颊，把嘴凑到我的耳边，轻轻而兴奋地问：“今天做了什么，快告诉爸爸”“有没有听" +
                                    "妈妈的话”。爸爸甜蜜而慈爱的语气，那只有在我小时候才有的对我亲密的笑容，使我倍感温馨。" + "</div>"
                                }
                                stylesheet={htmlStyle}/>

                            <View style={styles.titleRow}
                                  onLayout={(e) => {
                                      NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                          this.currentPosY2 = pageY;
                                      });
                                  }}>
                                <Text style={styles.title}>• 注意事项</Text>
                            </View>
                            <HtmlView
                                value={
                                    "<div>" + "还是这辆单车，这是载着我们一家三口的单车。记得那个夏天的早上，烈日当空照，去姨妈的家路途遥远，可是在那物质贫乏的年代，" +
                                    "只有自行车是我们全家的一份子，它不仅是我们一家三口唯一的交通工具，还承载着我们全家的幸福。爸爸努力地踩着，我坐在前边，母亲坐在后面，我不时地抬头观察着" +
                                    "爸爸，矮小、精瘦的爸爸，力气还是很大的，上坡的路很陡，爸爸一脸的汗水滴到我的头上，他的头发全湿了，眼睛被强烈的光线晒得几乎眯成一条缝。我能感觉到爸爸不" +
                                    "停地喘着气。\n" +
                                    "\n" +
                                    "一天晚上，爸爸头痛欲裂，呻吟着对我说：“把这个药拿去煮。”我就按照着他的指示做。经过一个晚上的努力，爸爸的头好多了。后来，他对母亲说，“谁说小健没用，" +
                                    "她能照顾我啦，她还有希望，别什么都责备她！”妈妈把他说的话转告给了我，我心里好高兴啊！是啊，这样一个赞扬在二十几年中有几次？也就仅仅的那么一次啊。" +
                                    "这样的幸福时刻，也就这么几个片断，其余的都是令人愤恨和伤心的记忆。\n" +
                                    "\n" +
                                    "与母亲结婚后，由于他俩性格不合，工作也不顺利，加上从小生活困苦，处于被欺负的处境，又长期寄人篱下，其实早已养成他暴躁的性格，只是到了我念三年级以后，" +
                                    "由于他更年期提早来临，那些性格里不安分的因子才暴发出来。" + "</div>"
                                }
                                stylesheet={htmlStyle}/>

                            <View style={styles.titleRow}
                                  onLayout={(e) => {
                                      NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                          this.currentPosY3 = pageY;
                                      });
                                  }}>
                                <Text style={styles.title}>• 退改规则</Text>
                            </View>
                            <View
                                style={{minHeight: 2 + YITU.screenHeight - (YITU.navBarHeight + (Platform.OS === 'android' ? 2.5 : 2) * YITU.d_RowHeight_2)}}>
                                <HtmlView
                                    value={"<div>" + "那是我读三年级的一个早上，他竟然要我把牛奶和粉混合在一起喝，我当时就吐了出来。我说不喝，他就一脚踢过来，我就倒在地上，" +
                                    "母亲赶紧来阻挡。每当早上我不满意母亲煮的早餐，爸爸便用鞋在我的身体上留下许多的脚印。每当我学习上遇到有问题时，请教他，爸爸都很不耐烦地教训我，" +
                                    "情绪异常激动，有动手打人的态势，一次竟然当着客人的面把我骂哭了。客人说，小孩嘛，不能这样对待，要耐心一点，他当场把客人反驳得不敢再出声。\n" +
                                    "\n" +
                                    "家务，从来都母亲一人包办，无论再辛苦，爸爸也从来不会帮忙。记得我生病的十几年里，母亲因为要工作，忙不过来，只好请亲戚来家里帮忙搞卫生。那亲戚很" +
                                    "是认真和勤快，拖地的时候，每一个角落都不落下。他坐在客厅长椅的中央，津津有味地看着电视，两眼发出愉快的光芒，翘起二郎腿，不时地随着电视音乐的" +
                                    "节奏摇摆，对那亲戚仿佛视而不见，亲戚只好说：“黄叔，麻烦挪开您的脚”。此时，他不仅毫无歉意，反而对亲戚说：“真烦，你不见我在看电视吗？好了，" +
                                    "这里不用拖。”亲戚当时就哭了，当天就收拾包袱回家了。事后她对母亲说，“表叔怎么这样，我是看你们过得不容易才去你们家帮忙的，想不到表叔这么没礼貌，" +
                                    "连最起码的尊重都没有。”\n" +
                                    "\n" +
                                    "可是，自从我身体不好以后，爸爸有时也会煮饭，也经常给我诊脉，给我买中药，捡中药，有时也帮忙煮中药。我和母亲每次回爷爷家，" +
                                    "他总是很细心地交待母亲怎样跟据我身体的具体情况来煮药。是的，这十年来我身体的恢复，他的功劳是明显的摆在眼前的。" + "</div>"
                                    }
                                    stylesheet={htmlStyle}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <AniNavHead
                    ref={(a) => this.AniNavHead = a}
                    aniHeight={headImage_height - YITU.navBarHeight}
                    title={this.props.title || "详情"}
                    isBack={true}
                    cb={() => {
                        navigation.pop(this);
                    }}
                    rightArr={[
                        {
                            defIcon: require("../../image/icon_collect_def.png"),
                            selIcon: require("../../image/icon_collect_sel.png"),
                            onPress: () => {
                                alert("收藏");
                            }
                        },
                        {
                            defIcon: require("../../image/icon_share_def.png"),
                            selIcon: require("../../image/icon_share_sel.png"),
                            onPress: () => {
                                alert("分享");
                            }
                        }]}/>
                <ScrollAniShowView
                    ref={(a) => this.scrollAniShowView = a}
                    view={<SelectItem
                        ref={(a) => this.selectItem = a}
                        cb={(index) => {
                            this.scrollToViewAction(index);
                        }}/>
                    }/>
            </View>)
        ;
        return (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                full: true,
                refresh: () => {
                    PageView.toLoading(this.pageView);
                    this.httpGetMessage();
                },
                pageLoading: true,
                errorTitle: this.props.title || "详情",
                back: () => {
                    navigation.pop(this)
                },
            })}>
            {view}
        </PageView>);
    }

    //指定滚动到
    scrollToViewAction(index) {
        this.isAutoControlScroll = false;

        let scrollViewPosY = this.currentPosY0;
        switch (index) {
            case 1:
                scrollViewPosY = this.currentPosY1;
                break;
            case 2:
                scrollViewPosY = this.currentPosY2;
                break;
            case 3:
                scrollViewPosY = this.currentPosY3;
                break;
            default:
                scrollViewPosY = this.currentPosY0;
                break
        }
        scrollViewPosY = scrollViewPosY - (YITU.navBarHeight + YITU.d_RowHeight_2);
        this.myScrollView.scrollTo({x: 0, y: scrollViewPosY, animated: true});
    }

    createDetailView(data) {
        return (<View style={{width: "100%", backgroundColor: YITU.backgroundColor_1}}>
            <View style={{padding: YITU.space_5, backgroundColor: YITU.backgroundColor_0}}>
                <Text numberOfLines={1}
                      ellipsizeMode={"tail"}
                      style={{
                          fontSize: YITU.fontSize_6,
                          color: YITU.textColor_0
                      }}>{data.title}</Text>
                <View style={{
                    flexDirection: "row",
                    marginTop: YITU.space_2,
                    alignItems: "center",
                }}>
                    <Image style={{width: YITU.d_icon_small, height: YITU.d_icon_small}}
                           source={require("../../image/icon_place.png")}/>
                    <Text numberOfLines={1}
                          ellipsizeMode={"tail"}
                          style={{
                              marginLeft: YITU.space_0,
                              fontSize: YITU.fontSize_3,
                              color: YITU.textColor_5,
                              maxWidth: 120,
                              marginRight: YITU.space_2
                          }}><Text>{data.place}</Text></Text>

                    <Text style={{
                        marginRight: YITU.space_2,
                        fontSize: YITU.fontSize_3,
                        color: YITU.textColor_5,
                    }}><Text>{data.buyNum + "人已购买"}</Text></Text>

                    <View style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <Text numberOfLines={1}
                              ellipsizeMode={"tail"}
                              style={{
                                  flex: 1,
                                  fontSize: YITU.fontSize_8,
                                  color: YITU.textColor_6,
                                  textAlign: "right"
                              }}>
                            <Text>{"￥" + data.price}</Text>
                        </Text>
                        <Text style={{
                            fontSize: YITU.fontSize_3,
                            color: YITU.textColor_0,
                        }}>
                            <Text>{" 起"}</Text>
                        </Text>
                    </View>
                </View>

                <View style={{width: "100%", flexDirection: "row"}}>
                    {this.createServiceItem(data.serviceArr || [])}
                </View>

                <Text style={{
                    marginTop: YITU.space_1,
                    fontSize: YITU.fontSize_3,
                    color: YITU.textColor_5,
                }}><Text>{data.descHtml}</Text></Text>
            </View>


            <SelectCell
                style={{
                    marginVertical: YITU.space_5,
                    backgroundColor: YITU.backgroundColor_0,
                    padding: YITU.space_5,
                }}
                onPress={() => {
                    navigation.push(this, 'CalendarList', {
                        title: '日历',
                        myValue: {
                            dep_yyyy: "2018",
                            dep_mm: "7",
                            dep_dd: "25",
                            obj: {
                                i: 1
                            }
                        },
                        callBack: (dateObj) => {
                            alert(JSON.stringify(dateObj));
                        }
                    });
                }}>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text style={{flex: 1, fontSize: YITU.fontSize_7, color: YITU.textColor_1}}>请选择出行时间</Text>
                    <Image style={{width: 10, height: 18}}
                           source={require("../../image/userIcon/arrow_black.png")}/>
                </View>
            </SelectCell>

            <ProductView
                data={data.productArr || []}
                cb={(item) => {
                    alert(JSON.stringify(item));
                }}/>
        </View>);
    }

    //创建服务Item
    createServiceItem(arr) {
        return arr.map((item, index) => {
            return <View key={index}
                         style={{
                             backgroundColor: YITU.backgroundColor_1,
                             height: 24,
                             borderRadius: 12,
                             alignItems: "center",
                             justifyContent: "center",
                             marginTop: YITU.space_0,
                             marginRight: YITU.space_0,
                             paddingHorizontal: YITU.space_1,
                         }}>
                <Text style={{color: YITU.textColor_1, fontSize: YITU.fontSize_2}}>{item}</Text>
            </View>
        })
    }
}

module.exports = SpotsDetailsHot;


class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOff: true
        }
    }

    render() {
        let {data, cb} = this.props;
        let {isOff} = this.state;
        let isBig3 = data && data.length > 3;
        let showData = isBig3 && isOff ? data.slice(0, 3) : data;
        return (<View style={{
            paddingLeft: YITU.space_5,
            backgroundColor: YITU.backgroundColor_0,
            marginBottom: YITU.space_5
        }}>
            {this.createProductCell(showData || [], isBig3, cb)}
            {isBig3 ? <TouchableOpacity
                activeOpacity={1}
                style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center"
                }} onPress={() => {
                this.setState({
                    isOff: !isOff
                });
            }}>
                <Text
                    style={{fontSize: YITU.fontSize_6, color: YITU.textColor_1, marginRight: YITU.space_1}}>更多车型</Text>
                <Image style={{width: YITU.d_click_icon, height: YITU.d_click_icon}}
                       source={isOff ? require("./component/image/off_icon.png") : require("./component/image/on_icon.png")}/>
            </TouchableOpacity> : null}
        </View>);
    }

    //创建产品行
    createProductCell(arr, isBig3, cb) {
        return arr.map((item, index) => {
            return (<View
                key={index}
                style={{
                    paddingVertical: YITU.space_5,
                    paddingRight: YITU.space_5,
                    backgroundColor: YITU.backgroundColor_0,
                    flexDirection: "row",

                    alignItems: "center",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderColor: isBig3 ? YITU.backgroundColor_Line : 0
                }}>
                <View style={{flex: 1, paddingRight: YITU.space_5}}>
                    <View style={{flex: 1, flexDirection: "row", alignItems: "flex-end"}}>
                        <Text style={{
                            fontSize: YITU.fontSize_7,
                            color: YITU.textColor_0,
                            marginRight: YITU.space_2
                        }}>{item.sits}</Text>
                        <Text style={{
                            fontSize: YITU.fontSize_4,
                            color: YITU.textColor_5
                        }}>{item.sitNum + " | " + item.luggage}</Text>
                    </View>
                    <Text style={{
                        marginTop: YITU.space_2,
                        fontSize: YITU.fontSize_4,
                        color: YITU.textColor_5
                    }}>{item.car}</Text>
                    <Text style={{
                        marginTop: YITU.space_2,
                        fontSize: YITU.fontSize_5,
                        color: YITU.textColor_6
                    }}>{item.price}</Text>
                </View>
                <SelectCell style={{
                    backgroundColor: YITU.backgroundColor_3,
                    borderRadius: YITU.radius_2,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 35
                }} onPress={() => {
                    cb && cb(item);
                }}>
                    <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_6}}>预定</Text>
                </SelectCell>
            </View>)
        });
    }
}

const htmlStyle = StyleSheet.create({
    h4: {
        fontSize: YITU.fontSize_14,
        color: YITU.textColor_1,
        lineHeight: YITU.lineHeight_9,
        fontWeight: "bold"
    },
    p: {
        lineHeight: YITU.lineHeight_9,
        fontSize: YITU.fontSize_14,
        color: YITU.textColor_3
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },

    actionCon: {
        backgroundColor: YITU.backgroundColor_1,
    },
    titleRow: {
        height: YITU.d_RowHeight_2,
        justifyContent: "flex-end",
        paddingBottom: YITU.space_0,
    },
    title: {
        fontSize: YITU.fontSize_15,
        color: YITU.textColor_1,
        fontWeight: 'bold'
    },
    conText: {
        lineHeight: YITU.lineHeight_9,
        fontSize: YITU.fontSize_14,
        color: YITU.textColor_3
    }
});
