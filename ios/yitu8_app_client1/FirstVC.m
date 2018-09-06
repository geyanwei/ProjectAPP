//
//  FirstVC.m
//  yitu8_app_client1
//
//  Created by 葛艳威 on 2018/9/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "FirstVC.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface FirstVC (){
  // 创建页码控制器
  UIPageControl *pageControl;
}

@end

@implementation FirstVC

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  UIScrollView *myScrollView = [[UIScrollView alloc] initWithFrame:CGRectMake(0, 0, WIDTH, HEIGHT)];
  
  for (int i=0; i<3; i++){
    UIImage *image = [UIImage imageNamed:[NSString stringWithFormat:@"1-%d.jpg",i+1]];
    UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(WIDTH * i, 0, WIDTH, HEIGHT)];
    // 在最后一页创建按钮
    if (i == 2)
    {
      // 必须设置用户交互 否则按键无法操作
      imageView.userInteractionEnabled = YES;
      UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
      button.frame = CGRectMake(WIDTH / 3, HEIGHT * 7 / 8, WIDTH / 3, HEIGHT / 16);
      [button setTitle:@"点击进入" forState:UIControlStateNormal];
      [button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
      button.layer.borderWidth = 2;
      button.layer.cornerRadius = 5;
      button.clipsToBounds = YES;
      button.layer.borderColor = [UIColor whiteColor].CGColor;
      [button addTarget:self action:@selector(go:) forControlEvents:UIControlEventTouchUpInside];
      [imageView addSubview:button];
    }
    imageView.image = image;
    [myScrollView addSubview:imageView];
  }
  myScrollView.bounces = NO;
  myScrollView.pagingEnabled = YES;
  myScrollView.showsHorizontalScrollIndicator = NO;
  myScrollView.contentSize = CGSizeMake(WIDTH * 3, HEIGHT);
  myScrollView.delegate = self;
  
  [self.view addSubview:myScrollView];
  
  pageControl = [[UIPageControl alloc] initWithFrame:CGRectMake(WIDTH / 3, HEIGHT * 15 / 16, WIDTH / 3, HEIGHT / 16)];
  // 设置页数
  pageControl.numberOfPages = 3;
  // 设置页码的点的颜色
  pageControl.pageIndicatorTintColor = [UIColor yellowColor];
  // 设置当前页码的点颜色
  pageControl.currentPageIndicatorTintColor = [UIColor redColor];
  [self.view addSubview:pageControl];
}

#pragma mark - UIScrollViewDelegate
-(void)scrollViewDidScroll:(UIScrollView *)scrollView{
  // 计算当前在第几页
  pageControl.currentPage = (NSInteger)(scrollView.contentOffset.x / [UIScreen mainScreen].bounds.size.width);
  
}

// 点击按钮保存数据并切换根视图控制器

- (void) go:(UIButton *)sender{
  [[NSUserDefaults standardUserDefaults]setBool:YES forKey:@"firstLaunch"];
  [UIApplication sharedApplication].keyWindow.rootViewController = self.rootVC;
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
