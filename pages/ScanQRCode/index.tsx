import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {navigate} from '../../utils/RootNavigation';
const ScanQRCode = () => {
  const onBarCodeRead = (event: BarCodeReadEvent) => {
    const {data} = event; //只要拿到data就可以了
    //扫码后的操作
    if (data) {
      navigate('TrackIn', {
        code: data,
      });
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        autoFocus={RNCamera.Constants.AutoFocus.on}
        style={[styles.preview]}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: '请求使用相机的许可',
          message: '我们需要您的许可才能使用您的相机',
          buttonPositive: '确认',
          buttonNegative: '取消',
        }}
        androidRecordAudioPermissionOptions={{
          title: '请求使用录音的许可',
          message: '我们需要您的许可才能使用您的音频',
          buttonPositive: '确认',
          buttonNegative: '取消',
        }}
        onBarCodeRead={onBarCodeRead}>
        <View style={styles.mask}>
          <Text style={styles.rectangleText}>
            将二维码放入屏幕，即可自动扫描
          </Text>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '100%',
    alignItems: 'center',
  },
  rectangleText: {
    color: '#fff',
  },
});
export default ScanQRCode;
