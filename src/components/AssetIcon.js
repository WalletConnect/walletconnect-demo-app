import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

const StyledCircle = styled.View`
  margin-left: 14px;
  height: 36px;
  width: 36px;
  margin-right: 15px;
  border-radius: 18px;
  border-color: #d4d4d7;
  border-width: 1px;
  background-color: #ffffff;
`;

const styles = StyleSheet.create({
  circleIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 2,
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
      <StyledCircle>
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
      </StyledCircle>
    );
  }
}

AssetIcon.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default AssetIcon;
