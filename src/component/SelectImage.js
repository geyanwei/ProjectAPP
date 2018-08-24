/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org/
 * @flow
 */

import React, {Component} from 'react';
import {} from 'react-native'
var ImagePicker = require('react-native-image-picker');
/**
 * base64:上传图片数据
 *
 */
 class index  {
   static show(obj,callBack,option){
       if(this.isShow){
           return;
       }
       this.isShow = true;
       var options = {
            title: '选择图片',
            cancelButtonTitle:"取消",
            takePhotoButtonTitle:"拍照",
            chooseFromLibraryButtonTitle:"相册",
            quality:0.8,
            maxWidth:320,
            maxHeight:480,
            mediaType:"photo",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            ...option,
        };
        ImagePicker.showImagePicker(options, (response) => {
            setTimeout(()=>{
                this.isShow = false;
            },500);

            if (response.didCancel) {
                log('User cancelled image picker');
            } else if (response.error) {
                obj.showToast("请授予相册权限");
                log('ImagePicker Error: ', response.error);
            } else {
                callBack(response);
            }
        });
    }
}
module.exports = index;
