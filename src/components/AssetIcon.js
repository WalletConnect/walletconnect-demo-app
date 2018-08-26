import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

const styles = StyleSheet.create({
  circleIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 2,
  },
  circle: {
    marginLeft: 14,
    height: 36,
    width: 36,
    marginRight: 15,
    borderRadius: 18,
    borderColor: '#d4d4d7',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});

class AssetIcon extends PureComponent {
  _getIconUrl(address) {
    // if ether
    if (!address) {
      return 'https://github.com/TrustWallet/tokens/raw/master/coins/60.png';
    }
    // if tokens
    return `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${address}.png`;
  }

  render() {
    const { asset } = this.props;

    return (
      <View style={styles.circle}>
        <ImageLoad
          source={{ uri: this._getIconUrl(asset.address) }}
          style={styles.circleIcon}
          isShowActivity={false}
          placeholderSource={require('../assets/default_token.png')} // eslint-disable-line
          customImagePlaceholderDefaultStyle={styles.circleIcon}
          loadingStyle={styles.circleIcon}
          borderRadius={15}
          placeholderStyle={styles.circleIcon}
        />
      </View>
    );
  }
}

AssetIcon.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default AssetIcon;
