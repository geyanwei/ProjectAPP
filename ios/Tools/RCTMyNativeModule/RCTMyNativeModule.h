//
//  RCTMyNativeModule.h
//  RCTMyNativeModule
//
//  Created by oliver on 15/05/2018.
//  Copyright © 2018 oliver. All rights reserved.
//


#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
@interface RCTMyNativeModule : NSObject<RCTBridgeModule>

@property (nonatomic, assign) RCTResponseSenderBlock callbcak;


@end


