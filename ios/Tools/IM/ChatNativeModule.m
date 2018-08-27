//
//  Chat.m
//  yitu8sidao
//
//  Created by 潘之平 on 2018/5/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ChatNativeModule.h"
#import "AppDelegate.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <RCTJPushModule.h>

@implementation ChatNativeModule


@synthesize bridge = _bridge;
//默认名称
RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(sendMessage:(NSDictionary *)personServer){
  
  @try{
    
  } @catch(NSError *e){
    
  }
}

RCT_EXPORT_METHOD(getMessageList:(NSDictionary *)server){
  
}

//登录
RCT_EXPORT_METHOD(login:(NSDictionary *)user){}

RCT_EXPORT_METHOD(getMessageDic:(NSDictionary *)personServer:(RCTResponseSenderBlock)callback){}

#pragma mark - 清除角标

RCT_EXPORT_METHOD(deleteBadgeNumber){}

#pragma mark - 退出IM登录
RCT_EXPORT_METHOD(logout){
  NSLog(@"走了退出登录");
}

RCT_EXPORT_METHOD(getServiceMessage:(RCTResponseSenderBlock)callback){
  
  self.callbcak = callback;
}


RCT_EXPORT_METHOD(jumpToIM:(NSDictionary *)personServer: (RCTResponseSenderBlock)callback){}

- (void)leftAction
{
 
}



@end
