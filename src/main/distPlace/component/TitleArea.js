import React, {Component, PropTypes} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView
} from 'react-native';
import SelectCell from '../../../component/SelectCell.js';

const screenWith = Dimensions.get('window').width;

class TitleArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            isSearch:false
        }
    }

    setData(isSearch){
        this.setState({
            isSearch:isSearch||false,
            index: 0
        });
    }
    render() {
        let {index,isSearch} = this.state;
        let {cb} = this.props;
        return (
            <View style={{
                backgroundColor: YITU.backgroundColor_0,
            }}>
                <ScrollView>
                    {this.createItem(isSearch?this.getSearchData():this.getData(),index, cb)}
                </ScrollView>

            </View>
        );
    }
    getSearchData(){
        return [
            {
                title:"结果",
                englishTitle:"Result",
                imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535797735915&di=20df7a9d79d2187142154669a7868f8e&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2F2%2F2D%2F2DC8D18B509E29477F89BBB150F2DDF1.jpg"
            }];
    }
    getData(){
        return [
            {
                title:"热门",
                englishTitle:"Hot Place",
                imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531914107514&di=e868ce915c8d67520a4f27385d489ca4&imgtype=0&src=http%3A%2F%2Fimage3.cnpp.cn%2Fupload%2Fimages%2F20150821%2F12031424660_800x650.jpg"
            },
            {
                title:"亚洲",
                englishTitle:"Asia",
                imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531915121124&di=2223657da317a7816aac171e690a44a7&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Flvpics%2Fh%3D800%2Fsign%3Dac868f11925298221a3334c3e7cb7b3b%2Fb3b7d0a20cf431ad214af0ef4936acaf2fdd9848.jpg"
            },
            {
                title:"欧洲",
                englishTitle:"The European",
                imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531915177853&di=f9ffd9ac7bf36b72b38c267ef2ab16be&imgtype=0&src=http%3A%2F%2Fp.ananas.chaoxing.com%2Fstar%2F1024_0%2F1383637413988gezoj.jpg"
            },
            {
                title:"非洲",
                englishTitle:"Africa",
                imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531915216964&di=1396a50a8dd6126152844e60d2d5e308&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D3e2a0d154136acaf4ded9ebf14b0e765%2F2fdda3cc7cd98d10f42c421d2b3fb80e7bec9026.jpg"
            },
            {
                title:"美洲",
                englishTitle:"The Americas",
                imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531915296842&di=3a9068a1a7d9c27ce5f896abc741d905&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F37d12f2eb9389b5027bfc7558f35e5dde7116e70.jpg"
            },
            {
                title:"大洋洲",
                englishTitle:"Oceania",
                imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531915335872&di=09878f2bde442028c79f936554791f68&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F342ac65c10385343fed4e1209913b07eca808893.jpg"
            }];
    }
    createItem(arr,index, cb) {
        return arr.map((item, i) => {
            return (
                <SelectCell
                    key={i}
                    onPress={() => {
                        this.setState({
                            index: i
                        }, () => {
                            cb && cb(item);
                        });
                    }}>
                    <View style={{
                        paddingLeft: YITU.space_5,
                        paddingTop: YITU.space_1,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: YITU.space_5,
                            paddingRight: YITU.space_0,
                        }}>
                            <Image style={{
                                backgroundColor: index === i ? YITU.backgroundColor_3 : YITU.backgroundColor_adorn,
                                width: 35,
                                height: 35, alignSelf: "center",
                            }}/>
                            <Text style={{
                                minWidth: 40,
                                marginTop: YITU.space_0,
                                textAlign: "center",
                                fontSize: YITU.fontSize_3,
                                color: index === i ? YITU.textColor_4 : YITU.textColor_2,
                            }}>{item.title}</Text>
                        </View>
                        <View style={{
                            backgroundColor: index === i ? YITU.backgroundColor_1 : "transparent",
                            width: 15,
                            height: 15,
                        }}>
                        </View>
                    </View></SelectCell>);
        })
    }
}


module.exports = TitleArea;

const styles = StyleSheet.create({
    main: {
        marginTop: YITU.space_5,
    },
});

