import {AddPassButtonStyleEnum} from './WalletPass';
import {Platform, requireNativeComponent} from 'react-native';
import type {ViewProps} from 'react-native';
import type {FunctionComponent} from 'react';

export interface AddPassButtonProps extends ViewProps {
  /**
   * The AddPassButton's style
   * @see https://developer.apple.com/documentation/passkit/pkaddpassbuttonstyle
   * @default AddPassButtonStyle.black
   */
  addPassButtonStyle?: AddPassButtonStyleEnum;
  onPress: () => void;
}

const AddPassButton =
  Platform.OS === 'ios'
    ? requireNativeComponent<AddPassButtonProps>('RNWPAddPassButton')
    : ((() => null) as FunctionComponent<AddPassButtonProps>);

export default AddPassButton;
