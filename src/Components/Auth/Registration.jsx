import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image,Button, Icon, Form, Message, Loader } from 'semantic-ui-react'
import Anything from  "../../image/Two.png"
import { auth, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set } from '../../Firebase'

export default class Registration extends React.Component{
  state={
    Name: '',
    Email: '',
    Password: '',
    ConformPassword: '',
    ErrorMsg:'',
    SuccessMsg:'',
    Loading: false
  }

  handleChange = (e)=>{
    this.setState({[e.target.name] : e.target.value})
  }

  isEmpty= ({Name,Email,Password,ConformPassword})=>{
    if(!Name.length || !Email.length || !Password.length || !ConformPassword.length ){
      this.setState({ErrorMsg:'Fill All Feild'})
    }else if(Password.length < 6 || ConformPassword < 6){
      this.setState({ErrorMsg:'Password Should be 6 Character or more'})
    }else if(Password != ConformPassword){
      this.setState({ErrorMsg:'Password Not Matched'})
    }else{
      return true
    }
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const { Name, Email, Password} = this.state

    if(this.isEmpty(this.state)){
      this.setState({Loading:true})

      //Authentication Start Here...
      createUserWithEmailAndPassword(auth, Email, Password)
      .then((user)=>{
        console.log(user)
        // This is For Profile Name 
        updateProfile(auth.currentUser, {
          displayName: Name
        }).then(()=>{
          //This then for Below RealTime DataBase Function Execution
          this.writeUserData(user)
        })
        .then(() => {
          // If Registration succefull, this then Block execute
          this.setState({Name:''})
          this.setState({Email:''})
          this.setState({Password:''})
          this.setState({ConformPassword:''})
          this.setState({ErrorMsg:''})
          this.setState({Loading:false})
          this.setState({SuccessMsg:'Your Registration is Successful'})
        })
      }).catch((error) => {
        // If Registration unsuccefull, this Catch Block execute..

        const errorMessage = error.message;
        console.log(errorMessage)
        if(errorMessage.includes('email')){
          this.setState({ErrorMsg:'Email Already Used'})
        }

        this.setState({SuccessMsg:''})
        this.setState({Loading:false})
      });
    }
  }
  
  //RealTime DataBase Start
  writeUserData(user) {
    const {Name, Email} = this.state
    const db = getDatabase();
    set(ref(db, 'users/' + user.user.uid), {
      username: Name,
      email: Email
    });
  }
  //RealTime DataBase End

    render(){
      const {Name,Password,ConformPassword,Email, ErrorMsg, SuccessMsg, Loading} = this.state
        return (
            <Grid>
            <Grid.Row>
              <Grid.Column width={6} style={{padding:'20px 100px'}}>
              <Icon  name='digital ocean ' size='huge' style={{color:'#1871E3'}}/> 
              <span style={{fontSize:'25px',fontWeight:'bolder'}}> ChitChat</span>
        
                   <h1>Hello Everyone , We are Chitchat</h1>
                   <p>Welcome to chitchat, please Register to your account.</p>
                   
                   {ErrorMsg?<Message error header={ErrorMsg}/>:''}
                   {SuccessMsg?<Message success header={SuccessMsg}/>:''}                    
                   
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <label>User Name</label>
                    <input placeholder='Enter Your Name' type='text' name='Name' onChange={this.handleChange} value={Name} />
                    </Form.Field>
                    <Form.Field>
                    <label>Email Address</label>
                    <input placeholder='Enter Your Email' name='Email' onChange={this.handleChange} value={Email}/>
                    </Form.Field>
                    <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type='password' name='Password' onChange={this.handleChange} value={Password} />
                    </Form.Field>
                    <Form.Field>
                    <label>Conform Password</label>
                    <input placeholder='Conform Password' type='password' name='ConformPassword' onChange={this.handleChange} value={ConformPassword} />
                    </Form.Field>
                    
                    <Button type='submit' fluid color='blue' className={Loading? 'disabled':''}>
                      Sign Up
                      {Loading? <Loader size='big' active>Loading</Loader>:''}
                      </Button>
                </Form>
                <p style={{marginTop:'20px',fontWeight:'bold'}}>
                  Have You Already an account? <Link to='/login'>Sign In</Link>
                </p>
              </Grid.Column>
        
              <Grid.Column width={8}>
                <Image src={Anything} style={{margin:'50px 0px'}}/>
              </Grid.Column>
            </Grid.Row>
            </Grid> 
            )
    }
   
}


