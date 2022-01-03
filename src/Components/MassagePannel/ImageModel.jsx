import React, { Component } from 'react'
import { Button, Modal, Form , Input, Progress} from 'semantic-ui-react'
import { storage } from '../../Firebase'
import { getDownloadURL, ref , uploadBytesResumable} from 'firebase/storage'

export default class ImageModel extends Component {
    state = {
        uploadFiles : '',
        progress: ''
    }

    handleFile = (e)=>{
        this.setState({uploadFiles:e.target.files[0].name})
    }

    handleUpload = (e)=>{
        const {uploadFiles, progress} = this.state

        if(uploadFiles){
            const storageRef = ref(storage, `files/`);
            const uploadTask = uploadBytesResumable(storageRef, uploadFiles);
            uploadTask.on('state-changed',(snapshot)=>{
                let progressCheck = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress: progressCheck})
                console.log(progress)
            }, (error)=>{
                console.log(error)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    console.log(url)
                })
            })
        }else{
            console.log('Data Nai')
        }
    }
    render() {
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
