//
//  WeChatNativeModule.m
//  yitu8_app_driver
//
//  Created by 潘之平 on 2018/5/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "WeChatNativeModule.h"

@implementation WeChatNativeModule
//默认名称
RCT_EXPORT_MODULE()

//打开微信
RCT_EXPORT_METHOD(open_weixin:(RCTResponseSenderBlock)callback) {
  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"weixin://"]]) {
    callback(@[@YES]);
    NSURL *url = [NSURL URLWithString:@"weixin://"];
    [[UIApplication sharedApplication] openURL:url];
  }else{
    callback(@[@NO]);
  }
}

@end




