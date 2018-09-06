//
//  WelcomeVC.m
//  yitu8_app_client1
//
//  Created by 葛艳威 on 2018/9/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "WelcomeVC.h"
#import "FirstVC.h"
@interface WelcomeVC ()
@property(nonatomic,strong)UIView*lunchV;
@property(nonatomic,strong)UIImageView*imageV;
@end

@implementation WelcomeVC

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  _lunchV = [[UIView alloc] init];
  
  self.lunchV.frame = CGRectMake(0, 0, WIDTH, HEIGHT);
  
  [self.view addSubview:_lunchV];
  
  UIImageView*imageV = [[UIImageView alloc] initWithFrame:self.view.bounds];
  
  UIImage*image = [UIImage imageNamed:@"1.jpg"];
  
  imageV.image = image;
  
  [self.lunchV addSubview:imageV];
  
  [self.view bringSubviewToFront:self.lunchV];
  
  [NSTimer scheduledTimerWithTimeInterval:2 target:self selector:@selector(removelunch) userInfo:nil repeats:NO];
  
//  [NSTimer scheduledTimerWithTimeInterval:3.1 target:self selector:@selector(change) userInfo:nil repeats:NO];
  
}
-(void)removelunch{
  [self.lunchV removeFromSuperview];
  
  FirstVC *vc =[[FirstVC alloc] init];
  vc.rootVC = self.rootVC;
  self.view.window.rootViewController = vc;

}

- (void)change{
  self.view.window.rootViewController = [[FirstVC alloc] init];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
