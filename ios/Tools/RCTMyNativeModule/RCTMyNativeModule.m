//
//  RCTMyNativeModule.m
//  RCTMyNativeModule
//
//  Created by oliver on 15/05/2018.
//  Copyright © 2018 oliver. All rights reserved.
//


#import "RCTMyNativeModule.h"
#import <React/RCTViewManager.h>
#import <React/RCTBridge.h>
#import "sys/utsname.h"

static NSString * const packageName = @"packageName";
static NSString * const versionName = @"versionName";
static NSString * const versionCode = @"versionCode";
static NSString * const deviceId = @"deviceId";
static NSString * const productName = @"productName";
@implementation RCTMyNativeModule

@synthesize bridge = _bridge;

//默认名称
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(callPhone:(NSString *)phoneNum : (RCTResponseSenderBlock)callback) {
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[NSString stringWithFormat:@"telprompt:%@", phoneNum]]];
  callback(@[ @{@"code":@"1", @"msg":@"拨打电话成功"} ]);
}

RCT_EXPORT_METHOD(open_set:(RCTResponseSenderBlock)callback) {
  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]]) {
    callback(@[@YES]);
    NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
    [[UIApplication sharedApplication] openURL:url];
  }else{
    callback(@[@NO]);
  }
}

RCT_EXPORT_METHOD(reload){
  dispatch_async(dispatch_get_main_queue(), ^{
    [_bridge reload];
  });
}

RCT_EXPORT_METHOD(getNotificationStatus:(RCTResponseSenderBlock)callback) {
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([[[UIApplication sharedApplication] currentUserNotificationSettings] types] == 0) {
      callback(@[@NO]);
    }else{
      callback(@[@YES]);
    }
  });
  
}

//判断字符串是不是纯数字
- (BOOL) isPureInt:(NSString *)str
{
  if (str.length == 0) {
    return NO;
  }
  NSString *regex = @"[0-9]*";
  NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",regex];
  if ([pred evaluateWithObject:str]) {
    return YES;
  }
  return NO;
}

- (NSDictionary *)constantsToExport {
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSMutableDictionary *ret = [NSMutableDictionary new];
  ret[@"packageName"] = [[NSBundle mainBundle] bundleIdentifier];
  ret[@"versionName"] = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
  ret[@"versionCode"] = [infoDictionary objectForKey:@"CFBundleVersion"];
  ret[@"deviceId"] = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
  ret[@"systemVersion"] = [[UIDevice currentDevice] systemVersion];
  ret[@"productName"] = [self deviceVersion];
  return ret;
}

- (NSString*)deviceVersion
{
  // 需要#import "sys/utsname.h"
  struct utsname systemInfo;
  uname(&systemInfo);
  NSString *deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
  
  //iPhone
  if ([deviceString isEqualToString:@"iPhone1,1"])    return @"iPhone 1G";
  if ([deviceString isEqualToString:@"iPhone1,2"])    return @"iPhone 3G";
  if ([deviceString isEqualToString:@"iPhone2,1"])    return @"iPhone 3GS";
  if ([deviceString isEqualToString:@"iPhone3,1"])    return @"iPhone 4";
  if ([deviceString isEqualToString:@"iPhone3,2"])    return @"Verizon iPhone 4";
  if ([deviceString isEqualToString:@"iPhone4,1"])    return @"iPhone 4S";
  if ([deviceString isEqualToString:@"iPhone5,1"])    return @"iPhone 5";
  if ([deviceString isEqualToString:@"iPhone5,2"])    return @"iPhone 5";
  if ([deviceString isEqualToString:@"iPhone5,3"])    return @"iPhone 5C";
  if ([deviceString isEqualToString:@"iPhone5,4"])    return @"iPhone 5C";
  if ([deviceString isEqualToString:@"iPhone6,1"])    return @"iPhone 5S";
  if ([deviceString isEqualToString:@"iPhone6,2"])    return @"iPhone 5S";
  if ([deviceString isEqualToString:@"iPhone7,1"])    return @"iPhone 6 Plus";
  if ([deviceString isEqualToString:@"iPhone7,2"])    return @"iPhone 6";
  if ([deviceString isEqualToString:@"iPhone8,1"])    return @"iPhone 6s";
  if ([deviceString isEqualToString:@"iPhone8,2"])    return @"iPhone 6s Plus";
  if ([deviceString isEqualToString:@"iPhone8,4"]) return @"iPhone SE";
  if ([deviceString isEqualToString:@"iPhone9,1"]) return @"iPhone 7";
  if ([deviceString isEqualToString:@"iPhone9,2"]) return @"iPhone 7 Plus";
  if ([deviceString isEqualToString:@"iPhone10,1"]) return @"iPhone 8";
  if ([deviceString isEqualToString:@"iPhone10,2"]) return @"iPhone 8 Plus";
  if ([deviceString isEqualToString:@"iPhone10,3"]) return @"iPhone X";
  
  if ([deviceString isEqualToString:@"i386"])      return @"iPhone Simulator";
  if ([deviceString isEqualToString:@"x86_64"])    return @"iPhone Simulator";
  return deviceString;
}
@end



