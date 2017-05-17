import React from 'react';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };

    this.selectUser = this.selectUser.bind(this);
  }

  selectUser(event, index, value) {
    this.setState({
      user: value
    });
    this.props.passInCookies(value);
  }

  render() {
    console.log("PROPS", this.props.clicked);
    console.log("COOKIECRISP", this.props.cookieIsSet);
    if (this.props.clicked && this.props.cookieIsSet) {
      console.log('STAGE-1')
      return (
        <div>
          <SelectField floatingLabelText="Select a user" multiple={false} value={this.state.user} onChange={(e, i, v) => this.selectUser(e, i, v)}>
            {this.props.addUser.map((user)=>(<MenuItem key={user} label={user} value={user}>{user}</MenuItem>))}
          </SelectField>
          <div>
            and <Link to="/inventory">continue</Link>
          </div>
          <div>or <Link to="/users">go back</Link> and select a different user.</div>
        </div>
      );
    } else if (this.props.clicked && !this.props.cookieIsSet && this.props.usernameError === '') {
      console.log('STAGE-2');
      console.log()
      return (
        <div>
          <SelectField floatingLabelText="Select a user" multiple={false} value={this.state.user} onChange={(e, i, v) => this.selectUser(e, i, v)}>
            {this.props.addUser.map((user)=>(<MenuItem key={user} label={user} value={user}>{user}</MenuItem>))}
          </SelectField>
          <div>or <Link to="/users">go back</Link> and select a different user.</div>
        </div>
      );
    } else if (this.props.clicked && !this.props.cookieIsSet && this.props.usernameError !== '' && this.props.usersExist) {
      console.log('STAGE-3');
      return (
        <div>
          <div>or <Link to="/users">go back</Link> and select a different user.</div>
        </div>
      );
    } else if (this.props.usersExist) {
      console.log('STAGE-4');
      return (
        <div>
          <div>or <Link to="/users">go back</Link> and select a different user.</div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default UserList;
