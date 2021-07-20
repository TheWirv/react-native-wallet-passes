# React Native WalletPass

React Native module to handle Wallet passes on iOS and Android.

## Installation

### 1. Install library using `yarn`:

```bash
yarn add react-native-walletpass
```

or use `npm`, if you prefer:

```bash
npm install --save react-native-walletpass
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

+   pod 'react-native-walletpass', path: '../node_modules/react-native-walletpass'

end
```

If you received error `jest-haste-map: Haste module naming collision: Duplicate module name: react-native`, add lines below to your Podfile and reinstall pods.

```diff
target 'YourProjectTarget' do

+   rn_path = '../node_modules/react-native'
+   pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
+   pod 'React', path: rn_path

  pod 'react-native-walletpass', path: '../node_modules/react-native-walletpass'

end

+ post_install do |installer|
+   installer.pods_project.targets.each do |target|
+     if target.name == "React"
+       target.remove_from_project
+     end
+   end
+ end
```

#### react-native link

Run command below:

```bash
react-native link react-native-walletpass
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
+       android:resource="@xml/walletpass_file_paths"
+       tools:replace="android:resource" />
+   </provider>
  </application>
</manifest>
```

#### Create walletpass_file_paths.xml

Create `walletpass_file_paths.xml` file in your project's `android/src/main/res/xml` directory. The .pkpass files will be created in your app's cache directory.

```xml
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <cache-path name="walletpass" path="/"/>
</paths>
```

## Usage

```jsx
import {WalletPass} from 'react-native-walletpass';
```

### Check whether the device supports adding passes

```jsx
WalletPass.canAddPasses().then((result) => {
  console.log('Can add passes:', result);
});
```

> For Android, `true` will be returned if at least one app is installed that can open .pkpass files.

### Add the pass to the Wallet

```jsx
WalletPass.addPass(base64EncodedPass);
```

For Android, a file provider has to be specified for the second argument. Then a dialog box will appear, and ask the user to choose an app opening the pass.

```jsx
WalletPass.addPass(base64EncodedPass, 'com.yourcompany.fileprovider');
```

### Display a button that enables users to add passes to Wallet (iOS only)

```jsx
import {AddPassButton, AddPassButtonStyle} from 'react-native-walletpass';
import type {FunctionComponent} from 'react';

const App: FunctionComponent = () => {
  return (
    <AddPassButton
      style={styles.addPassButton}
      addPassButtonStyle={AddPassButtonStyle.black}
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
import {WalletPass} from 'react-native-walletpass';
import type {FunctionComponent} from 'react';

const App: FunctionComponent = () => {
  useLayoutEffect(() => {
    const removeWalletPassEventListener = WalletPass.addEventListener(
      'addPassesViewControllerDidFinish',
      onAddPassesViewControllerDidFinish,
    );

    return removeWalletPassEventListener;
  }, []);

  const onAddPassesViewControllerDidFinish = () => {
    // Add-passes view controller has been dismissed
    console.log('onAddPassesViewControllerDidFinish');
  };
};
```

### Constants

- _PassKit.AddPassButtonStyle_ - Options for the AddPassButton's style
  - _black_ - A black button with white lettering
  - _blackOutline_ - A black button with a light outline
- _PassKit.AddPassButtonWidth_ - The AddPassButton's default width
- _PassKit.AddPassButtonHeight_ - The AddPassButton's default height
