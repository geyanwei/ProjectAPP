
'use strict';
import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
    Image,
    TouchableOpacity,
} from 'react-native';

var defaultWH;
class MyImage extends Component {

  constructor(props) {
    super(props);
      // log("构造器");
    this.state = {
        error:null,
        width :0,
        height :0,
        updata:false,

    };
     this.defaultWH = 100;
      var w = this.props.maxWidth;
      var h =  this.props.maxHeight;
      if(w&&h){
          // log("不更新,直接");
          this.updataWH(w,h,false);
      }else if(!w&&!h){
          //都不存在,设置默认
          w  = h = this.defaultWH;
          // log("不存在,直接");
          this.updataWH(w,h,false);
      }else{
          Image.getSize(this.props.url,(width,height) =>{
              // log("下载大小成功 w:"+width+"h:"+height);
              if(w){
                  //改变高
                  h =  height/width * w;  //计算比例
                  // log("更新H");
              }else{
                  //改变宽
                  w  = width/height * h;  //计算比例
                  // log("更新W");
              }

              this.updataWH(w,h,true);
          },(error) => {
              this.setState({
                  updata:true,
                  error:error,
              });

          });
      }

  }

  updataWH(w,h,update){
    // log(this.props.index+"ww:"+w+"hh:"+h);
      this.state.width = w;
      this.state.height = h;
      this.state.updata = true;
      if(update){
          this.setState({
              updata:true,
          });
      }

}
//返回渲染的VIEW
  render() {

      if(!this.state.updata){
          return <Text>图片...</Text>;
      }
      if(this.state.error){
          //图片加载错误
          log(this.state.error);
          return <Text>图片加载错误:{this.state.error.message}</Text>;
      }
      var {...props} = this.props;
    return (
    <Image
        {...props}
        style={[this.props.style,{
            width:this.state.width,
            height:this.state.height,
            }]}
        source={{uri: this.props.url}}
    >

        </Image>
    );
  }
  }




module.exports = MyImage;
