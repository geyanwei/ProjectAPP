//
//  MapNativeModule.m
//  yitu8sidao
//
//  Created by 潘之平 on 2018/4/27.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "MapNativeModule.h"
#import <MapKit/MapKit.h>
#import <CoreLocation/CoreLocation.h>

@implementation MapNativeModule

//默认名称
RCT_EXPORT_MODULE()

//判断是否安装高德地图
//RCT_EXPORT_METHOD(exist_Gaode:(RCTResponseSenderBlock)callback){
//  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"iosamap://"]]) {
//    callback(@[@YES]);
//  }else{
//     callback(@[@NO]);
//  }
//}

//打开高德地图
-(void)open_Gaode :(double)latitude : (double)Longitude {
  CLLocationCoordinate2D coor2D;
  coor2D = CLLocationCoordinate2DMake(latitude, Longitude);
  
  NSString *urlsting =[[NSString stringWithFormat:@"iosamap://navi?sourceApplication= &backScheme= &lat=%f&lon=%f&dev=0&style=2",coor2D.latitude,coor2D.longitude]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  [[UIApplication  sharedApplication]openURL:[NSURL URLWithString:urlsting]];
}

//判断是否安Waze地图
//RCT_EXPORT_METHOD(exist_Waze:(RCTResponseSenderBlock)callback){
//  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"waze://"]]) {
//    callback(@[@YES]);
//  }else{
//    callback(@[@NO]);
//  }
//}

//打开Waze地图
-(void)open_Waze: (double)latitude : (double)Longitude {
  CLLocationCoordinate2D coor2D;
  coor2D = CLLocationCoordinate2DMake(latitude, Longitude);
  
  NSString *urlsting =
  [NSString stringWithFormat:@"waze://?ll=%f,%f&navigate=yes",
   latitude, Longitude];
  NSLog(@"%@",urlsting);
  NSLog(@"===============");
  [[UIApplication  sharedApplication]openURL:[NSURL URLWithString:urlsting]];
}

//判断是否安装百度地图
//RCT_EXPORT_METHOD(exist_Baidu:(RCTResponseSenderBlock)callback){
//  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"baidumap://"]]) {
//    callback(@[@YES]);
//  }else{
//    callback(@[@NO]);
//  }
//}

//打开百度地图
-(void)open_Baidu: (double)latitude : (double)Longitude{
  CLLocationCoordinate2D coor2D;
  coor2D = CLLocationCoordinate2DMake(latitude, Longitude);
  
  NSString *urlsting =[[NSString stringWithFormat:@"baidumap://map/direction?origin={{我的位置}}&destination=latlng:%f,%f|name=目的地&mode=driving&coord_type=gcj02",coor2D.latitude,coor2D.longitude] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlsting]];
}

//判断是否安装google地图
//RCT_EXPORT_METHOD(exist_Google:(RCTResponseSenderBlock)callback){
//  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"comgooglemaps://"]]) {
//    callback(@[@YES]);
//  }else{
//    callback(@[@NO]);
//  }
//}

//打开gogle地图
-(void)open_Google :(double)latitude : (double)Longitude {
  CLLocationCoordinate2D coor2D;
  coor2D = CLLocationCoordinate2DMake(latitude, Longitude);
  
  NSString *urlString = [[NSString stringWithFormat:@"comgooglemaps://?x-source=%@&x-success=%@&saddr=&daddr=%f,%f&directionsmode=driving",@"易途8", @"QQ41e6e163",coor2D.latitude, coor2D.longitude] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlString]];
}

//打开雅虎地图
-(void)open_yjmap :(double)latitude : (double)Longitude {
  CLLocationCoordinate2D coor2D;
  coor2D = CLLocationCoordinate2DMake(latitude, Longitude);
  
  NSString *urlString = [[NSString stringWithFormat:@"yjmap://maps/?lat=%f&lon=%f&zoom=14&layer=none&login=0&client=map.yahoo.co.jp.button&maptype=map",coor2D.latitude, coor2D.longitude] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlString]];
}

//打开自带地图
-(void)open_Default :(double)latitude :(double)Longitude{
  CLLocationCoordinate2D coor2D;
  coor2D = CLLocationCoordinate2DMake(latitude, Longitude);
  MKMapItem *currentLocation =[MKMapItem mapItemForCurrentLocation];
  MKMapItem *toLocation = [[MKMapItem alloc] initWithPlacemark:[[MKPlacemark alloc] initWithCoordinate:coor2D addressDictionary:nil]];
  
  [MKMapItem openMapsWithItems:@[currentLocation,toLocation] launchOptions:@{MKLaunchOptionsDirectionsModeKey:MKLaunchOptionsDirectionsModeDriving,
                                                                             MKLaunchOptionsShowsTrafficKey:[NSNumber numberWithBool:YES]}];
}

//判断手机安装的地图列表
RCT_EXPORT_METHOD(mapList:(RCTResponseSenderBlock)callback){
  NSArray *ary = @[@"iosamap",@"waze",@"comgooglemaps",@"yjmap"];
  NSArray *stringAry = @[@"高德地图",@"waze",@"谷歌地图",@"雅虎地图"];
  NSMutableArray *mapAry =[NSMutableArray arrayWithCapacity:0];
  
  for (int i = 0; i<ary.count; i++) {
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@://",ary[i]]];
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
      NSDictionary *dic = @{@"key":ary[i],@"name":stringAry[i]};
      [mapAry addObject:[dic copy]];
    }
  }
  NSLog(@"=======%@", mapAry);
  NSDictionary *dic = @{@"mapList":mapAry};
  callback(@[dic]);
}

//打开手机安装地图
RCT_EXPORT_METHOD(openMap:(NSString*)key :(double)latitude : (double)Longitude){
  if([key isEqualToString:@"iosamap"]){
    [self open_Gaode:latitude :Longitude];
  }else if([key isEqualToString:@"waze"]){
    [self open_Waze:latitude :Longitude];
  }else if([key isEqualToString:@"comgooglemaps"]){
    [self open_Google:latitude :Longitude];
  }else if([key isEqualToString:@"yjmap"]){
    [self open_yjmap:latitude :Longitude];
  }else{
    [self open_Default:latitude :Longitude];
  }
}

@end
