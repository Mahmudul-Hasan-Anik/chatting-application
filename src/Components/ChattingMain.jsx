import React, { Component } from 'react'
import { auth } from "../Firebase";
import { connect } from 'react-redux';
import { setUser,clearUser } from '../Action/Main'
import { Loader, Grid } from 'semantic-ui-react';
import ColorPannel from './ColorPannel/ColorPannel'
import SidePannel from './SidePannel/SidePannel'
import MassagePannel from './MassagePannel/MassagePannel'
import MetaPannel from './MetaPannel/MetaPannel'

class ChattingMain extends Component {

  componentDidMount(){

    auth.onAuthStateChanged((user)=>{
      if(user){
       this.props.setUser(user)
      }else{
        this.props.clearUser()
      }
    })
  }
    render() {
      const { Loading } = this.props
      return(
      <>
        {Loading?
         <> 
         <Loader size='massive' active>Loading</Loader>
         </>
         :
         <>
          <Grid  columns='equal' className='Chatting'>

            {/* First Components */}
            <Grid.Column  style={{width:'4%'}}>
            <ColorPannel></ColorPannel>
            </Grid.Column>

            {/* Second Components */}   
            <Grid.Column  style={{width:'22%'}}>
              <SidePannel userName={this.props.userName.displayName}></SidePannel>
            </Grid.Column>

            {/* Third Components */}
            <Grid.Column  style={{width:'45%',background:'#EFF7FE'}}>
            <MassagePannel userName={this.props.userName} group={this.props.group}></MassagePannel>
            </Grid.Column>

            {/* Fourth Components */}
            <Grid.Column   style={{background:'skyblue',width:'17%'}}>
            <MetaPannel></MetaPannel>
            </Grid.Column>
          </Grid>
         </>
        }
      </>
      )
    }
}

const mapStateToProps = (state)=>({
  Loading: state.user.Loading,
  userName: state.user.currentUser,
  group: state.group.currentgroup
})
 

export default connect(mapStateToProps, {setUser,clearUser})(ChattingMain)
