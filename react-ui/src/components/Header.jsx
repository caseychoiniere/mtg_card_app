import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AuthStore from '../stores/AuthStore';
import MainStore from '../stores/MainStore'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

@observer
class Header extends Component {

    handleLogout = () => AuthStore.logout();

    toggleNav = () => MainStore.toggleNav();

    loggedIn = (props) => (
        AuthStore.isAuthenticated() ?
        <IconMenu
            {...props}
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" onClick={() => MainStore.makePlanet()}/>
            <MenuItem primaryText="Sign out" onClick={this.handleLogout}/>
        </IconMenu> : <FlatButton label="Login" onClick={this.initiateLogin}/>
    );

    createLoginUrl = () => {

    };

    initiateLogin = () => AuthStore.login();

    render() {
        return (
            <AppBar
                iconStyleLeft={!AuthStore.isAuthenticated() ? {display: 'none'} : {}}
                iconElementLeft={<IconButton><Menu onClick={this.toggleNav}/></IconButton>}
                iconElementRight={this.loggedIn()}
                style={{position: 'fixed'}}
            />
        );
    }
}

export default Header;