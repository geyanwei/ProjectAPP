import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import {PageView, Toast, navigation} from 'myapplib';
import MyEditSectionList from '../../../component/SectionList/MyEditSetionList';
import SelectCell from '../../../component/SelectCell';

const {width} = Dimensions.get("window");

const SECTIONHEIGHT = 25; //列表标题高度
const ROWHEIGHT = 55; //cell高度
const SEARCH_HEIGHT = 64; //搜索框高度
const CHOOSECONTINER_HEIGHT = 55; //已选择城市容器高度

import HttpTool from '../../../http/HttpTool';
import APIPZP from '../../../http/APIPZP';
import ServerCityList from './component/ServerCityList';
import ServerCell from './component/ServerCell';
import SearchInput from './component/SearchInput';

class LoginCity extends Component {
    static defaultProps = {
        single: false,
        city: {}, //single为false时
        cityList: [],//single为true时做数据还原,
        callBack: undefined,//回调函数,页面回跳又本页面处理,
        params: {},//传递给下个页面的参数对象
        path: ""//页面名称
    };

    constructor(props) {
        super(props);
        this.state = {
            chooseItem: {}, //选择的国家
            showCityList: false,
            countryList: [], //城市列表
            chooseCityList: this.props.cityList || [], //选择的城市列表
            isSearch: false,
            searchList: [], //搜索列表
            searchLoading: false,
        };
        this.refList = [];
        this.cityObj = {};
        this.searchTime = 150;
        this.refresh = true;
    }

    componentDidMount() {
        this.httpGetData()
    }

    // componentWillUnmount() {
    //     if (this.timeoutSearch) {
    //         clearTimeout(this.timeoutSearch);
    //         this.timeoutSearch = undefined;
    //     }
    // }

    /**
     * 获取国家列表
     */
    httpGetData() {
        let param = {
            countryType: 0,
        };

        let successCallback = (code, message, json, option) => {
            let newArray = json;

            let chooseItem = {};
            let showCityList = false;
            if (newArray.length > 0) {
                //默认选择第一个国家
                chooseItem = newArray[0];
                showCityList = true;
            }
            newArray = this.showCountryIdInit(this.state.chooseCityList, newArray);

            PageView.clearLoading(this.pageView, () => {
                this.setState({
                    countryList: newArray,
                    chooseItem: chooseItem,
                    showCityList: showCityList,
                }, () => {
                    this.serverCityList.showCity(chooseItem.id);
                    //默认显示白色
                    this.refList && this.refList[0].showClick(true);
                })
            })

        };
        let failCallback = (code, message) => {
            PageView.clearLoading(this.pageView);
            PageView.toError(this.pageView, message)
        };

        HttpTool.post(APIPZP.base_basedata_dataapi_areas_search, successCallback, failCallback, param);
    }

    showCountryIdInit(cityList, newArray) {
        //初始化所有
        let obj = {};
        cityList && cityList.map((item) => {
            if (item.countryId in obj) {
                obj[item.countryId]++;
            } else {
                obj[item.countryId] = 1;
            }
        });
        for (let key in obj) {
            for (let index in newArray) {
                if (newArray[index].id === key) {
                    newArray[index].number = obj[key];
                }
            }
        }
        return newArray;
    }

    /**
     * 恢复数据用，恢复城市数量
     * @param item
     */
    showCountryId(item, type) {
        if (item) {
            for (let index in this.state.countryList) {
                if (this.state.countryList[index].id === item.countryId) {
                    if (this.refList && this.refList[index]) {
                        if (type) {
                            this.refList && this.refList[index].showNo(1);
                        } else {
                            this.refList && this.refList[index].showNo(-1);
                        }

                    }
                }
            }
        }
    }

    //选择城市(多选)
    chooseCity(data) {
        let newArray = this.state.chooseCityList.concat();
        let index = this.cityInArray(newArray, data);
        if (index > -1) {
            //存在
            newArray.splice(index, 1);
            this.setState({
                chooseCityList: newArray
            }, () => {
                this.showCountryId(data, false);
            })
        } else {
            if (this.state.chooseCityList.length >= 10) {
                Toast.show("最多可选择10个");
                return;
            }
            this.setState({
                chooseCityList: [data].concat(newArray)
            }, () => {
                this.showCountryId(data, true)
            })
        }
    }

