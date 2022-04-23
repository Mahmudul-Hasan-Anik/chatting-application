import React, { Component } from 'react'
import { Segment,Divider,Input, Comment, Grid,Popup } from 'semantic-ui-react'

export default class MassageHeader extends Component {
    render() {
       const {group} = this.props
       console.log(group)
        return (
            <Segment style={{marginTop:'5px',height:'100px'}}>
                <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <Comment>
                  <Comment.Content>
                      <Comment.Author as='h4'></Comment.Author>
                      <Comment.Text>Member</Comment.Text> 
                  </Comment.Content>
                </Comment>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <Input placeholder='Search...' fluid/>
              </Grid.Column>
            </Grid>
          
            <Divider vertical></Divider>
          </Segment>
        )
    }
}

