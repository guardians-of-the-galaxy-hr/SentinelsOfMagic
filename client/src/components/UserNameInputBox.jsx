import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

class UsernameInputBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      usernameExists: false,
      emailExists: false,
      error: ''
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.passDataToCreateUser = this.passDataToCreateUser.bind(this);

  }

  changeUsername(e) {
    this.setState ({
      username: e.target.value,
      usernameExists: true
    });
  }

  changeEmail(e) {
    this.setState ({
      email: e.target.value,
      emailExists: true
    })
  }

  passDataToCreateUser() {
    this.props.dataFromInputBox(
      {
        username: this.state.username, 
        usernameExists: this.state.usernameExists,
        email: this.state.email,
        emailExists: this.state.emailExists
      });
    this.setState({
      username: '',
      email: ''
    });
    this.props.buttonClicked(true);
  }

  render () {
    return (

      <div>
       <TextField type="text" floatingLabelText="Name" errorText={this.props.usernameError} onChange={this.changeUsername} value={this.state.username}></TextField>
       <TextField type="text" floatingLabelText="Email" errorText={this.props.emailError} onChange={this.changeEmail} value={this.state.email}></TextField>
       <div>
        <RaisedButton className="somePadding" secondary={true} label="Submit" onClick={(e)=>{ this.passDataToCreateUser(); }}></RaisedButton>
       </div>
      </div>


    );
  }

}

export default UsernameInputBox;