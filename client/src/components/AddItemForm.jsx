import React from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ApiSearchResults from './ApiSearchResults.jsx';



class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      notes: '',
      houseId: this.props.houseId,
      errorName: '',
      errorText: '',
      ItemName: '',
      selectedValue: '',
      dataSource: [],
    };
  }

  postItem(obj) {
    axios.post('/add', obj)
      .then(res => {
        console.log( res);
        //this.props.submitItem();
        //this.props.toggleForm(false);
        this.setState.dataSource = res; 
      })
      .catch(err => {
        console.log('Bad POST request to /add: ', err.response.data);
        this.setState({
          errorName: err.response.data.name,
          errorNotes: err.response.data.notes
        });
      });
  }

  clickSubmit(event) {
    this.postItem(this.state);
  }

  clickCancel(event) {
    this.props.toggleForm(false);
  }

  saveName(event) {
    this.setState({
      name: event.target.value
    });
  }

  saveNotes(event) {
    this.setState({
      notes: event.target.value
    });
  }

  handleSelected(event, index, value) {
    this.setState({     
      selectedValue: value,
      ItemName: value
    });
  }


  
  //handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Card className="container">
        <form>
          <h4 className="card-heading">Add New Inventory Item</h4>
          <div className="field-line">
            <TextField
              floatingLabelText="Item Name"
              type="text"
              value={this.state.name}
              onChange={this.saveName.bind(this)}
              errorText={this.state.errorName}>
            </TextField>
          </div>
          <SelectField
            floatingLabelText="Buy From"
            value={this.state.selectedValue}
            onChange={this.handleSelected.bind(this)}>
            <MenuItem value={'Amazon'} primaryText="Amazon" />
            <MenuItem value={'WalMart'} primaryText="WalMart" />
            <MenuItem value={'Ebay'} primaryText="Ebay" />
          </SelectField>
          <div className="field-line">
            <TextField
              floatingLabelText="Notes"
              type="text"
              value={this.state.notes}
              onChange={this.saveNotes.bind(this)}
              errorText={this.state.errorNotes}>
            </TextField>
          </div>
          <div className="button-line">
            <RaisedButton primary={true} label="Search" onClick={this.clickSubmit.bind(this)}></RaisedButton>
            <RaisedButton primary={true} label="Cancel" onClick={this.clickCancel.bind(this)}></RaisedButton>
          </div>
        </form>
      </Card>
      
    );
  }
}

export default AddItemForm;
