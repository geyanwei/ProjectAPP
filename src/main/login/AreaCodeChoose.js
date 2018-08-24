import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import {PageView, navigation,Toast,Loading,EmptyView} from 'myapplib';
import MyEditSectionList from '../../component/SectionList/MyEditSetionList';
import HttpTool from '../../http/HttpTool';
import APIGYW from '../../http/APIGYW';
import lodash from 'lodash';
import SelectCell from '../../component/SelectCell.js';

const SECTIONHEIGHT = 30;
const ROWHEIGHT = 60;
const extralTopHeight = 70;

class AreaCodeChoose extends Component {

    constructor(props){
        super(props);
        this.state ={
            allCityList: [],
            value: "",
            isSearch: false,
            searchList: [],
            firstLoading: true,
        };

    }

    componentDidMount() {
        this.httpGetData();
    }

    httpGetData() {
        let param = {
            type: 1,
        };
        let successCallback = (code, message, json, option) => {
            PageView.clearLoading(this.pageView,()=>{
                this.setState({
                    allCityList: json,
                });
            });
        };
        let failCallback = (code, message) => {
            PageView.clearLoading(this.pageView,()=>{
                PageView.toError(this.pageView,message);
            });
        };
        HttpTool.post(APIGYW.base_basedata_dataapi_areas_search, successCallback, failCallback, param);
    }

    renderListRow(data) {
        return (<SelectCell key={'list_item_' + data.id}
                        style={[styles.row,{backgroundColor:YITU.backgroundColor_0}]}
                        onPress={() => {
                            if (this.props.callback) {
                                this.props.callback(data.AreaCode);
                            }
                            navigation.pop(this);
                        }}>
                <View style={styles.rowCon}>
                    <View style={styles.leftRowCon}>
                        <Text style={styles.rowName}>{data.name}</Text>
                        <Text style={styles.rowEnName}>{data.enName}</Text>
                    </View>
                    <View style={styles.codeView}>
                        <Text style={styles.rowName}>{"+ " + data.AreaCode}</Text>
                    </View>
                </View>
            </SelectCell>);
    }

    renderListSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.sectionView}>
                <Text style={styles.sectionText}>
                    {sectionData}
                </Text>
            </View>);
    }

    search() {
        log(this.state.value);
        if (!this.state.value) {
            if (this.state.isSearch) {
                this.setState({
                    searchList: []
                })
            }
        } else {
            if (/.*[\u4e00-\u9fa5]+.*$/.test(this.state.value)) { //包含中文
                this.searchChinese();
            } else if (!isNaN(this.state.value)) {
                this.searchNumber()
            } else {
                this.searchEn();
            }
        }
    }

    searchNumber() {
        let array = this.state.allCityList.concat();
        let newArray = lodash.filter(array, (item) => {
            return item && item.AreaCode && (item.AreaCode.toString().indexOf(this.state.value) > -1);
        });
        this.setState({
            searchList: newArray,
        });
    }

    searchEn() {
        let array = this.state.allCityList.concat();
        let newArray = lodash.filter(array, (item) => {
            return item && item.enName && (item.enName.indexOf(this.state.value) > -1);
        });
        this.setState({
            searchList: newArray,
        });
    }

    searchChinese() {
        let array = this.state.allCityList.concat();
        let newArray = lodash.filter(array, (item) => {
            return item && item.name && (item.name.indexOf(this.state.value) > -1);
        });
        this.setState({
            searchList: newArray,
        });
    }

    renderSearch() {
        return (<View
            style={{
                backgroundColor: YITU.c_bg_white,
                height: extralTopHeight,
                justifyContent: 'center'
            }}>
            <View style={styles.textInputView}>
                <Image style={{width: 17, height: 17, marginRight: YITU.space_1}}
                       source={require("../../image/login/search.png")}/>
                <TextInput
                    ref={(a)=>this.refInput = a}
                    multiline={false} style={styles.textInputStyle}
                           underlineColorAndroid={"transparent"}
                           placeholder={"搜索国家或区号"}
                           value={this.state.value}
                           onChangeText={(text) => this.setState({value: text, isSearch: text.length > 0}, () => {
                               this.search();
                           })}
                           placeholderTextColor={YITU.textColor_5}
                           selectionColor={"rgb(63,94,229)"}
                           showsVerticalScrollIndicator={false}
                />
            </View>
        </View>);
    }

    renderSearchList() {
        return (<FlatList
            data={this.state.searchList}
            onScrollBeginDrag={(...e)=>{
                this.refInput.blur();
            }}
            keyboardShouldPersistTaps = {"handled"}
            renderItem={({item}) => {
                if (item) {
                    return this.renderListRow(item)
                } else {
                    return null
                }
            }}
            keyExtractor={(item, index) => {
                return index;
            }}
        />);
    }

    render() {
        let main = (
            <View style={styles.main}>
                {
                    this.renderSearch()
                }
                <View style={{flex: 1}}>
                    {
                        this.state.isSearch ? this.renderSearchList() :
                            <MyEditSectionList
                                onScrollBeginDrag={(...e)=>{
                                    this.refInput.blur();
                                }}
                                allCityList={this.state.allCityList}
                                renderListRow={this.renderListRow.bind(this)}
                                renderListSectionHeader={this.renderListSectionHeader.bind(this)}
                                extralTopHeight={extralTopHeight}
                                SECTIONHEIGHT={SECTIONHEIGHT}
                                ROWHEIGHT={ROWHEIGHT}
                            />
                    }
                </View>
              

            </View>);
        return  (<PageView
            ref={(ref) => {
                this.pageView = ref;
            }}
            config={PageView.defaultConfig(this, {
                navBack: () => {
                    navigation.pop(this,);
                },
                pageLoading:true,
                autoCloseLoading: false,
                barConfig: {
                    title: this.props.title,
                },
                refresh: () => {
                    //刷新
                    PageView.toLoading(this.pageView, () => {
                        this.httpGetData()
                    })
                }
            })}
        >
            {main}
        </PageView>);
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    sectionView: {
        paddingVertical: YITU.space_0,
        height: SECTIONHEIGHT,
        width: YITU.screenWidth,
        paddingLeft: YITU.space_5,
        backgroundColor: YITU.backgroundColor_14,
    },
    sectionText: {
        color: YITU.textColor_0,
        fontSize: YITU.fontSize_5
    },
    textInputView: {
        height: 40,
        marginHorizontal: YITU.space_5,
        paddingHorizontal: YITU.space_2,
        borderRadius: YITU.radius_2,
        backgroundColor: "rgb(244,244,244)",
        flexDirection: "row",
        alignItems: 'center',
    },
    textInputStyle: {
        flex: 1,
        height: 40,
        fontSize: YITU.fontSize_15,
        color: YITU.textColor_1
    },
    row:{
        width:"100%",
        backgroundColor: YITU.c_bg_white,
    },
    rowCon:{
        flex: 1,
        flexDirection: "row",
        marginHorizontal: YITU.space_5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: "solid",
        borderColor: YITU.backgroundColor_Line,
        height:ROWHEIGHT,
    },
    leftRowCon:{
        flex:1,
        justifyContent:"center",
    },
    rowName:{
        color: YITU.textColor_1,
        fontSize: YITU.fontSize_5
    },
    rowEnName:{
        color: YITU.textColor_2,
        paddingTop: YITU.space_0,
        fontSize: YITU.fontSize_3,
    },
    codeView:{
        marginRight: YITU.space_2,
        alignSelf:"center"
    }
});

module.exports = AreaCodeChoose;