import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { goBack } from 'react-router-redux';

class BackButton extends Component {
    handleClick = () => {
        this.props.goBack();
    };

    render() {
        return <Button variant="contained" color="primary" onClick={this.handleClick}>Retour</Button>;
    }
}

export default connect(null, {
    goBack,
})(BackButton);