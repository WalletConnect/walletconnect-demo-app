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


class SettingsScreen extends Component {
  render() {
    const { network } = this.props;
      
      const rows = [
	  {
	      title: 'Network',
	      subtitle: capitalize(network),
	      screen: 'WalletConnect.NetworkScreen' 
	  },
	  {
	      title: 'Account',
	      subtitle: "Account 1",
	      screen: 'WalletConnect.AccountScreen' 
	  }	  
      ];
      
    return (
       <Container>
         <Card>
	    <List containerStyle={{marginTop: 0}}>
	    {
		rows.map((r) => (
		        <ListItem
		    key={r.title}
		    title={r.title}
		    subtitle={r.subtitle}
		    onPress={() => {
			this.props.navigator.push({
			    screen: r.screen,
			    title: r.title,
			    navigatorStyle: {
				tabBarHidden: true,
			    },
			    backButtonTitle: '',
			});
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

SettingsScreen.propTypes = {
  network: PropTypes.any.isRequired,
};

const reduxProps = ({ account }) => ({
  network: account.network,
});

export default connect(
  reduxProps,
  null,
)(SettingsScreen);
