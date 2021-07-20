//
//  RNWalletPass.h
//  RNWalletPass
//
//  Created by Masayuki Iwai on 2018/02/09.
//  Copyright © 2018 Masayuki Iwai. All rights reserved.
//

#import <PassKit/PassKit.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTUtils.h>

@interface RNWalletPass : RCTEventEmitter<RCTBridgeModule, PKAddPassesViewControllerDelegate>

@end
