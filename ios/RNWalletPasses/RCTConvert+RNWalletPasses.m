//
//  RCTConvert+RNWalletPasses.m
//  RNWalletPasses
//
//  Created by Masayuki Iwai on 2018/02/13.
//  Copyright © 2018 Masayuki Iwai. All rights reserved.
//

#import <PassKit/PassKit.h>
#import "RCTConvert+RNWalletPasses.h"

@implementation RCTConvert (RNWalletPasses)

+ (PKAddPassButtonStyle)PKAddPassButtonStyle:(id)json {
  return (PKAddPassButtonStyle)json;
}

@end
