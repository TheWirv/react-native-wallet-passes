import {NativeModules, NativeEventEmitter, Platform} from 'react-native';

const {RNWalletPass} = NativeModules;
const nativeEventEmitter = new NativeEventEmitter(RNWalletPass);

const WalletPass = {
  /**
   * Checks whether Wallet passes can be added on this device.
   */
  canAddPasses: (): Promise<boolean> => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return RNWalletPass.canAddPasses();
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
      return RNWalletPass.addPass(encodedPassFile, fileProvider);
    }

    if (Platform.OS === 'ios') {
      return RNWalletPass.addPass(encodedPassFile);
    }

    return new Promise((_resolve, reject) =>
      reject('Platforms other than iOS and Android are not supported.'),
    );
  },

  /**
   * Shows a ViewController to add passes.
   *
   * @param encodedPassFile Base64-encoded Wallet pass file
   * @deprecated Use `addPass` instead.
   */
  presentAddPassesViewController: (encodedPassFile: string): Promise<void> => {
    console.warn(
      'PassKit.presentAddPassesViewController is deprecated. Use PassKit.addPass instead.',
    );
    return WalletPass.addPass(encodedPassFile);
  },

  /**
   * Add the specified listener, this call passes through to the NativeModule addListener
   *
   * @param eventType The name of the event for which we are registering the listener
   * @param listener The listener function
   * @param context Context of the listener
   */
  addEventListener: (eventType: string, listener: (event: any) => void, context?: Object) => {
    if (Platform.OS === 'ios') {
      return nativeEventEmitter.addListener(eventType, listener, context);
    }

    throw new Error('Adding an event listener is only supported on iOS.');
  },
};

export default WalletPass;

/**
 * Options for the AddPassButton's style
 * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle
 */
export enum AddPassButtonStyleEnum {
  /**
   * A black button with white lettering.\
   * Use this style when displaying a button against a light background.
   * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle/black
   */
  black,
  /**
   * A black button with a light outline.\
   * Use this button when displaying this button against a dark background.
   * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle/blackoutline
   */
  blackOutline,
}

interface WalletPassConstants {
  AddPassButtonStyle: AddPassButtonStyleEnum;
  AddPassButtonWidth: number;
  AddPassButtonHeight: number;
}

export const {AddPassButtonStyle, AddPassButtonWidth, AddPassButtonHeight} =
  RNWalletPass.getConstants() as WalletPassConstants;
