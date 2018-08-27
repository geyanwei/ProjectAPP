//
//  JPushNativeModule.m
//  yitu8_app_driver
//
//  Created by 潘之平 on 2018/5/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "JPushNativeModule.h"
#import "JPUSHService.h"

@implementation JPushNativeModule


//默认名称
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getRegistrationId :(RCTResponseSenderBlock)callback){
  NSString * ID = @"";
  if([JPUSHService registrationID]) {
    ID = [JPUSHService registrationID];
    NSLog(@"%@%@", @"registrationId---------",ID);
  }
  callback(ID);
}

@end
