import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import Groups from './Groups'
import UserPannel from './UserPannel'

export default class SidePannel extends Component {
    render() {
        return (
            <Menu vertical style={Style}  size='massive'>
               <UserPannel userName={this.props.userName}></UserPannel>
               <Groups userName={this.props.userName}/>
            </Menu>
         
        )
    }
}

const Style = {
    background:'white',
    textAlign:'center',
    paddingTop:'20px',
    marginLeft:'20px',
    height:'100vh',
    width:'100%'
    
}