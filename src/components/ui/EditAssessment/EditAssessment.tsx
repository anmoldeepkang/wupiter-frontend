import React, {FC} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {UserModel} from "infrastructure/context";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Modal,ListGroup,Col} from 'react-bootstrap';
import Video from '../Video/Video';
import {getQuestion} from "../../../service";

export default class EditAssessment extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render(){

    return (
      <>
      {this.props.editAssessment &&
        <div>
            <Modal show={this.props.editAssessment} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.newAssessment?'New Assessment':'Edit Assessment'}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflow: 'auto'}}>
            <Form>
                  <Form.Group controlId="assessmentTitle">
                    <Form.Label>Assessment Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter assessment title" onChange={e=>{this.props.handleTitleChange(e)}} value={this.props.modalAssessment.title} />
                  </Form.Group>
                  <Form.Group controlId="questionDescription">
                    <Form.Label>Assessment Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={e=>{this.props.handleDescriptionChange(e)}} value={this.props.modalAssessment.description}/>
                  </Form.Group>


                  </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>{this.props.close()}}>
                Close
              </Button>
              <Button variant="primary" onClick={async ()=>{await this.props.save()}}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
         </div>
      }
      </>
    );
  }
}
