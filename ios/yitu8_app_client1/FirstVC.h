//
//  FirstVC.h
//  yitu8_app_client1
//
//  Created by 葛艳威 on 2018/9/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#define WIDTH (NSInteger)self.view.bounds.size.width
#define HEIGHT (NSInteger)self.view.bounds.size.height

@interface FirstVC : UIViewController<UIScrollViewDelegate>
@property (nonatomic, strong)UIViewController *rootVC;
@end
