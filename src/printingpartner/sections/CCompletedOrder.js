import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import ViewData from '../sections/ViewData';
class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: [],
    };
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  checkList = (id) => {
    let src = '';
    let imgsrc = this.state.img.filter((img) => {
      if (img[1][0] === id) {
        src += img[0];
      }
    });
    console.log(this.state.img, 'sdsdsds');
    return src;
  };

  render() {
    let {
      startingStore: {listOfOrders,listOfUsers},
    } = this.props;
    let listOfOrderDelivery = listOfOrders.filter((Delivery) => {
      if (Delivery.orderStatus === 'Completed') {
        return Delivery;
      }
    });


    let findName = (accID) => {
      let aw = listOfUsers.map((user) => {
        if (user._id === accID) {
          return `${user.accFname} ${user.accLname}`;
        }
      });
      return aw;
    };

    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Completed Orders</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                  <th>Order ID</th>
                    <th>Order By</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Payment Status</th>
                    <th>Payment Method</th>

                    <th className='act'>Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listOfOrderDelivery.map((data) => (
                    <tr>
                         <td>{data.orderID}</td>
                    
                    <td> {findName(data.accID)} </td>
                    <td>{data.orderDate}</td>
                    <td>{data.orderStatus}</td>
                    <td>{data.paymentStatus}</td>
                    <td>{data.modeOfPayment}</td>

                      <td>
                        <ViewData data={data.orderItems} />
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default inject('startingStore')(observer(CustomerTable));
