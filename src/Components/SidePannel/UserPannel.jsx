import React, { Component } from 'react'
import { Grid,Icon,Dropdown, Header } from 'semantic-ui-react'
import { auth, signOut } from '../../Firebase'
export default class UserPannel extends Component {
//For Sign Out
    handleChange = (user)=>{
        signOut(auth).then(() => {
            console.log('Sign Out')
        }).catch((error) => {
            console.log(error)
        });
      }

//For DropDown
    handleDropdown = ()=>[
        {
            text: <span>Loged As {this.props.userName}</span>,
            disabled: true
        },
        {
            text: <span>Change Profile Picture</span>
        },
        {
            text: <span onClick={this.handleChange}>Log Out</span>
        },
    ]

    render() {
        return (
            <Grid >
                <Grid.Row>
                <Grid.Column >
                <Icon  name='digital ocean ' size='big' style={{color:'#1871E3'}}/> 
                   <span style={{fontSize:'18px',fontWeight:'bolder'}}> ChitChat</span>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column>
                    <Header as='h4'>

                    <Dropdown trigger={ <span>{this.props.userName}</span>} 
                    options={this.handleDropdown()}></Dropdown>
                    </Header>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
