import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../components/Container';
import Card from '../components/Card';
import Section from '../components/Section';
import Label from '../components/Label';
import Text from '../components/Text';
import Button from '../components/Button';
import { capitalize } from '../helpers/utilities';
import { List, ListItem } from 'react-native-elements';
import { accountUpdateNetwork } from '../redux/_account';


class NetworkScreen extends Component {
    render() {
	const { currentNetwork } = this.props;
	
	const networks = [
	    "mainnet",	    
	    "ropsten",
	    "rinkeby",
	    "koval"
	];
    return (
      <Container>
            <Card>
	    <List containerStyle={{marginTop: 0}}>
	    {
		networks.map((n) => (		    
			<ListItem
		    key={n}
		    title={capitalize(n)}
		    hideChevron
		    leftIcon={(n === currentNetwork) ? {name: 'check'} : null }
		    onPress={() => {
			this.props.accountUpdateNetwork(n);
		    }}
			/>
		))
	    }
	</List>
        </Card>
      </Container>
    );
  }
}

NetworkScreen.propTypes = {
  currentNetwork: PropTypes.any.isRequired,
};

const reduxProps = ({ account }) => ({
  currentNetwork: account.network,
});

export default connect(
  reduxProps,
  { accountUpdateNetwork }
)(NetworkScreen);


