
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {
    MDBBreadcrumb,
    MDBBreadcrumbItem, MDBCard,
    MDBCardBody,
    MDBBtn
} from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import React, { Component, Fragment } from 'react';
import {inject,observer} from 'mobx-react'

class AccountSettings extends Component {


    componentDidMount(){
        let {startingStore:{getAccounts}}=this.props
        getAccounts()
    }
    render() {
let{startingStore:{listOfUsers,account,editAccount}}=this.props;
let mydata =JSON.parse(sessionStorage.getItem('userData'))
function createData(fname,lname,contact,address,email,byear,institution,pass,action){
    return{fname,lname,contact,address,email,byear,institution,pass,action}
}


let edit =()=>{
  
    editAccount();

}

let getMyData = listOfUsers.filter(usr => usr.accID === mydata.accID).map(data => {
    return (createData(
        data.accFname,data.accLname,data.accContact,data.accAddress,data.accEmailAddress,data.birthYear,data.accInstitution,data.password,<div><MDBBtn color='yellow' onClick={()=>edit(data)}> Edit Info</MDBBtn></div>
    ))
})
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:'16px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

 function SettingGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

<div className='adminbreadcrumb'>
        <MDBCard>
          <MDBCardBody
            id='breadcrumb'
            className='d-flex align-items-center justify-content-between'
          >
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Account</MDBBreadcrumbItem>
            </MDBBreadcrumb>
      
          </MDBCardBody>
        </MDBCard>
      </div>
        
      
      <h4 className='title' >
          Account Settings
      </h4>
      
      <h6 className='title' >
          General
      </h6>
      <Grid container spacing={3} alignItems='center' justify='center'>
      {getMyData.map((row,i) => { 
          let a = i+1;
          return(
<Fragment key={a}>
<Grid item xs={8} >
          <Paper className={classes.paper}><span style={{marginRight:'70px'}}>Name :</span>
          <TextField type='text' defaultValue={row.fname} label='first name' onChange={accFname =>{account.setProperty('accFname',accFname.target.value)}}> </TextField>&nbsp;&nbsp;&nbsp;
          <TextField type='text' defaultValue= {row.lname} label='last name'> </TextField>
          </Paper>
        </Grid>
        <Grid item xs={8} >
          <Paper className={classes.paper}><span style={{marginRight:'28px'}}>Contact No : </span> <TextField type='text' defaultValue={row.contact} onChange={accContact=>{account.setProperty('accContact',accContact.target.value)}}> </TextField></Paper>
        </Grid>
        <Grid item xs={8} >
          <Paper className={classes.paper}><span style={{marginRight:'50px'}}>Address :</span> <TextField type='text' defaultValue={row.address} onChange={accAddress=>{account.setProperty('accAddress',accAddress.target.value)}}> </TextField></Paper>
        </Grid>
       
        <Grid item xs={8} >
          <Paper className={classes.paper}><span style={{marginRight:'40px'}}>Birth Year :</span>  <TextField type='text' defaultValue={row.byear} onChange={birthYear=>{account.setProperty('birthYear',birthYear.target.value)}}> </TextField></Paper>
        </Grid>
        <Grid item xs={8} >
          <Paper className={classes.paper}><span style={{marginRight:'40px'}}>Institution :</span>   <TextField type='text' defaultValue={row.institution}> </TextField></Paper>
        </Grid>
        
        <Grid item xs={12} >
          <h6>Security and Login</h6>
        </Grid>
        <Grid item xs={8} >
        <Paper className={classes.paper}><span style={{marginRight:'70px'}}>Email :</span> <TextField type='text' defaultValue={row.email} onChange={accEmailAddress=>{account.setProperty('accEmailAddress',accEmailAddress.target.value)}}> </TextField></Paper>
        </Grid>
        <Grid item xs={8} >
          <Paper className={classes.paper}><span style={{marginRight:'50px'}}>Password :</span> <TextField type='password' defaultValue={row.pass} onChange={password=>{account.setProperty('password',password.target.value)}}> </TextField></Paper>
        </Grid>
        <Grid item xs={8} >
        {row.action}
        </Grid >
        </Fragment> 
         )})}
      </Grid>
    </div>
  );
}
return (
    <SettingGrid/>
)
}
}

export default inject('startingStore')(observer(AccountSettings))
