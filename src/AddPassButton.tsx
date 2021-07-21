import {Platform, requireNativeComponent, NativeModules} from 'react-native';
import type {ViewProps} from 'react-native';
import type {FunctionComponent} from 'react';

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

export interface AddPassButtonProps extends ViewProps {
  /**
   * The AddPassButton's style
   * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle
   * @default AddPassButtonStyleEnum.black
   * @example
   * ```
   * import {AddPassButton, ADD_PASS_BUTTON_CONSTANTS} from 'react-native-wallet-passes';
   * import type {FunctionComponent} from 'react';
   *
   * const App: FunctionComponent = () => {
   *   return (
   *     <AddPassButton
   *       addPassButtonStyle={ADD_PASS_BUTTON_CONSTANTS.STYLE.BLACK_OUTLINE}
   *       onPress={() => {
   *         console.log('onPress');
   *       }}
   *     />
   *   );
   * };
   * ```
   */
  addPassButtonStyle?: AddPassButtonStyleEnum;
  onPress: () => void;
}

const AddPassButton =
  Platform.OS === 'ios'
    ? requireNativeComponent<AddPassButtonProps>('RNWPAddPassButton')
    : ((() => null) as FunctionComponent<AddPassButtonProps>);

export default AddPassButton;

const {
  ADD_PASS_BUTTON_STYLE: STYLE,
  ADD_PASS_BUTTON_WIDTH: DEFAULT_WIDTH,
  ADD_PASS_BUTTON_HEIGHT: DEFAULT_HEIGHT,
} = NativeModules.RNWalletPasses.getConstants();

export interface AddPassButtonConstants {
  /**
   * Options for the AddPassButton's style
   * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle
   */
  STYLE: {
    /**
     * A black button with white lettering.\
     * Use this style when displaying a button against a light background.
     * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle/black
     */
    BLACK: AddPassButtonStyleEnum;
    /**
     * A black button with a light outline.\
     * Use this button when displaying this button against a dark background.
     * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle/blackoutline
     */
    BLACK_OUTLINE: AddPassButtonStyleEnum;
  };
  /**
   * The AddPassButton's default width
   */
  DEFAULT_WIDTH: number;
  /**
   * The AddPassButton's default height
   */
  DEFAULT_HEIGHT: number;
}

export const ADD_PASS_BUTTON_CONSTANTS = {
  STYLE,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
} as AddPassButtonConstants;
