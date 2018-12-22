/**
 * Material Text Field
 */
import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { NotificationManager } from 'react-notifications';
import Button from '@material-ui/core/Button';
import { FormGroup } from 'reactstrap';

// utility functions
import {
  formErrorMessage
} from '../../../util/index';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// redux constants
import {
  genderType,
  userStatus
} from '../../../constants/constants';
import 
  APP_MESSAGES
 from '../../../constants/AppMessages';

// redux action
import {
  getUser
} from '../../../actions/index';

class TextFields extends React.Component {

  state = {
    user_info: {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      gender: '',
      user_type: '',
      status: 'active',
    },
    isFormUpdated: false
  };

  componentWillMount() {
    let userId = localStorage.getItem('user_id');
    if (userId) {
      this.props.getUser(userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      var someProperty = {...this.state};

      Object.keys(nextProps.user).forEach((key) => {
        someProperty.user_info[key] = nextProps.user[key];
      })

      this.setState({someProperty});
    }
  }

  /**
   * Update state for given field on text change event.
   * 
   * @param {string} key field key name which value need to be updated
   * @param {string} name field name which value need to be updated
   * @param {mix} event value for given field name
   */
  handleChangeByKeyAndName = (key, name, event) => {
    var someProperty = {...this.state}
    someProperty[key][name] = event.target.value;
    this.state.isFormUpdated = true;
    this.setState({someProperty})    
  }

  /**
   * First check is form updated.
	 * Prepare state for saving profile info, and save in DB.
	 */
	saveProfileInfo() {
    if (!this.state.isFormUpdated) {
      NotificationManager.error(APP_MESSAGES.formNotUpdatedMessage);
      return;
    }
    this.state.isFormUpdated = false;
  }

  render() {
    const  errorMessage  = {};

    return (
      <div className="textfields-wrapper">
        <div>
          <form noValidate autoComplete="off">
            <RctCollapsibleCard heading="User Info">
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                    <TextField id="user_type" select label="Select User Type"
                        disabled={true}
                        value={this.state.user_info.user_type}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'user_type', e)}
                        SelectProps={{
                          MenuProps: {
                          },
                        }}
                        helperText={formErrorMessage(errorMessage['user_info.user_type'])}
                        fullWidth>
                        {userStatus.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="first_name"
                        error={errorMessage['user_info.first_name'] ? true : false}
                        fullWidth 
                        label="First Name" 
                        value={this.state.user_info.first_name}
                        helperText={formErrorMessage(errorMessage['user_info.first_name'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'first_name', e)}/>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="middle_name"
                        error={errorMessage['user_info.middle_name'] ? true : false}
                        fullWidth 
                        label="Middle Name" 
                        value={this.state.user_info.middle_name}
                        helperText={formErrorMessage(errorMessage['user_info.middle_name'])}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'middle_name', e)} />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="last_name"
                        error={errorMessage['user_info.last_name'] ? true : false}
                        fullWidth 
                        label="Last Name" 
                        value={this.state.user_info.last_name}
                        helperText={formErrorMessage(errorMessage['user_info.last_name'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'last_name', e)}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="email"
                        error={errorMessage['user_info.email'] ? true : false}
                        fullWidth 
                        label="Email" 
                        value={this.state.user_info.email}
                        helperText={formErrorMessage(errorMessage['user_info.email'], true)}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'email', e)}/>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField id="gender" select label="Select Gender"
                        error={errorMessage['user_info.gender'] ? true : false}
                        value={this.state.user_info.gender}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'gender', e)}
                        SelectProps={{
                          MenuProps: {
                          },
                        }}
                        helperText={formErrorMessage(errorMessage['user_info.gender'])}
                        fullWidth>
                        {genderType.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-xl-4">
                    <div className="form-group">
                      <TextField
                        id="status"
                        disabled
                        error={errorMessage['user_info.status'] ? true : false}
                        fullWidth 
                        label="Status" 
                        value={this.state.user_info.status}
                        helperText={formErrorMessage(errorMessage['user_info.status'])}
                        onChange={(e) => this.handleChangeByKeyAndName('user_info', 'status', e)}/>
                    </div>
                  </div>
                </div>
            </RctCollapsibleCard>
            <FormGroup className="mb-5">
              <Button
                className="btn-info text-white btn-block w-40"
                style={{marginBottom: 20}}
                variant="raised"
                size="medium"
                onClick={() => this.saveCompanySettings()}>Save Profile Info
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => {
  let { account } = state.accountReducer;
  let { user } =  state.userReducer;

  return { account, user };
};

export default connect(mapStateToProps, {
  getUser
})(TextFields);
