import React, { Component } from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'

export default class ColorPannel extends Component {
    render() {
        return (
           
    <Sidebar
      as={Menu}
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
      style={{width:'100px',paddingTop:'100px'}}
    >
   {/* STYLE START HERE */}
    <Menu.Item as='a'>
        <Icon name='file alternate' />
       Documents
    </Menu.Item> 

    <Menu.Item as='a'>
        <Icon name='group' />
        Contact
    </Menu.Item> 

    <Menu.Item as='a'>
        <Icon name='whmcs' />
        setting
    </Menu.Item> 

    <Menu.Item as='a'>
        <Icon name='bell' />
        Notification
    </Menu.Item> 

    <Menu.Item as='a'>
        <Icon name='moon' />
        Change Mood
    </Menu.Item> 

    <Menu.Item as='a'>
        <Icon name='power off' />
        SignOut
    </Menu.Item> 
      
    </Sidebar>
        )
    }
}
// bell
// file alternate
