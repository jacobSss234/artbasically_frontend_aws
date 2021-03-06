import React, {Component} from 'react';
import {MDBModal, MDBModalBody, MDBModalHeader, MDBIcon} from 'mdbreact';

class ViewImage extends Component {
  state = {
    modal14: false,
  };

  toggle = (nr) => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
    });
    // console.log(this.props.data,)
  };

  render() {
    return (
      <div>
        <a href='#!' onClick={this.toggle(14)} className='viewimage'>
          <MDBIcon icon='eye' />
        </a>
        <MDBModal
          isOpen={this.state.modal14}
          toggle={this.toggle(14)}
          centered
          className='singleModal'
        >
          <MDBModalHeader
            toggle={this.toggle(14)}
            className='mhead'
          ></MDBModalHeader>
          <MDBModalBody>
            <div className='imagecom'>
              <img src={this.props.data} alt='' className='artimg' />
            </div>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default ViewImage;
