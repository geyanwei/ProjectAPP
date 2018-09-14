//  sharemodule.m
//  Created by Songlcy on 2017/12/01.

#import "sharemodule.h"

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <UMSocialCore/UMSocialCore.h>
#import <UMSocialCore/UMSocialManager.h>

@implementation sharemodule
RCT_EXPORT_MODULE(sharemodule)

- (UMSocialPlatformType)configPlatform: (NSInteger) platformType {
  
  UMSocialPlatformType type = UMSocialPlatformType_Sina;
  switch (platformType) {
    case 0:
      type = UMSocialPlatformType_QQ;
      break;
    case 1:
      type = UMSocialPlatformType_Qzone;
      break;
    case 2:
      type = UMSocialPlatformType_WechatSession;
      break;
    case 3:
      type = UMSocialPlatformType_WechatTimeLine;
      break;
    case 4:
      type = UMSocialPlatformType_Sina;
      break;
    default:
      break;
  }
  return type;
}

/**
 * 图片分享
 */
RCT_EXPORT_METHOD(shareImage:(NSString*)imagePath
                  platformType:(NSInteger)platformType
                  callback:(RCTResponseSenderBlock)callback){
  
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  
  //创建图片内容对象
  UMShareImageObject *shareObject = [[UMShareImageObject alloc] init];
  //如果有缩略图，则设置缩略图本地
  shareObject.shareImage = [NSString stringWithFormat:@"%@",imagePath];
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;

  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[UMSocialManager defaultManager] shareToPlatform: [self configPlatform: platformType]  messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      NSDictionary *obj = @{};
      NSLog(@"%@      ->      %@",data,error);
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
        if(error.code == 2009){
          obj = @{
                  @"message":@"取消分享",
                  @"code":[NSString stringWithFormat:@"%ld",(long)error.code]
                  };
        }else{
          obj = @{
                  @"message":@"分享失败",
                  @"code":[NSString stringWithFormat:@"%ld",(long)error.code]
                  };
        }
      }else{
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
          obj = @{
                  @"message":@"分享成功",
                  @"code":@1
                  };
        }else{
          UMSocialLogInfo(@"response data is %@",data);
          obj = @{
                  @"message":@"分享成功",
                  @"code":@1
                  };
        }
      }
      callback([[NSArray alloc]initWithObjects:obj,nil]);
    }];
  });
}


// 图文分享
RCT_EXPORT_METHOD(share:(NSString*)title
                  descr:(NSString*)descr
                  webpageUrl:(NSString*)webpageUrl
                  thumbURL:(NSString*)thumbURLl
                  NSInteger:(NSInteger)platformType
                  callback:(RCTResponseSenderBlock)callback){
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  
  if (platformType!=4) {
    //创建网页内容对象
    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:descr thumImage:thumbURLl];
    //设置网页地址
    shareObject.webpageUrl = webpageUrl;
    //分享消息对象设置分享内容对象
    messageObject.shareObject = shareObject;
  }else{
    messageObject.text = [NSString stringWithFormat:@"%@\n%@%@",title,descr,webpageUrl];
    //创建图片内容对象
    UMShareImageObject *shareObject = [[UMShareImageObject alloc] init];
    //如果有缩略图，则设置缩略图本地
    shareObject.shareImage = [NSString stringWithFormat:@"%@",thumbURLl];
    messageObject.shareObject = shareObject;
  }
  
  //调用分享接口
  [[UMSocialManager defaultManager] shareToPlatform: [self configPlatform: platformType]  messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
    NSDictionary *obj = @{};
    if (error) {
      UMSocialLogInfo(@"************Share fail with error %@*********",error);
      if(error.code == 2009){
        obj = @{
                @"message":@"取消分享",
                @"code":[NSString stringWithFormat:@"%ld",(long)error.code]
                };
      }else{
        obj = @{
                @"message":@"分享失败",
                @"code":[NSString stringWithFormat:@"%ld",(long)error.code]
                };
      }
    }else{
      if ([data isKindOfClass:[UMSocialShareResponse class]]) {
        UMSocialShareResponse *resp = data;
        //分享结果消息
        UMSocialLogInfo(@"response message is %@",resp.message);
        //第三方原始返回的数据
        UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
        obj = @{
                @"message":@"分享成功",
                @"code":@1
                };
      }else{
        UMSocialLogInfo(@"response data is %@",data);
        obj = @{
                @"message":@"分享成功",
                @"code":@1
                };
      }
    }
    callback([[NSArray alloc]initWithObjects:obj,nil]);
  }];
}

// 官方不推荐使用该方式
//RCT_EXPORT_METHOD(authLogin:(NSInteger)platformType callback:(RCTResponseSenderBlock)callback){
//  [[UMSocialManager defaultManager] authWithPlatform: [self configPlatform:platformType] currentViewController:nil completion:^(id result, NSError *error) {
//
//    NSDictionary *userdata = nil;
//    NSNumber *code = @0;
//
//    if(error){
//      code = @1;
//      userdata = @{
//                   @"code": code
//                   };
//    } else {
//      UMSocialAuthResponse *authresponse = result;
//
//      userdata = @{
//                   @"code": code,
//                   @"uid": authresponse.uid,
//                   @"accessToken": authresponse.accessToken
//                   };
//    }
//    callback( [[NSArray alloc] initWithObjects: userdata, nil]);
//  }];
//}

// 授权第三方登录
RCT_EXPORT_METHOD(authLogin: (NSInteger) platformType callback: (RCTResponseSenderBlock) callback) {
  
  [[UMSocialManager defaultManager] getUserInfoWithPlatform: [self configPlatform: platformType]  currentViewController:[UIApplication sharedApplication].keyWindow.rootViewController completion:^(id result, NSError *error) {

      NSDictionary *userdata = nil;
      if(error) {
        userdata = @{
                     @"msg":@"获取失败",
                     @"code": @0
                   };
      } else {
        UMSocialUserInfoResponse *userinfo = result;
        userdata = @{
                     @"msg":@"获取成功",
                     @"code": @1,
                     @"userId": userinfo.uid,
                     @"accessToken": userinfo.accessToken,
                     @"userName": userinfo.name,
                     @"userAvatar": userinfo.iconurl,
                     @"userGender": userinfo.gender
                     };
      }
     callback( [[NSArray alloc] initWithObjects: userdata, nil]);
  }];
  
}

@end

