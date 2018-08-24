import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import {Toast} from 'myapplib';
import SelectCell from '../../../../component/SelectCell';
class ServerCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            choose: false,
            no: this.props.data && this.props.data.number || 0
        }
    }

    componentDidMount() {

    }

    showClick(show) {
        this.setState({
            choose: show,
        })
    }

    showNo(no) {
        let newNO = 0;
        if (no !== undefined) {
            newNO = this.state.no + no;
        }
        this.setState({
            no: newNO
        })
    }

    updateNum(no) {
        if (no !== undefined) {
            this.setState({
                no: no
            })
        }

    }

    render() {
        let data = this.props.data;
        let name = data.name;
        let nameEn = data.enName;
        let width = YITU.d_icon;
        return (
            <SelectCell key={'list_item_' + data.id}
                              style={[{
                                  height: this.props.ROWHEIGHT || 0,
                                  paddingHorizontal: YITU.space_5,
                                  paddingVertical: YITU.space_2,
                                  width: '100%',
                                  flexDirection: "row",
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                              }, this.state.choose ? {backgroundColor: "#fff"} : {backgroundColor: 'transparent'}]}
                              onPress={() => {
                                  if (this.props.callBack) {
                                      this.props.callBack(data);
                                  }
                              }}>
                <View style={{
                    width: "50%", flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{justifyContent: 'space-between', flex: 1}}>
                        <Text numberOfLines={1}
                              ellipsizeMode={"tail"}
                              style={[{color: YITU.textColor_1}]}>
                            {name}
                        </Text>
                        <Text numberOfLines={1}
                              ellipsizeMode={"tail"}
                              style={[{
                                  color: YITU.textColor_2,
                                  marginTop: 5
                              }]}>
                            {nameEn}
                        </Text>
                    </View>
                    <View style={{marginRight: YITU.space_2}}>
                        {
                            this.state.no !== 0 ?
                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: YITU.backgroundColor_3,
                                    width: width,
                                    height: width,
                                    borderRadius: width / 2,
                                }}>
                                    <Text style={{color: YITU.c_title_white, fontSize: YITU.fontSize_2}}>{this.state.no}</Text>
                                </View> : null
                        }
                    </View>
                </View>
            </SelectCell>
        )
    }
}

const styles = StyleSheet.create({});

module.exports = ServerCell;