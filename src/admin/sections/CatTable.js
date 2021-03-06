import React, {Component} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import EditCat from './EditCat';
import EditStyle from './EditStyle';
import EditPrintSize from './EditPrintSize'

class CategoryTable extends Component {
  componentDidMount() {
    let {
      startingStore: {getCategories, getStyles,getPrintSize},
    } = this.props;
    getCategories();
    getStyles();
    getPrintSize();
  }

  render() {
    let {
      startingStore: {listOfCategories, listOfStyles,listOfPrintSize},
    } = this.props;
  
    // let listOfCustomers = listOfCategories.filter(artist => {
    //   if (artist.accessType !== "artist") {
    //     return artist;
    //   }
    // })
    return (
      <div className='clearfix'>
        <MDBRow className='mb-4 row50'>
          <MDBCol md='12'>
            <MDBCard>
              <MDBCardBody>
                <h3>Theme List</h3>
                <MDBTable hover className='tablescroll'>
                  <MDBTableHead color='blue-grey lighten-4'>
                    <tr>
                      <th>No.</th>
                      <th>Theme Name</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {listOfCategories.reverse().map((data,index) => {
                      let no = index +1;
                      return(
                      <tr key={index}>
                        <td>{no}</td>
                        <td>{data.catType}</td>
                        <td className='edittd'>
                          <EditCat data={data} />
                        </td>
                      </tr>
                    )})}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-4 row50'>
          <MDBCol md='12'>
            <MDBCard>
              <MDBCardBody>
                <h3>Style List</h3>
                <MDBTable hover className='tablescroll'>
                  <MDBTableHead color='blue-grey lighten-4'>
                    <tr>
                      <th>No.</th>
                      <th>Style Name</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {listOfStyles.reverse().map((data,index) => {
                      let no = index +1;
                      return(
                      <tr key ={index}>
                        <td>{no}</td>
                        <td>{data.styleType}</td>
                        <td className='edittd'>
                          <EditStyle data={data} />
                        </td>
                      </tr>
                    )})}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>



        <MDBRow className='mb-4 row50'>
          <MDBCol md='12'>
            <MDBCard>
              <MDBCardBody>
                <h3>Printing Size</h3>
                <MDBTable hover className='tablescroll'>
                  <MDBTableHead color='blue-grey lighten-4'>
                    <tr>
                      <th>No.</th>
                      <th>Size</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {listOfPrintSize.reverse().map((data,index) => {

                        let no = index +1;
return(
                      <tr key ={index}>
                        <td>{no}</td>
                        <td>{data.printSize}</td>
                        <td className='edittd'>
                          <EditPrintSize data={data} />
                        </td>
                      </tr>
)  })}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

      </div>
    );
  }
}

export default inject('startingStore')(observer(CategoryTable));
