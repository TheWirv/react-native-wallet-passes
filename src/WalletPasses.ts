import {NativeModules, NativeEventEmitter, Platform} from 'react-native';

const {RNWalletPasses} = NativeModules;
const nativeEventEmitter = new NativeEventEmitter(RNWalletPasses);

const WalletPasses = {
  /**
   * Checks whether Wallet passes can be added on this device.
   */
  canAddPasses: (): Promise<boolean> => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return RNWalletPasses.canAddPasses();
    }

    console.error('Platforms other than iOS and Android are not supported.');
    return new Promise((resolve) => resolve(false));
  },

  /**
   * Adds a pass to the Wallet.
   *
   * @param encodedPassFile Base64-encoded Wallet pass file
   * @param fileProvider  Android file provider
   */
  addPass: (encodedPassFile: string, fileProvider?: string): Promise<void> => {
    if (Platform.OS === 'android') {
      return RNWalletPasses.addPass(encodedPassFile, fileProvider);
    }

    if (Platform.OS === 'ios') {
      return RNWalletPasses.addPass(encodedPassFile);
    }

    return new Promise((_resolve, reject) =>
      reject('Platforms other than iOS and Android are not supported.'),
    );
  },

  /**
   * Add the specified listener, this call passes through to the NativeModule addListener
   *
   * @param eventType The name of the event for which we are registering the listener
   * @param listener The listener function
   * @param context Context of the listener
   */
  addEventListener: (
    eventType: 'addPassesViewControllerDidFinish',
    listener: (event: any) => void,
    context?: Object,
  ) => {
    if (Platform.OS === 'ios') {
      return nativeEventEmitter.addListener(eventType, listener, context);
    }

    throw new Error('Adding an event listener is only supported on iOS.');
  },
};

export default WalletPasses;