    /**
     * 点击城市列表
     * @param data
     */
    clickCityItem(data) {
        if (!this.props.single) {
            this.chooseCity(data);
        } else {
            //单选
            navigation.pop(this, () => {
                if (this.props.callBack) {
                    this.props.callBack(data);
                }
            });
        }
    }


    //底部按钮显示城市名称
    cityListName() {
        let name = this.state.chooseCityList.length > 0 ? "" : "请选择您所在的城市";
        this.state.chooseCityList && this.state.chooseCityList.map((item, index) => {
            name = name + item.name + (this.state.chooseCityList.length - 1 === index ? "" : " ");
        });
        return name;
    }

    /**
     * 国家列表cell
     * @param data
     * @returns {XML}
     */
    renderListRow(data) {
        return (
            <ServerCell ref={(ref) => {
                this.refList.push(ref);
            }} ROWHEIGHT={ROWHEIGHT} data={data} chooseItem={this.state.chooseItem} callBack={(data) => {
                let array = [].concat(this.state.countryList);
                let index = array.indexOf(data);

                let index2 = array.indexOf(this.state.chooseItem);

                if (index === index2) {
                    return;
                }
                if (index > -1) {
                    this.refList[index] && this.refList[index].showClick(true);
                    this.refList[index2] && this.refList[index2].showClick(false);
                }
                this.setState({
                    chooseItem: data,
                    showCityList: true,
                    countryList: array
                }, () => {
                    this.serverCityList.showCity(data.id);

                })
            }}/>
        )
    }

