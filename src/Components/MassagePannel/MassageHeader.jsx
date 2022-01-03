import React, { Component } from 'react'
import { Segment,Divider,Button, Comment, Grid,Popup } from 'semantic-ui-react'

export default class MassageHeader extends Component {
    render() {
        return (
            <Segment style={{marginTop:'5px',height:'100px'}}>
                <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Comment>
        <Comment.Content>
            <Comment.Author as='h4'>React Native</Comment.Author>
            <Comment.Text>Mobile Application</Comment.Text>
            
        </Comment.Content>
        </Comment>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Popup
        trigger={<Button icon='volume up' color='smoke' circular/>}
        content="Control Sound"
        />
        <Popup
        trigger={<Button icon='search' color='smoke' circular/>}
        content="Search.."
        />
        <span style={{float:'right'}}>
        <Popup
        trigger={<Button icon='phone' color='smoke' circular/>}
        content="Quick Audio Call"
        />

        <Popup
        trigger={<Button icon='video' color='smoke' circular/>}
        content="Quick Video Call"
        />
        </span>
      </Grid.Column>
    </Grid>
  
    <Divider vertical></Divider>
            </Segment>
        )
    }
}

