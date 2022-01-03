import React, { Component } from 'react'
import { Button, Icon, Modal, Form , Message, Menu} from 'semantic-ui-react'
import {  getDatabase, ref, set,push,onValue} from '../../Firebase'

import { connect } from 'react-redux'
import { setcurrentgroup } from '../../Action/Main'


class Groups extends Component {
    state={
        groups: [],
        modal: false,
        Name: '',
        TagLine:'',
        error:'',
        firstLoad:true,
        active:''
    }
  
    //For Open Model by Clicking Add Icon
    openModal = ()=>{
        this.setState({modal:true})
    }
    //For Close Model
    closeModal = ()=>{
        this.setState({modal:false})
    }
   // Take Value From Input
    handleChange = (event)=>{
        this.setState({[event.target.name]: event.target.value})
    }
    //For From Submit
    handleSubmit = (e)=>{
        e.preventDefault()
        const {Name, TagLine} = this.state
        const {userName} = this.props
       
        if(this.isEmpty(this.state)){
            //Write Data in FireBase
            const db = getDatabase();
            const groupRef = ref(db, 'group');
            const newGroup = push(groupRef);
            set(newGroup, {
                groupName: Name,
                groupTagName: TagLine,
                createBy: userName,
               
            }).then(()=>{
                // After Write, What Happend
                this.setState({modal:false})
                this.setState({Name:''})
                this.setState({TagLine:''})
                this.setState({error:''})
            })

        }else{
            //Error 
            this.setState({error:'Fill All Input Box'})
        }
    }

    isEmpty = ({Name,TagLine})=>{
       if(Name && TagLine){
           return true
       }else{
           return false
       }
    }

    //Read Data From FireBase
    componentDidMount(){
            const groupAfterLoad = []

            const db = getDatabase();
            const groupRef = ref(db, 'group');

            onValue(groupRef, (snapshot) => {
            snapshot.forEach((item)=>{
                const groupData = {
                    id: item.key,
                    groupName: item.val().groupName,
                    groupTagName: item.val().groupTagName,
                    createBy: this.props.userName
                }
                 groupAfterLoad.push(groupData)
            })
            this.setState({groups:groupAfterLoad},this.addFirstGroup) 
        });
    }
    
    //First Group Load After Loading
    addFirstGroup = ()=>{
        const {firstLoad,groups} = this.state
        const firstGroup = this.state.groups[0]
        if(firstLoad && groups.length > 0){
            this.props.setcurrentgroup(firstGroup)
            this.setState({active:firstGroup.id})
          
        }

        this.setState({firstLoad:false})
    }
    //Change Group
    groupChange = (group)=>{
       this.props.setcurrentgroup(group)
       this.setState({active:group.id})
    }

    // OUTPUT
    render() {
        const {groups, modal,error,active} = this.state
       
        return (
        <>          
        <h4 style={{marginTop:'30px',color:'dodgerblue'}} >
            <Icon size='large' name='users' style={{marginRight:"10px"}} /> 
            Group List ({groups.length})
            <Icon size='large' style={{paddingLeft:"20px"}} name='add square' onClick={this.openModal}/>
        </h4>

        {/* SHOW GROUP NAME */}
        <Menu text vertical>
            {groups.map((item)=>(
               <Menu.Item header style={item.id == active? Active:notActive} onClick={()=>this.groupChange(item)}>{item.groupName}
               </Menu.Item>
            ))}
        </Menu>

        {/* Modal */}
        <Modal
            onClose={false}
            onOpen={true}
            open={modal}
            >
            <Modal.Header>Create New Groups</Modal.Header>
            <Modal.Content > 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <Form.Input  label='Name' onChange={this.handleChange} name='Name' placeholder='Name'/>
                    </Form.Field>
                    <Form.Field>
                    <Form.Input  label='Tag Line' onChange={this.handleChange} name='TagLine' placeholder='Tag Line'/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            {/* SHOW ERROR */}
            {error? <Message attached='bottom' error>{error}</Message>: ''}

            <Modal.Actions>
                <Button negative onClick={this.closeModal}>Cancel</Button>
                <Button color='blue' onClick={this.handleSubmit}>Add Group</Button>
            </Modal.Actions>
        </Modal>
        </>
        )
    }
}


const Active = {
    background:'skyblue',
    color: 'white',
    padding:'10px',
    marginLeft:'10px',
    borderRadius:'none',
    width:'21vw'
}
const notActive ={
   color:'black',
   width:'21vw'
}

export default connect(null, {setcurrentgroup})(Groups)