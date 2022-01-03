import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image,Button, Icon, Form, Message } from 'semantic-ui-react'
import Anything from  "../../image/Six.png"
import { auth, signInWithEmailAndPassword ,} from '../../Firebase'

export default class Login extends React.Component {
    state={
        Email: '',
        Password: '',
        ErrorMsg:'',
        SuccessMsg:'',
      }
    
      handleChange = (e)=>{
        this.setState({[e.target.name] : e.target.value})
      }
    
      isEmpty({Email,Password}){
        if(!Email.length || !Password.length){
          this.setState({ErrorMsg:'Fill All Feild'})
        }else if(Password.length < 6){
          this.setState({ErrorMsg:'Password Should be 6 Character or more'})
        }else{
          return true
        }
      }
    
      handleSubmit = (e)=>{
        e.preventDefault()
        const { Email, Password} = this.state
    
        if(this.isEmpty(this.state)){
          this.setState({SuccessMsg:''})
    
          //Authentication Start Here...
          signInWithEmailAndPassword(auth, Email, Password)
          .then((user)=>{
            this.setState({Email:''})
            this.setState({Password:''})
            this.setState({ErrorMsg:''})
            this.setState({SuccessMsg:'Account Sign In Succssful'})

          }).catch((error) => {
            // If Login unsuccefull, this Catch Block execute..
    
            const errorMessage = error.message;
            console.log(errorMessage)
            if(errorMessage.includes('user')){
              this.setState({ErrorMsg:'User Not Found'})
            }
            this.setState({SuccessMsg:''})
          });
        }
      }




    render(){
        const {Password,Email, ErrorMsg, SuccessMsg} = this.state
          return (
              <Grid>
              <Grid.Row>
                <Grid.Column width={6} style={{padding:'70px 100px'}}>
                <Icon  name='digital ocean ' size='huge' style={{color:'#1871E3'}}/> 
                <span style={{fontSize:'25px',fontWeight:'bolder'}}> ChitChat</span>
          
                     <h1>Hello Everyone , We are Chitchat</h1>
                     <p>Welcome to chitchat, please login to your account</p>
  
                     {ErrorMsg?<Message error header={ErrorMsg}/>:''}
                     {SuccessMsg?<Message success header={SuccessMsg}/>:''}                    
                     
                  <Form onSubmit={this.handleSubmit}>
                      <Form.Field>
                      <label>Email Address</label>
                      <input placeholder='Enter Your Email' name='Email' onChange={this.handleChange} value={Email}/>
                      </Form.Field>
                      <Form.Field>
                      <label>Password</label>
                      <input placeholder='Password' type='password' name='Password' onChange={this.handleChange} value={Password} />
                      </Form.Field>
                      
                      
                      <Button type='submit' fluid color='blue'>Sign In</Button>

                    
                  </Form>
                  <p style={{marginTop:'20px',fontWeight:'bold'}}>Create an account? <Link to='/registration'>Sign Up</Link></p>

                </Grid.Column>
          
                <Grid.Column width={8}>
                  <Image src={Anything} style={{margin:'50px 0px'}}/>
                </Grid.Column>
              </Grid.Row>
              </Grid> 
              )
      }
}
