import React, { Component } from 'react'
import { Segment,Input, Button,Comment } from 'semantic-ui-react'
import {getDatabase, ref, push, set,child, onChildAdded, onChildChanged} from '../../Firebase'
import ImageModel from './ImageModel'
import moment from 'moment'
export default class MassageBody extends Component {
    state = {
        modal: false,
        massage: '',
        textMassage:[]
    }


    //For Open Model by Clicking Add Icon
    openModal = ()=>{
        this.setState({modal:true})
    }
    //For Close Model
    closeModal = ()=>{
        this.setState({modal:false})
    }


    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    isEmpty = ({massage})=>{
        if(massage.length == ''){
            return false
        }else{
            return true
        }
    }

    handleSubmit = (e)=>{
        
        const {massage} = this.state
        const {userName,group} = this.props

        e.preventDefault() 
       if(this.isEmpty(this.state)){
        const db = getDatabase();
        const massageRef = ref(db, 'massage/');
        const newMassageRef = push(child(massageRef, `${group.id}`))
        set(newMassageRef, {
            outputMassage: massage,
            date: Date(),
            sender: userName.uid,
            groupName: group.id,
            username: userName.displayName
        }).then(()=>{
            this.setState({massage:''})
        })
       }      
    }
    
    //Show RealTime Data in Our window..
    componentDidUpdate(prevProps){
        const {group} = this.props

        let massageArray = []

        const db = getDatabase()
        const massageRef = ref(db, 'massage/' );

        onChildAdded(massageRef, (data) => {
           
            data.forEach((item)=>{
                massageArray.push(item.val())
          
            })

            if(prevProps.group){
               
                if(prevProps.group.groupName !== group.groupName){
                    this.setState({textMassage:massageArray})
                }
            }else{
                this.setState({textMassage:massageArray})
            }
           
        });

        onChildChanged(massageRef, (data) => {
            massageArray = []
            data.forEach((item)=>{
                massageArray.push(item.val())
            })

            if(prevProps.group){
                if(prevProps.group.groupName !== group.groupName){
                    this.setState({textMassage:massageArray})
                }
            }else{
                this.setState({textMassage:massageArray})
            } 
        });
    }
   
    render() {
        const {massage,textMassage,modal} = this.state
        const {userName,group} = this.props
        return (
            <>
            <Segment style={{height:'420px',overflowY:'scroll'}}>
                {textMassage.map((item)=>(
                    item.groupName == group.id?
                    <div>
                       <div style={userName.uid == item.sender? right:left}>
                           <Comment>
                            <Comment.Content>
                                <Comment.Author as='a'>{item.username}</Comment.Author>
                                <Comment.Metadata>
                                <span>{moment(item.date).fromNow()}</span>
                                </Comment.Metadata>
                                <Comment.Text style={userName.uid == item.sender? design:notDesign}>
                                    {item.outputMassage}
                                </Comment.Text>
                            </Comment.Content>
                            </Comment>
                        </div>  
                    </div>   
                    :
                    ''
                ))}
 
            </Segment>

            {/* MASSAGE INPUT SEGMENT    */}
            <Segment style={{marginTop:'0px',height:'100px'}}>
                <Input 
                placeholder='Write Your Massage' 
                style={{width:'400px',paddingTop:'20px'}}
                onChange={this.handleChange}
                name='massage'
                value={massage}
                />

                <span style={{float:'right',paddingTop:'20px'}}>
                <Button icon='send' circular color='twitter' onClick={this.handleSubmit} ></Button>
                <Button icon='microphone' circular color='twitter'></Button>

                {/* MODEL BUTTON START */}
                <Button icon='add' circular color='twitter' onClick={this.openModal}></Button>
                <ImageModel modal={modal} close={this.closeModal}/>
                {/* MODEL BUTTON END */}
                </span>
            </Segment>
            </>
        )
    }
}


const right = {
    textAlign:'right',
    padding:'5px 15px',
    borderRadius:'10px',
    margin:'5px',
}
const left = {
    textAlign:'left',
    
    padding:'5px 15px',
    borderRadius:'10px',
    display:'inline-block',
    margin:'5px',
   
}

const design = {
    background:'skyblue', 
    display:'inline-block',
    padding:'5px 15px',
    borderRadius:'5px',
}
const notDesign = {
    background:'pink', 
    display:'inline-block',
    padding:'5px 15px',
    borderRadius:'5px',
}