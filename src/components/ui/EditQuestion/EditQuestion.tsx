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

export default class EditQuestion extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render(){

    return (
      <>

        <div>
            <Modal show={this.props.editQuestion} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.newQuestion?'New Question':'Edit Question'}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflow: 'auto'}}>
            <Form>
                  <Form.Group controlId="questionTitle">
                    <Form.Label>Question Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter question title" onChange={e=>{this.props.handleTitleChange(e)}} value={this.props.modalQuestion.title} />
                  </Form.Group>
                  <Form.Group controlId="questionDescription">
                    <Form.Label>Question Description</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={e=>{this.props.handleDescriptionChange(e)}} value={this.props.modalQuestion.description}/>
                  </Form.Group>
                  {this.props.modalQuestion.questionType=='Video' &&
                    <Form.Group controlId="questionVideo">
                      <Video src={this.props.modalQuestion.videoUrl} updateVideoFile={(file)=>{this.props.updateVideoFile(file)}}/>
                    </Form.Group>
                  }
                    <div>
                    <Form.Group controlId="answerType">
                      <Form.Label>Answer Type</Form.Label>
                      <Form.Control as="select" onChange={(e)=>{this.props.handleAnswerTypeChange(e)}}>
                        <option value="MCQ" selected={this.props.modalQuestion.answerType=='MCQ'}>MCQ</option>
                        <option value="Video" selected={this.props.modalQuestion.answerType=='Video'}>Video</option>
                      </Form.Control>

                  </Form.Group></div>
                  {this.props.modalQuestion.answerType=='MCQ' &&
                    <div>
                    <Form.Group controlId="choices">
                      <Form.Label>Choices</Form.Label>
                      <ListGroup>
                        {this.props.modalQuestion.choices && this.props.modalQuestion.choices.map((item, index) => (
                          <ListGroup.Item key={item.id}>
                          <Form.Row style={{alignItems:'center'}}>
                            <Form.Group as={Col}>
                              <Form.Control type="text" placeholder="Enter choice text" onChange={e=>{this.props.handleChoiceTextChange(item.id,e);}} value={item.description} />
                            </Form.Group>
                            <Form.Group as={Col}>
                            <Form.Check type="checkbox" label="Correct" defaultChecked={item.correct} onChange={e=>{this.props.handleChoiceCorrectChange(item.id,e);}} />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Button variant="secondary" onClick={()=>{this.props.removeChoice(item.id)}}>
                                      Delete
                              </Button>
                            </Form.Group>
                          </Form.Row>
                          </ListGroup.Item>
                        ))}

                      </ListGroup>
                      </Form.Group>
                      <Form.Group>
                        <Button variant="primary" onClick={()=>{this.props.addChoice()}}>
                                Add choice
                        </Button>
                      </Form.Group>
                      </div>
                    }
                      <Form.Group controlId="timeLimit">
                        <Form.Label>Time Limit</Form.Label>
                        <Form.Control as="select" onChange={(e)=>{this.props.handleTimeLimitChange(e)}}>
                          <option value="60" selected={this.props.modalQuestion.timeLimit==60}>1 minute</option>
                          <option value="120" selected={this.props.modalQuestion.timeLimit==120}>2 minutes</option>
                          <option value="300" selected={this.props.modalQuestion.timeLimit==300}>5 minutes</option>
                          <option value="-1" selected={this.props.modalQuestion.timeLimit==-1}>unlimited</option>
                        </Form.Control>
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

      </>
    );
  }
}
