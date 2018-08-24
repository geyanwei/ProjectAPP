import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    DeviceEventEmitter,
} from 'react-native';

class UnReadView extends Component {

    constructor(props){
        super(props);
        this.listener=null;
        this.state={
            count:0,
        };
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener("hasUnRead",(value)=>{
            this.changeState(value);
        })
    }

    changeState(value){
        log("value==="+JSON.stringify(value));
        if(value.type){
            if (value&&value.count!==0){
                this.setState({
                    count:this.state.count-value.count,
                });
            }
        }else{
            if (value.count === this.state.count){
                return ;
            }else {
                this.setState({
                    count:value.count,
                });
            }
        }
    }

    componentWillUnmount(){
        this.listener.remove();
    }

    render() {
        let main = (this.state.count > 0 ? (
                <View style={[styles.image,{width:this.state.count>=10?22:16}]}>
                    <Text style={[styles.text]}>{this.state.count>99?"···":this.state.count}</Text>
                </View>
            ):null);
        return  main;
    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: YITU.backgroundColor_1,
    },
    image:{
        alignSelf:"center",
        width:16,
        height:16,
        backgroundColor:YITU.textColor_warn,
        borderRadius:8,
        left:10,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:YITU.c_title_white,
        fontSize:YITU.fontSize_14,
        alignSelf:'center',

    }
});

module.exports = UnReadView;
