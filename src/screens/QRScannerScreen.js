import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { walletConnectInitSession } from '../helpers/walletconnect';

class QRScannerScreen extends Component {
  onSuccess = async event => {
    const { data } = event;
    if (data && typeof data === 'string') {
      console.log('URI', data);
      await walletConnectInitSession(data);
    }

    setTimeout(() => {
      this.qrCodeScanner.reactivate();
    }, 1000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>Scan a WalletConnect QR code</Text>
        <QRCodeScanner
          ref={c => {
            this.qrCodeScanner = c;
          }}
          topViewStyle={styles.scannerTop}
          bottomViewStyle={styles.scannerBottom}
          style={styles.scanner}
          onRead={this.onSuccess}
        />
      </View>
    );
  }
}

QRScannerScreen.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },

  centerText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    height: 100,
    fontSize: 18,
    paddingTop: 32,
    color: '#777',
  },

  scannerTop: {
    flex: 0,
    height: 0,
  },
  scanner: {
    flex: 1,
  },
  scannerBottom: {
    flex: 0,
    height: 0,
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
});

export default QRScannerScreen;
