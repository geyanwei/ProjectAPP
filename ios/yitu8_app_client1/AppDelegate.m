/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif


#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTLinkingManager.h>
#import <AlipaySDK/AlipaySDK.h>

#import "WelcomeVC.h"
#import "FirstVC.h"

#import "RNUMConfigure.h"
#import <UMAnalytics/MobClick.h>
#import<UMSocialCore/UMSocialCore.h>

@implementation AppDelegate

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [JPUSHService registerDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object: notification.userInfo];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler
{
  NSDictionary * userInfo = notification.request.content.userInfo;
  if ([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }

  completionHandler(UNNotificationPresentationOptionAlert);
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
{
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if ([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotification object:userInfo];
  }

  completionHandler();
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc]
                           initWithBundleURL:jsCodeLocation
                           moduleName:@"yitu8_app_client1"
                           initialProperties:nil
                           launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  
  
  if([[NSUserDefaults standardUserDefaults] boolForKey:@"firstLaunch"]) {
    NSLog(@"首次启动");
    self.window.rootViewController = rootViewController;
  }else {
    NSLog(@"非首次启动");
    WelcomeVC *root = [[WelcomeVC alloc] init];
    root.rootVC  = rootViewController;
    self.window.rootViewController = root;
  }
  [self init_UM];
  
  [self.window makeKeyAndVisible];
  return YES;
}

-(void)init_UM {
//  //友盟测试:5b39f077b27b0a165b000083  正式:57ea22eae0f55a8a6f0010ef
  [RNUMConfigure initWithAppkey:@"5b39f077b27b0a165b000083" channel:@"App Store"];
  [MobClick setScenarioType:E_UM_NORMAL];
  /* 打开调试日志 */
  [[UMSocialManager defaultManager] openLog:YES];

  [self configUSharePlatforms];
  
  [self confitUShareSettings];
  
}

- (void)confitUShareSettings
{
  [UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;
}
- (void)configUSharePlatforms
{
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession
                                        appKey:@"wx90c6e3efd0512067" appSecret:@"76baaf969774bf8adcddc61b9fbfd98c" redirectURL:nil];
  
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1105195698"
                                     appSecret:nil redirectURL:@"yitu8.net.user"];
  
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"1610395310"  appSecret:@"9d49903d796e461968b6ac1f7ada4755" redirectURL:@"http://sns.whalecloud.com/sina2/callback"];
}

//9.0之前接口
-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(nullable NSString *)sourceApplication annotation:(nonnull id)annotation{
  if ([url.host isEqualToString:@"safepay"]) {
    //跳转支付宝钱包进行支付，处理支付结果
    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
      NSLog(@"result = %@",resultDic);
    }];
  }
  if ( [RCTLinkingManager application:application openURL:url
                    sourceApplication:sourceApplication annotation:annotation]) {
    return YES;
  }
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
  if(result){
    return YES;
  }else{
    return NO;
  }
  return NO;
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  if ([[UIApplication sharedApplication] respondsToSelector:@selector(registerForRemoteNotifications)]) {
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  }
}

//9.0之后新接口
-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
  if ([url.host isEqualToString:@"safepay"]) {
    //跳转支付宝钱包进行支付，处理支付结果
    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
      NSLog(@"result = %@",resultDic);
    }];
  }
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url options:options];
  if(result){
    return YES;
  }
  return YES;
}

@end
