import React, {Component} from 'react';
import {MDBInput, MDBBtn} from 'mdbreact';
import logo from '../images/adminlogo.png';
import {inject, observer} from 'mobx-react';
import {message} from 'antd';
class PartnerLogin extends Component {
  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';

    let {
      startingStore: {loginAccount},
    } = this.props;
    loginAccount().then((res) => {
      if (res === 3) {
        const success = () => {
          message
            .loading('Signing in..', 1)
            .then(() => message.success('Welcome to Art,Basically!', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        setTimeout(()=>{
        this.props.history.push('/PrintingPartner');
      },500)
      } else {
        const success = () => {
          message
            .loading('Signing in..', 1)
            .then(() => message.success('Email or password is incorrect', 1));
        };

        setTimeout(() => {
          success();
        }, 200);
        setTimeout(()=>{
        this.props.history.push('/PartnerLogin');
      },500)
      }
    });
  };

  render() {
    let {
      startingStore: {account},
    } = this.props;
    return (
      <div className='adminlogin'>
        <div className='adminbg'></div>
        <form
          className='needs-validation animated zoomIn'
          onSubmit={this.submitHandler}
        >
          <img alt='Art, Basically Logo' className='img-fluid' src={logo} />
          <h3>LOGIN</h3>
          <div className='adloginpt clearfix'>
            <MDBInput
              type='email'
              id='materialFormRegisterNameEx'
              label='Email Address'
              className='loginadmin'
              required
              onChange={(accEmailAddress) =>
                account.setProperty(
                  'accEmailAddress',
                  accEmailAddress.target.value
                )
              }
            >
              <div className='invalid-feedback'>
                Please provide a valid email.
              </div>
            </MDBInput>
          </div>
          <div className='adloginpt clearfix'>
            <MDBInput
              type='password'
              id='materialFormRegisterNameEx'
              label='Password'
              className='loginadmin'
              required
              onChange={(password) =>
                account.setProperty('password', password.target.value)
              }
            >
              <div className='invalid-feedback'>
                Please provide a valid password.
              </div>
            </MDBInput>
          </div>
          <ul className='clearfix'>
            <li class='custom-control custom-checkbox'>
              <input
                type='checkbox'
                class='custom-control-input'
                id='rempass'
              />
              <label class='custom-control-label' htmlFor='rempass'>
                Remember me
              </label>
            </li>
          </ul>
          <MDBBtn type='submit' className='admloginbtn' color='transparent'>
            LOGIN
          </MDBBtn>
        </form>
      </div>
    );
  }
}

export default inject('startingStore')(observer(PartnerLogin));
