import React, { Component } from 'react'
import { Grid, Image,Button, Icon} from 'semantic-ui-react'
import Anything from  "../image/Seven.png"
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <Grid>
              <Grid.Row style={{padding:'20px 80px'}}>
                <Grid.Column width={6} >
                <Icon  name='digital ocean ' size='huge' style={{color:'#1871E3'}}/> 
                   <span style={{fontSize:'25px',fontWeight:'bolder'}}> ChitChat</span>
                </Grid.Column>
              </Grid.Row>
           
                  
            <Grid.Row>
              <Grid.Column width={7} style={{padding:'0px 100px'}}>  
                <Grid.Column style={{marginTop:'100px'}}>
                    <h1 style={{fontSize:'25px'}}>Easy To Use Our Chat App</h1>
                    <p>Desktop App – Easy to use our chat app, Attractive and
                    clean design, with many Features Dark  light, Recent Chat And many more.......
                    </p>

                    <Button color='blue' style={{marginTop:'70px'}}>
                      <Link style={{color:'white'}} to='/registration'>Start For Free</Link>
                    </Button>
                </Grid.Column> 
              </Grid.Column>
             {/* Picture Column */}
              <Grid.Column width={8}>
                <Image src={Anything} style={{margin:'50px 0px'}}/>
              </Grid.Column>
            </Grid.Row>
            </Grid> 
            )
    }
}

