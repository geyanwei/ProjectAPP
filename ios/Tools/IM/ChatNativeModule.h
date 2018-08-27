//
//  Chat.h
//  yitu8sidao
//
//  Created by 潘之平 on 2018/5/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface ChatNativeModule  : NSObject<RCTBridgeModule>


@property (nonatomic, assign) RCTResponseSenderBlock callbcak;


@end
