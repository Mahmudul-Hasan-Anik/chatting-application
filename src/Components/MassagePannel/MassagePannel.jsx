import React, { Component } from 'react'
import MassageHeader from './MassageHeader'
import MassageBody from './MassageBody'

export default class MassagePannel extends Component {
    
    render() {
        return (
            <>
            <MassageHeader/>
            <MassageBody userName={this.props.userName} group={this.props.group}/>
            </>
        )
    }
}
