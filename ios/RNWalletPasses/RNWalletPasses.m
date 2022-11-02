//
//  RNWalletPasses.m
//  RNWalletPasses
//
//  Created by Masayuki Iwai on 2018/02/09.
//  Copyright © 2018 Masayuki Iwai. All rights reserved.
//

#import <PassKit/PassKit.h>
#import "RNWalletPasses.h"

@implementation RNWalletPasses

{
    bool hasListenersRegistered;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(canAddPasses:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject) {
    resolve(@([PKAddPassesViewController canAddPasses]));
}

RCT_EXPORT_METHOD(addPass:(NSString *)base64Encoded
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject) {
    NSData *data = [[NSData alloc] initWithBase64EncodedString:base64Encoded options:NSUTF8StringEncoding];
    NSError *error;
    PKPass *pass = [[PKPass alloc] initWithData:data error:&error];
    
    if (error) {
        reject(@"", @"Failed to create pass.", error);
        return;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *rootViewController = [self getPresenterViewController];
        if (rootViewController) {
            PKAddPassesViewController *addPassesViewController = [[PKAddPassesViewController alloc] initWithPass:pass];
            addPassesViewController.delegate = self;
            [rootViewController presentViewController:addPassesViewController animated:YES completion:^{
                // Succeeded
                resolve(nil);
            }];
            return;
        }
        
        reject(@"", @"Failed to present PKAddPassesViewController.", nil);
    });
}

RCT_EXPORT_METHOD(addPasses:(NSArray *)base64EncodedFiles
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject) {

    NSMutableArray *pkpasses = [[NSMutableArray alloc]init];
    
    for (id base64Encoded in base64EncodedFiles) {
        NSLog(@"Encoded passes: %@", base64Encoded);
        NSData *data = [[NSData alloc] initWithBase64EncodedString:base64Encoded options:NSUTF8StringEncoding];
        NSError *error;
        PKPass *pass = [[PKPass alloc] initWithData:data error:&error];

        if (error) {
            reject(@"", @"Failed to create pass.", error);
            return;
        }

        [pkpasses addObject:pass];
    }

    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *rootViewController = [self getPresenterViewController];
        if (rootViewController) {
            PKAddPassesViewController *addPassesViewController = [[PKAddPassesViewController alloc] initWithPasses:pkpasses];
            addPassesViewController.delegate = self;
            [rootViewController presentViewController:addPassesViewController animated:YES completion:^{
                // Succeeded
                resolve(nil);
            }];
            return;
        }
        
        reject(@"", @"Failed to present PKAddPassesViewController.", nil);
    });
    
//    if (pkpasses.count > 0) {
//        PKPassLibrary *passLibrary = [[PKPassLibrary alloc] init];
//        [passLibrary addPasses:withCompletionHandler:pkpasses];
//        resolve(nil);
//        return;
//    }
//
//
//    reject(@"", @"No pkpasses were passed.", nil);
}

- (NSDictionary *)constantsToExport {
    PKAddPassButton *addPassButton = [[PKAddPassButton alloc] initWithAddPassButtonStyle:PKAddPassButtonStyleBlack];
    [addPassButton layoutIfNeeded];
    
    return @{
        @"ADD_PASS_BUTTON_STYLE": @{
                @"BLACK": @(PKAddPassButtonStyleBlack),
                @"BLACK_OUTLINE": @(PKAddPassButtonStyleBlackOutline),
        },
        @"ADD_PASS_BUTTON_WIDTH": @(CGRectGetWidth(addPassButton.frame)),
        @"ADD_PASS_BUTTON_HEIGHT": @(CGRectGetHeight(addPassButton.frame)),
    };
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#pragma mark - RCTEventEmitter implementation

- (void)startObserving {
    hasListenersRegistered = YES;
}

- (void)stopObserving {
    hasListenersRegistered = NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"addPassesViewControllerDidFinish"];
}

- (void)addPassesViewControllerDidFinish:(PKAddPassesViewController *)controller {
    [controller dismissViewControllerAnimated:YES completion:^{
        if (self->hasListenersRegistered) {
            [self sendEventWithName:@"addPassesViewControllerDidFinish" body:nil];
        }
    }];
}

#pragma mark - helper methods

- (UIViewController *)getPresenterViewController {
    UIApplication *sharedApplication = RCTSharedApplication();
    UIViewController *presentingViewcontroller = sharedApplication.delegate.window.rootViewController;
    
    if (presentingViewcontroller.presentedViewController != nil) {
        presentingViewcontroller = presentingViewcontroller.presentedViewController;
    }
    
    return presentingViewcontroller;
}

@end
