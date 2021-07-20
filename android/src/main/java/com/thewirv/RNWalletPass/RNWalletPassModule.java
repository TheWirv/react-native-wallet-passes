package com.thewirv.RNWalletPass;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.core.content.FileProvider;

import android.util.Base64;

import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class RNWalletPassModule extends ReactContextBaseJavaModule {
    public RNWalletPassModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return "RNWalletPass";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> addPassButtonStyle = new HashMap<>();
        final Map<String, Object> constants = new HashMap<>();
        addPassButtonStyle.put("black", 0);
        addPassButtonStyle.put("blackOutline", 1);
        constants.put("AddPassButtonStyle", addPassButtonStyle);
        constants.put("AddPassButtonWidth", 0);
        constants.put("AddPassButtonHeight", 1);
        return constants;
    }

    private Intent intentWithContentUri(Uri uri) {
        return new Intent(Intent.ACTION_VIEW)
                .setDataAndType(uri, "application/vnd.apple.pkpass")
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    }

    @ReactMethod
    public void canAddPasses(Promise promise) {
        try {
            Intent intent = this.intentWithContentUri(Uri.parse("content://"));
            boolean canAddPass = intent.resolveActivity(getReactApplicationContext().getPackageManager()) != null;
            promise.resolve(canAddPass);
        } catch (Exception e) {
            promise.reject(new JSApplicationCausedNativeException(e.getMessage()));
        }
    }

    @ReactMethod
    public void addPass(String encodedPassFile, String fileProvider, Promise promise) {
        try {
            Context context = getReactApplicationContext();

            File file = new File(context.getCacheDir(), UUID.randomUUID().toString() + ".pkpass");
            FileOutputStream stream = new FileOutputStream(file, true);
            stream.write(Base64.decode(encodedPassFile, 0));
            stream.flush();
            stream.close();

            Uri uri = FileProvider.getUriForFile(context, fileProvider, file);
            Intent intent = this.intentWithContentUri(uri);
            context.startActivity(intent);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(new JSApplicationCausedNativeException(e.getMessage()));
        }
    }
}