    /**
     * 列头
     * @param sectionData
     * @param sectionID
     * @returns {XML}
     */
    renderListSectionHeader(sectionData, sectionID) {
        return (
            <View style={{
                paddingLeft: YITU.space_5,
                width: '100%',
                height: SECTIONHEIGHT,
                backgroundColor: YITU.backgroundColor_5,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{fontSize: 16}}>{sectionData}</Text>
            </View>
        );
    }


    /**
     * 右侧城市列表
     * @returns {XML}
     */
    renderCityList() {
        return (
            <View style={{
                position: "absolute",
                width: width / 2,
                backgroundColor: '#fff',
                top: 0,
                right: 0,
                height: "100%",
            }}>
                <ServerCityList ref={(ref) => {
                    this.serverCityList = ref;
                }} renderCell={this.renderCell.bind(this)}/>
            </View>
        )
    }

    renderCell(item, index, isSearch = false) {
        let title = item.name || "";
        let detail = item.enName || "";
        let title2 = "";
        let detail2 = "";
        if (isSearch) {
            title2 = item.enName || "";
            detail = item.country || "";
            detail2 = item.countryEnName;
        }
        return (
            <SelectCell key={index} onPress={() => {
                this.clickCityItem(item);

            }}>
                <View style={{
                    padding: YITU.space_5,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: YITU.backgroundColor_Line
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            {
                                <Text numberOfLines={1}
                                      ellipsizeMode={"tail"}
                                      style={[{
                                          fontSize: YITU.fontSize_5,
                                          color: YITU.textColor_1
                                      }]}>
                                    {
                                        title2 ? (title + " " + title2) : (title)
                                    }
                                </Text>
                            }
                            {
                                <Text numberOfLines={1}
                                      ellipsizeMode={"tail"}
                                      style={[{
                                          fontSize: YITU.fontSize_3,
                                          color: YITU.textColor_2,
                                          marginTop: 5
                                      }]}>
                                    {
                                        detail2 ? (detail + " " + detail2) : (detail)
                                    }
                                </Text>
                            }
                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 30
                        }}>
                            {
                                this.cityInArray(this.state.chooseCityList, item, true) > -1 ?
                                    <Image style={{height: 12.5, width: 15}}
                                           source={require("../../../image/login/ckeck.png")}/> : null
                            }
                        </View>
                    </View>
                </View>
            </SelectCell>
        )
    }

    /**
     * 判断城市是否已经选择
     * @param array
     * @param obj
     * @param type
     * @returns {number}
     */
    cityInArray(array, obj, type) {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == obj.id) {
                index = i;
                break;
            }
        }
        return index;
    }

    /**
     * 搜索界面
     * @returns {XML}
     */
    renderSearchList() {
        let search = (
            <FlatList
                data={this.state.searchList}
                style={{flex: 1, backgroundColor: '#fff'}}
                renderItem={({item, index}) => {
                    if (item) {
                        return this.renderCell(item, index, true)
                    } else {
                        return null
                    }
                }}
                keyboardShouldPersistTaps={"handled"}
                ListEmptyComponent={() => {
                    return (
                        <View style={{flex: 1, alignItems: 'center', paddingTop: "20%"}}>
                            <Image style={{width: 173 / 2, height: 150 / 2}}
                                   source={require("../../../image/login/cityServer_empty.png")}/>
                            <Text style={{
                                marginTop: YITU.space_5,
                                color: YITU.textColor_2,
                                fontSize: YITU.fontSize_4
                            }}>{"很抱歉，没有找到相关城市"}</Text>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => {
                    return index;
                }}
            />
        );

        let Loading = (
            <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size={"large"}
                />
            </View>
        );
        return this.state.searchLoading ? Loading : search;
    }

    search(isSearch, searchLoading, value) {
        if (isSearch !== this.state.isSearch || searchLoading !== this.state.searchLoading) {
            this.setState({
                isSearch: isSearch,
                searchLoading: searchLoading
            }, () => {
                this.searchDetail(isSearch, value)
            })
        } else {
            this.searchDetail(isSearch, value)
        }

    }

    searchDetail(isSearch, value) {
        if (value && isSearch) {
            if (this.timeoutSearch) {
                clearTimeout(this.timeoutSearch);
                this.timeoutSearch = undefined;
                this.refresh = false;
            }
            this.timeoutSearch = setTimeout(() => {
                this.httpSearchCity(value);
            }, this.searchTime);
        }
    }


    /**
     * 模糊匹配城市
     */
    httpSearchCity(value) {
        this.refresh = true;
        let param = {
            countryType: 0,
            keyword: value
        };

        let successCallback = (code, message, json, option) => {
            if (this.refresh) {
                this.setState({
                    searchList: json,
                    searchLoading: false
                });
            }
        };
        let failCallback = (code, message) => {
            this.setState({
                searchList: [],
                searchLoading: false
            });
        };

        HttpTool.post(APIPZP.base_basedata_dataapi_areas_search_cities, successCallback, failCallback, param);
    }


    /**
     * 输入框
     * @returns {XML}
     */
    renderSearchInput() {
        return (
            <SearchInput SEARCH_HEIGHT={SEARCH_HEIGHT} closeSearch={(isSearch, searchLoading) => {
                if (this.state.isSearch !== isSearch || this.state.searchLoading !== searchLoading) {
                    this.setState({
                        isSearch: isSearch,
                        searchLoading: searchLoading
                    }, () => {
                        Keyboard.dismiss();
                    })
                }
            }}
                         search={(isSearch, searchLoading, value) => {
                             this.search(isSearch, searchLoading, value);
                         }}
            />
        )
    }

    /**
     * 城市选择显示
     */
    renderChoosedCityList() {
        return this.state.chooseCityList.length > 0 ? this.renderWithOutChoosed() : this.renderChoosed();
    }

    /**
     * 城市选择scrollView
     * @returns {XML}
     */
    renderChoosed() {
        let screenWidth = YITU.screenWidth;
        return (
            <View style={{height: CHOOSECONTINER_HEIGHT, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[{
                    color: YITU.textColor_2,
                    fontSize: YITU.fontSize_15
                }, screenWidth <= 320 ? {fontSize: YITU.fontSize_3} : null]}>{"我们将根据您选择的服务城市派发订单（最多10个）"}</Text>
            </View>
        );
    }

    /**
     * 暂未选择默认
     * @returns {XML}
     */
    renderWithOutChoosed() {
        return (
            <View style={{height: CHOOSECONTINER_HEIGHT, justifyContent: 'center'}}>
                <ScrollView horizontal={true} style={{paddingVertical: YITU.space_2, paddingHorizontal: YITU.space_5}}>
                    {
                        this.state.chooseCityList && this.state.chooseCityList.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    paddingLeft: YITU.space_5,
                                    paddingRight: YITU.space_5 - YITU.space_2,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: YITU.backgroundColor_0,
                                    borderRadius: YITU.radius_1,
                                    marginRight: YITU.space_2
                                }}>
                                    <Text
                                        style={{fontSize: YITU.fontSize_15, color: YITU.textColor_2}}>{item.name}</Text>
                                    <SelectCell style={{padding: YITU.space_2}} onPress={() => {
                                        let newArray = this.state.chooseCityList.concat();
                                        newArray.splice(index, 1);
                                        this.setState({
                                            chooseCityList: newArray
                                        }, () => {
                                            this.showCountryId(item, false);
                                        })

                                    }}>
                                        <Image style={{width: 9, height: 9}}
                                               source={require("../../../image/login/delete.png")}/>
                                    </SelectCell>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }


    render() {
        let main = (
            <View style={styles.main}>
                <ScrollView contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps={"handled"}
                            scrollEnabled={false}>
                    {
                        this.renderSearchInput()
                    }
                    {
                        this.props.single ? null : this.renderChoosedCityList()
                    }
                    {
                        <View style={{flex: 1, backgroundColor: 'transparent'}}>
                            {
                                <MyEditSectionList
                                    allCityList={this.state.countryList}
                                    renderListRow={this.renderListRow.bind(this)}
                                    renderListSectionHeader={this.renderListSectionHeader.bind(this)}
                                    extralTopHeight={(this.props.single ? 0 : CHOOSECONTINER_HEIGHT) + SEARCH_HEIGHT}
                                    SECTIONHEIGHT={SECTIONHEIGHT}
                                    ROWHEIGHT={ROWHEIGHT}
                                    showNewView={() => {
                                        return this.state.showCityList ? this.renderCityList() : null
                                    }}
                                />
                            }
                            {
                                this.state.isSearch ?
                                    <View
                                        style={{position: 'absolute', top: 0, left: 0, height: "100%", width: "100%"}}>
                                        {
                                            this.renderSearchList()
                                        }
                                    </View> : null
                            }
                        </View>
                    }
                </ScrollView>
            </View>
        );
        return (
            <PageView
                ref={(ref) => {
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this, {
                    navBack: () => {
                        navigation.pop(this,);
                    },
                    autoCloseLoading: false,
                    barConfig: this.navBar(),
                    pageLoading: true,
                    refresh: () => {
                        //刷新
                        PageView.toLoading(this.pageView, () => {
                            this.httpGetData()
                        })
                    }
                })}
            >
                {main}
            </PageView>
        );
    }

    navBar() {
        return {
            title: this.props.title || "服务城市",
            rightButtonText: this.props.single ? "" : (this.props.navRightBtnText || '完成'),
            rightButtonFunc: () => {
                if (this.state.chooseCityList && this.state.chooseCityList.length > 0) {
                    if (this.props.callBack) {
                        navigation.pop(this, () => {
                            if (this.props.callBack) {
                                this.props.callBack(this.state.chooseCityList)
                            }
                        })
                    } else {
                        navigation.push(this, this.props.path, Object.assign({cityArr: this.state.chooseCityList}, this.props.params));
                    }
                } else {
                    Toast.showToast("请选择服务城市");
                }
            }

        }
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    textInputView: {
        height: YITU.d_icon * 2,
        backgroundColor: "rgb(244,244,244)",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: 'center'
    },

    textInputStyle: {
        // 设置尺寸
        fontSize: YITU.fontSize_15,
        padding: 0,
        height: YITU.d_head,
        flex: 1,
        color: YITU.textColor_1
    },
});

module.exports = LoginCity;
