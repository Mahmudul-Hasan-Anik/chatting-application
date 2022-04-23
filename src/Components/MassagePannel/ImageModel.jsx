import React, { Component } from 'react'
import { Button, Modal, Form , Input, Progress} from 'semantic-ui-react'
import { storage,getDatabase, push, set,child, ref as refer } from '../../Firebase'
import { getDownloadURL ,ref, uploadBytesResumable} from 'firebase/storage'

export default class ImageModel extends Component {
    state = {
        uploadFiles : '',
        progress: ''
    }

    handleFile = (e)=>{
        this.setState({uploadFiles:e.target.files[0]})
    }

    handleUpload = (e)=>{
        const {uploadFiles, progress} = this.state

        if(uploadFiles){
            const storageRef = ref(storage, `files/${uploadFiles.name}`);
            const uploadTask = uploadBytesResumable(storageRef, uploadFiles);
            uploadTask.on('STATE_CHANGED',(snapshot)=>{
                let progressCheck = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress: progressCheck})
                console.log(progress)
            }, (error)=>{
                console.log(error)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    console.log(url)

                    const {massage} = this.state
                    const {userName,group} = this.props


                    const db = getDatabase();
                    const massageRef = refer(db, 'files');
                    const newMassageRef = push(child(massageRef, `${group.id}`))
                    set(newMassageRef, {
                        filesUrl: url,
                        date: Date(),
                        sender: userName.uid,
                        groupName: group.id,
                        username: userName.displayName
                    }).then(()=>{
                        this.setState({uploadFiles:''})
                    })
                })
            })
        }else{
            console.log('Data Nai')
        }
    }
    render() {
        const {progress} = this.state
        const {close} = this.props
        return (
         <>   
        {/* Modal */}
        <Modal
            onClose={false}
            onOpen={true}
            open={this.props.modal}
            >
            <Modal.Header>Upload Your File</Modal.Header>
         
            <Modal.Content > 
            {progress?
            <>
              <Progress percent={progress} inverted progress success>
              Uploading...
              </Progress>
              </>
              :
              '' 
            }

              {/* ===From=== */}
                <Form onSubmit={this.handleSubmit}>
                <Input type='file' icon='upload' fluid onChange={this.handleFile}/>
                </Form>
            </Modal.Content>
          
            <Modal.Actions>
                <Button negative onClick={close}>Cancel</Button>
                <Button color='blue' onClick={this.handleUpload}>Sent</Button>
            </Modal.Actions>
        </Modal>  
        </>
        )
    }
}
