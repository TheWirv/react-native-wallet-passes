//
//  RNWPAddPassButtonManager.m
//  RNWalletPasses
//
//  Created by Masayuki Iwai on 2018/02/13.
//  Copyright © 2018 Masayuki Iwai. All rights reserved.
//

#import <PassKit/Passkit.h>
#import "RNWPAddPassButtonManager.h"
#import "RNWPAddPassButtonContainer.h"
#import "RCTConvert+RNWalletPasses.h"

@implementation RNWPAddPassButtonManager

RCT_EXPORT_MODULE()

RCT_CUSTOM_VIEW_PROPERTY(addPassButtonStyle, PKAddPassButtonStyle, RNWPAddPassButtonContainer) {
    view.addPassButtonStyle = json ? [RCTConvert PKAddPassButtonStyle:json] : defaultView.addPassButtonStyle;
}

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

- (UIView *)view {
    RNWPAddPassButtonContainer *addPassButtonContainer = [[RNWPAddPassButtonContainer alloc] initWithAddPassButtonStyle:PKAddPassButtonStyleBlack];
    return addPassButtonContainer;
}

@end
