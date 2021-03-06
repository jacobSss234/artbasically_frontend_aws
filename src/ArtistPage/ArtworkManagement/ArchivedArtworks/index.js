import { message } from 'antd';
import { MDBBtn, MDBDataTable, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core'; 
  
   class PendingArtwork extends Component {
    state = {
      modal: false,
      items:[]
     
    };
  
     componentDidMount() {   
      let {
        startingStore: {getArtworkInfo, getArtists, getStyles, getCategories},
      } = this.props;
      getArtworkInfo();
      getArtists();
      getStyles();
      getCategories();
  
    }
     
  
    render() {
        let mydata = JSON.parse(sessionStorage.getItem('userData'))
      let { startingStore: {listOfArtworks, editArtwork, artwork}} = this.props;
  
      
      function createData(artworkDB,id,title,artist, style, date, price,action) {
        return { artworkDB,id,title,artist, style, date, price,action };
      }
  
  let pArtworks = listOfArtworks.filter((art) => {
              if (art.artworkStatus === 'Archived' && art.accID === mydata.accID) {
                return art;
              }
            }).map(arworks =>{
              return(createData(
             arworks,arworks.artworkID
             ,arworks.artistName,arworks.dateAdded
             ,arworks.artPrice
              ))
            })
  
  
          let  moreInfo = (itm) => {
            artwork.setProperty('artStyle',itm.artStyle)
              artwork.setProperty('artTheme',itm.artTheme)
              artwork.setProperty('artSize',itm.artSize)
              artwork.setProperty('artCategory',itm.artCategory)
              artwork.setProperty('artworkID',itm.artworkID)
              artwork.setProperty('artName',itm.artName)
              artwork.setProperty('artDescription',itm.artDescription)
              artwork.setProperty('artPrice',itm.artPrice)
              artwork.setProperty('artistName',itm.artistName)
              artwork.setProperty('artworkDateCreated',itm.artworkDateCreated)
              artwork.setProperty('artDimension',itm.artDimension)
              artwork.setProperty('artType',itm.artType)
              artwork.setProperty('dateAdded',itm.dateAdded)
              artwork.setProperty('artworkImg',itm.artworkImg)
            

              this.setState({
                modal: !this.state.modal
              });
         
            };
            let  close= () => {
       
              this.setState({
                modal: false
              });
              };
            let restore =(data)=>{
              artwork.setProperty('_id', data._id);
              artwork.setProperty('artworkStatus','Archived');
    
              editArtwork();
  
              const success = () => {
                message
                  .loading('', 1)
                  .then(() => message.success('Arwork Restored', 3));
              };
  
              setTimeout(() =>{
                success()
              },1000)
            }
          
  
  const PendingArtworkTable = () => {
    const data = {
      columns: [
        {
          label: 'No.',
          field: 'no',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Artist',
          field: 'artist',
          sort: 'asc',
          width: 'auto'
        },
  
        {
          label: 'Style',
          field: 'style',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
          width: 'auto'
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 'auto'
        },
      
      ],
      rows: 
     
      [...pArtworks.map((row,i) => {
        let no = i+1;
        return(
  
       {
          no: `${no}`,
          title: `${row.title}`,
          artist: `${row.artist}`,
        
          style: `${row.style}`,
          price: `${row.price}`,
          action:<div><MDBBtn  onClick={()=>moreInfo(row.artworkDB)} color='approve'> More Info</MDBBtn>
          <MDBBtn  onClick={()=>restore(row.artworkDB)} color='reject'> Restore</MDBBtn></div>,
        
  
       }
       
       ) })
      ]
  
    };
  
    return (
      <Fragment>
      <MDBDataTable
        striped
        bordered
        small
        data={data}
      />
  
  <MDBModal isOpen={this.state.modal} toggle={()=>close()} centered>
          <MDBModalHeader toggle={()=>close()}>Artwork Information</MDBModalHeader>
          <MDBModalBody>
            <Grid container direction='row' xs={12}>
            <Grid item xs={12}>
            <span className='arttitle'>
{artwork.artName}, {artwork.artworkDateCreated}
      </span>
       </Grid>
       <Grid item xs={4}  style={{border:'1px solid grey'}}>
       <div className='artImg'  >
                    <img
                
                      src={artwork.artworkImg}/></div>
</Grid>
<Grid item xs={8}  >
<div style={{padding:'10px'}}>
    <h6>Theme : {artwork.artTheme}</h6>
    <h6>Category : {artwork.artCategory}</h6>
                    <h6>Style : {artwork.artStyle} </h6>
    <h6>Size : {artwork.artSize}</h6>
    <h6>Price : &#8369;{artwork.artPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</h6>
    <h6>Description : {artwork.artDescription}</h6>
                    </div>
                    </Grid>
                    </Grid>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={()=>close()}>Close</MDBBtn>
         
          </MDBModalFooter>
        </MDBModal>
    </Fragment>
    );
  }
  
  return (
    <PendingArtworkTable/>
  )
  }
  }
  
  
  
  export default inject('startingStore')(observer(PendingArtwork))
  
  