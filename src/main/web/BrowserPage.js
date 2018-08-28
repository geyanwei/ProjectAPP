
import React, {
    Component,
} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    WebView,
    DeviceInfo,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PageView,navigation} from 'myapplib';

const barStateHeight = Platform.OS === 'android' ? 0 : DeviceInfo.isIPhoneX_deprecated ? 44 : 20;

class page extends Component {

    constructor(props){
        super(props);
        this.state={
            title:'',
            back:false
        }
    }

    leftButton(){
        log("1111");
        if (this.state.back){
            log("1111");
            this.webView.goBack();
        } else {
            log("22222");
            navigation.pop(this)
        }
    }


    onNavigationStateChange(value){
        log(value.canGoBack+"----------------------"+JSON.stringify(value));
        this.setState({
            title:value.title,
            back:value.canGoBack
        })
    }

    //组件的视图核心  渲染显示
    render() {
        let close = this.state.back? <TouchableOpacity style={{marginLeft:YITU.space_1,justifyContent:'center'}}
                                       onPress={()=>{
                                           navigation.pop(this)
                                       }}>
            <Text style={styles.leftTitle}>关闭</Text>
        </TouchableOpacity>:null;
        var main = (
            <View style={{flex: 1,backgroundColor:YITU.backgroundColor_1}}>
                <View style={styles.navbar}>
                    <Text style={styles.title}>
                        {this.state.title}
                    </Text>
                    <TouchableOpacity style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}
                        onPress={()=>this.leftButton()}>
                        <Image style={{width: 10 / 18 * YITU.d_icon_small,height:YITU.d_icon_small}}
                               source={require('../../image/img_back_blue.png')}/>
                        <Text style={[styles.leftTitle,{marginLeft:YITU.space_0}]}>返回</Text>
                    </TouchableOpacity>
                    {close}
                </View>

                <WebView
                    ref={(ref)=>{
                        this.webView=ref;
                    }}
                    automaticallyAdjustContentInsets={false}
                    style={{
                        flex: 1,
                        backgroundColor:YITU.backgroundColor_1,
                    }}
                    source={{uri: this.props.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    renderError={() => {
                        return (<View>
                            <Text>无效的URl :{this.props.url}</Text>
                        </View>)
                    }}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    allowFileAccessFromFileURLs={true}
                    allowUniversalAccessFromFileURLs={true}
                />
            </View>
        );

        return  (
            <PageView
                ref={(ref)=>{
                    this.pageView = ref;
                }}
                config={PageView.defaultConfig(this,{
                    // barConfig:this.navBar(),
                    full:true,

                })}
            >
                {main}
            </PageView>
        );
    }
}

const styles=StyleSheet.create({
    navbar:{
        height:YITU.navBarHeight,
        paddingHorizontal:YITU.space_2,
        backgroundColor:'white',
        flexDirection:'row',
        paddingTop:YITU.barStateHeight,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:YITU.backgroundColor_Line,
        borderStyle:"solid"
    },
    title:{
        color:YITU.textColor_1,
        fontSize:YITU.fontSize_7,
        fontFamily:YITU.fontName_regular,
        textAlign:'center',
        position:'absolute',
        top:YITU.space_2+YITU.barStateHeight,
        left:0,
        right:0,
        fontWeight: "bold",
        width:YITU.screenWidth,
        backgroundColor:YITU.backgroundColor_clear,
    },
    leftTitle:{
        // alignSelf:'center',
        color:YITU.textColor_4,
        fontSize:YITU.fontSize_4,
    }

});

module.exports = page;
