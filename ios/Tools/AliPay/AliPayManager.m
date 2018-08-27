//
//  AliPayManager.m
//  AwesomeProject
//
//  Created by wangZL on 2017/6/29.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "AliPayManager.h"
#import <React/RCTViewManager.h>
#import <React/RCTBridge.h>
#import <AlipaySDK/AlipaySDK.h>


@implementation AliPayManager

@synthesize bridge=_bridge;

//默认名称
RCT_EXPORT_MODULE()

//对外提供方法
RCT_EXPORT_METHOD(aliPay:(NSString *)signedString){
  NSString *appScheme = @"yitu8";
  NSLog(@"支付宝签名：%@",signedString);
  // NOTE: 调用支付结果开始支付
  [[AlipaySDK defaultService] payOrder:signedString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    NSLog(@"支付宝支付结果：reslut = %@",resultDic);
    [self.bridge.eventDispatcher sendAppEventWithName:@"EventAliPay" body:@{@"result":resultDic}];
  }];
}
RCT_EXPORT_METHOD(isAliPayInstalled:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null], @( [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"alipays://"]])]);
}
@end
