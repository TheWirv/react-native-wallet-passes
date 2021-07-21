# React Native WalletPasses

[![star this repo](https://githubbadges.com/star.svg?user=TheWirv&repo=react-native-wallet-passes&style=flat)](https://github.com/TheWirv/react-native-wallet-passes)
[![fork this repo](https://githubbadges.com/fork.svg?user=TheWirv&repo=react-native-wallet-passes&style=flat)](https://github.com/TheWirv/react-native-wallet-passes/fork)
[![NPM Version](https://img.shields.io/npm/v/react-native-wallet-passes.svg?style=flat-square)](https://www.npmjs.com/package/react-native-wallet-passes)

**React Native WalletPasses** is a module to handle Wallet passes on iOS and Android.

## Installation

### 1. Install library using `yarn`:

```bash
yarn add react-native-wallet-passes
```

or use `npm`, if you prefer:

```bash
npm install --save react-native-wallet-passes
```

### 2. Link native code

> **Important**: You only need to do this step if you're using React Native 0.59 or lower. Since v0.60, linking happens automatically.

<details>
<summary>Information about linking for RN < v0.60</summary>
You can link native code in the way you prefer:

#### CocoaPods

Add line to your project target section in your Podfile:

```diff
target 'YourProjectTarget' do

+   pod 'react-native-wallet-passes', path: '../node_modules/react-native-wallet-passes'

end
```

If you received error `jest-haste-map: Haste module naming collision: Duplicate module name: react-native`, add lines below to your Podfile and reinstall pods.

```diff
target 'YourProjectTarget' do

+   rn_path = '../node_modules/react-native'
+   pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
+   pod 'React', path: rn_path

  pod 'react-native-wallet-passes', path: '../node_modules/react-native-wallet-passes'

end

+ post_install do |installer|
+   installer.pods_project.targets.each do |target|
+     if target.name == "React-Core"
+       target.remove_from_project
+     end
+   end
+ end
```

#### react-native link

Run command below:

```bash
react-native link react-native-wallet-passes
```

</details>

### 3. Android configuration

#### Add following lines to AndroidManifest.xml

```diff
<manifest ...>
  <application ...>
    ...
+   <provider
+     android:name="androidx.core.content.FileProvider"
+     android:authorities="com.yourcompany.fileprovider"
+     android:grantUriPermissions="true"
+     android:exported="false"
+     tools:replace="android:authorities">
+     <meta-data
+       android:name="android.support.FILE_PROVIDER_PATHS"
+       android:resource="@xml/wallet_passes_file_paths"
+       tools:replace="android:resource" />
+   </provider>
  </application>
</manifest>
```

#### Create wallet_passes_file_paths.xml

Create `wallet_passes_file_paths.xml` file in your project's `android/src/main/res/xml` directory. The .pkpass files will be created in your app's cache directory.

```xml
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <cache-path name="wallet-passes" path="/"/>
</paths>
```

## Usage

```jsx
import {WalletPasses} from 'react-native-wallet-passes';
```

or import the `default` export:

```jsx
import WalletPasses from 'react-native-wallet-passes';
```

### Check whether the device supports adding passes

```jsx
WalletPasses.canAddPasses().then((result) => {
  console.log('Can add passes:', result);
});
```

> For Android, `true` will be returned if at least one app is installed that can open .pkpass files.

### Add the pass to the Wallet

```jsx
WalletPasses.addPass(base64EncodedPass);
```

For Android, a file provider has to be specified for the second argument. Then a dialog box will appear, and ask the user to choose an app opening the pass.

```jsx
WalletPasses.addPass(base64EncodedPass, 'com.yourcompany.fileprovider');
```

### Display a button that enables users to add passes to Wallet (iOS only)

```jsx
import {AddPassButton, ADD_PASS_BUTTON_CONSTANTS} from 'react-native-wallet-passes';
import type {FunctionComponent} from 'react';
import {styles} from './styles';

const App: FunctionComponent = () => {
  return (
    <AddPassButton
      style={styles.addPassButton}
      addPassButtonStyle={ADD_PASS_BUTTON_CONSTANTS.STYLE.BLACK_OUTLINE}
      onPress={() => {
        console.log('onPress');
      }}
    />
  );
};
```

### Handle events (iOS only)

```jsx
import {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {WalletPasses} from 'react-native-wallet-passes';
import type {FunctionComponent} from 'react';

const App: FunctionComponent = () => {
  useLayoutEffect(() => {
    const removeWalletPassesEventListener = WalletPasses.addEventListener(
      'addPassesViewControllerDidFinish',
      onAddPassesViewControllerDidFinish,
    );

    return removeWalletPassesEventListener.remove;
  }, []);

  const onAddPassesViewControllerDidFinish = () => {
    // Add-passes view controller has been dismissed
    console.log('onAddPassesViewControllerDidFinish');
  };

  return <View />;
};
```

### Constants

- _ADD_PASS_BUTTON_CONSTANTS.STYLE_ - Options for the AddPassButton's style
  - _BLACK_ - A black button with white lettering
  - _BLACK_OUTLINE_ - A black button with a light outline
- _ADD_PASS_BUTTON_CONSTANTS.DEFAULT_WIDTH_ - The AddPassButton's default width
- _ADD_PASS_BUTTON_CONSTANTS.DEFAULT_HEIGHT_ - The AddPassButton's default height
