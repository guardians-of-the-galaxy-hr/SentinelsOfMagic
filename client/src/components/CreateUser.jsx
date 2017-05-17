import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import UsernameInputBox from './UsernameInputBox.jsx';
import CookieParser from 'cookie-parser';
import UserList from './UserList.jsx';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import {parse} from 'cookie';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    var cookie = parse(document.cookie);
    var houseId = parseInt(cookie.fridgrSesh.split('"houseId":')[1]);
    console.log('Current houseId:', houseId);

    this.state = {
      username: '',
      email: '',
      usernameExists: false,
      emailExists: false,
      usernameError: '',
      emailError: '',
      houseId: houseId,
      usernameList: [],
      emailList: [],
      buttonClicked: false,
      usersExist: false,
      cookieIsSet: false
    };

    this.submitUsernameAndEmail = this.submitUsernameAndEmail.bind(this);
    this.dataFromInputBox = this.dataFromInputBox.bind(this);
    this.passInCookies = this.passInCookies.bind(this);
  }

  componentWillMount() {
    let cookies = parse(document.cookie);
    let fridgrSesh = JSON.parse(cookies.fridgrSesh.slice(2));

    if (!cookies.fridgrSesh || !fridgrSesh.houseId) {
      this.props.history.push('/login');
    } else {
      $.ajax({
        method: 'POST',
        url: '/checkUsers',
        data: { houseId: this.state.houseId },
        success: (data) => {
          if (data.length > 0) {
            this.setState({
              usersExist: true
            });
          } else {
            console.log('usersDontExist');
          }
        }
      });
    }
  }

  submitUsernameAndEmail() {
    if (this.state.username === '') {
      this.setState({
        usernameError: 'Please enter a valid username'
      });
    } 
    if (this.state.email === '') {
      this.setState({
        emailError: 'Please enter a valid email'
      });
    } 
    if (this.state.username !== '' && this.state.email !== '') {
      var username = this.state.username;
      var email = this.state.email;
      if (this.state.usernameExists === true) {
        $.ajax({
          method: 'POST',
          url: '/createUser',
          data: { username: username, emai: email, houseId: this.state.houseId },
          success: (data) => {
            console.log('what does it look like', data);
            if (data !== 'username already taken. Please enter another.') {
              this.state.usernameList.push(this.state.username);
              this.setState({
                usernameError: '',
                emailError: ''
              });
            } else {
              this.setState({
                usernameError: data,
                emailError: data
              });
            }
          }
        });
      }
    }
  }

  passInCookies(username) {
    $.ajax({
      method: 'POST',
      url: '/cookUser',
      data: {username: username, houseId: this.state.houseId},
      success: (data) => {
        this.setState({
          cookieIsSet: true
        });
      },
      error: (error) => {
        console.log('THIS IS THE ERROR-----', error);
      }
    });
  }

  dataFromInputBox(data) {
    this.setState({
      username: data.username,
      usernameExists: data.usernameExists,
      email: data.email,
      emailExists: data.emailExists
    }, function() {
      this.submitUsernameAndEmail();
    });
  }

  buttonClicked(bool) {
    this.setState({
      buttonClicked: bool
    });
  }

  render () {
    return (
      <Card className="container">
        <h4 className="card-heading">Add new users</h4>
        <UsernameInputBox usernameError={this.state.usernameError} emailError={this.state.emailError} dataFromInputBox={this.dataFromInputBox} submitUsernameAndEmail={this.submitUsernameAndEmail} buttonClicked={this.buttonClicked.bind(this)}/>
        <UserList usernameError={this.state.usernameError} cookieIsSet={this.state.cookieIsSet} usersExist={this.state.usersExist} addUser={this.state.usernameList} passInCookies={this.passInCookies.bind(this)} clicked={this.state.buttonClicked}/>
      </Card>
    );
  }

}

export default CreateUser;



