import React from "react";
import {FC} from "react";
import {Table,DropdownButton,Dropdown,Container,Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteProps } from "react-router";
import Video from "../../ui/Video/Video";
import {getQuestions,
  getQuestion,
  getAssessment,
  updateAssessment,
  uploadVideo,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  sendInvitationForAssessment
} from "../../../service";
import styled, {ThemeProvider} from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditQuestion from "../../ui/EditQuestion/EditQuestion";
import {Form,ListGroup,Col,Modal,Button as Btn,Card} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const PageContainer = styled.div`
  display: flex;
  margin:auto;
  max-width:1160px;
  flex-direction: column;
`;
export default class AssessmentDetails extends React.Component<any, any>  {
  constructor(props:any) {

    super(props);
    this.state={
      assessmentId:"",
      assessment:{},
      questions:[],
      modalQuestion:{},
      editQuestion:false,
      videoFile:null,
      newQuestion:false,
      welcomeVideoModal:false,
      inviteCandidatesModal:false,
      candidateInvite:{assessmentId:"",firstName:"",lastName:"",email:""}
    }

  }

  async componentDidMount() {
    let assessmentId=window.location.pathname.split("/")[2];
    let candidateInvite=this.state.candidateInvite;
    candidateInvite.assessmentId=assessmentId;
    this.setState({candidateInvite:candidateInvite});
    let data=await getQuestions(assessmentId);
    this.setState({assessmentId:assessmentId});
    await this.refreshQuestions();
    data=await getAssessment(assessmentId);
    this.setState({assessment:data});
  }
  async refreshQuestions() {
    const data=await getQuestions(this.state.assessmentId);
    this.setState({questions:data});
  }
  editQuestion=async(questionId) => {
    let data=await getQuestion(questionId);
    if(data.videoUrl!="") {
      data.videoUrl=data.videoUrl+"?t="+new Date();
    }
    this.setState({modalQuestion:data});
    this.setState({editQuestion:true});
  }
  editWelcomeVideo=async ()=>{
    let assessment=this.state.assessment;
    if(assessment.welcomeVideoUrl!="") {
      assessment.welcomeVideoUrl=assessment.welcomeVideoUrl+"?t="+new Date();
      this.setState({assessment:assessment});
    }
    this.setState({welcomeVideoModal:true});
  }
  deleteQuestion=async(questionId)=>{
    await deleteQuestion(questionId);
    await this.refreshQuestions();
  }
  openNewQuestion=async(type) =>{
    let modalQuestion={
      videoUrl:"",
      timeLimit:60,
      choices:[],
      optional:false,
      answerType:"MCQ",
      answerSubType:"",
      questionType:type,
      description:"",
      title:"",
      assessmentId:this.state.assessmentId
    }
    this.setState({modalQuestion:modalQuestion});
    this.setState({editQuestion:true});
    this.setState({newQuestion:true});

  }
  closeEditQuestion=async()=> {
    this.setState({newQuestion:false});
    this.setState({editQuestion:false});
  }
  removeChoice=(id)=> {
    let choices=this.state.modalQuestion.choices.filter(function(choice){
      return choice.id!=id;
    });
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.choices=choices;
    this.setState({modalQuestion:modalQuestion});
  }
  save=async()=> {
    if(this.state.videoFile) {
      await uploadVideo(this.state.videoFile);
      let modalQuestion=this.state.modalQuestion;
      modalQuestion.videoUrl="https://wupiter1.blob.core.windows.net/videos/"+this.state.videoFile.name;
      this.setState({modalQuestion:modalQuestion});
    }
    if(this.state.newQuestion) {
      await createQuestion(this.state.modalQuestion);
    } else {
      await updateQuestion(this.state.modalQuestion);
    }
    this.setState({newQuestion:false});
    this.setState({editQuestion:false});
    this.refreshQuestions();
  }
  saveWelcomeVideo=async()=>{
    if(this.state.videoFile) {
      await uploadVideo(this.state.videoFile);
      let assessment=this.state.assessment;
      assessment.welcomeVideoUrl="https://wupiter1.blob.core.windows.net/videos/"+this.state.videoFile.name;
      this.setState({assessment:assessment});
      await updateAssessment(this.state.assessment);
    }
    this.setState({welcomeVideoModal:false});
  }
  handleTitleChange=(e)=> {
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.title=e.target.value;
    this.setState({modalQuestion:modalQuestion});
  }
  handleDescriptionChange=(e)=> {
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.description=e.target.value;
    this.setState({modalQuestion:modalQuestion});
  }
  handleChoiceTextChange=(id,e)=> {
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.choices.forEach(choice => {
      if(choice.id==id) {
        choice.description=e.target.value;
      }
    });

    this.setState({modalQuestion:modalQuestion});
  }
  handleChoiceCorrectChange=(id,e)=> {
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.choices.forEach(choice => {
      if(choice.id==id) {
        choice.correct=e.target.checked;
      }
    });

    this.setState({modalQuestion:modalQuestion});
  }
  handleTimeLimitChange=(e)=> {
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.timeLimit=Number(e.target.value);
    this.setState({modalQuestion:modalQuestion});
  }
  handleAnswerTypeChange=(e)=> {
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.answerType=e.target.value;
    this.setState({modalQuestion:modalQuestion});
  }
  updateVideoFile=(file)=>{
    this.setState({videoFile:file});
  }
  addChoice=()=> {
    let choice={id:uuidv4(),description:"",correct:false};
    let modalQuestion=this.state.modalQuestion;
    modalQuestion.choices.push(choice);
    this.setState({modalQuestion:modalQuestion});
  }
  handleFirstNameChange=(e)=> {
    let candidateInvite=this.state.candidateInvite;
    candidateInvite.firstName=e.target.value;
    this.setState({candidateInvite:candidateInvite});
  }
  handleLastNameChange=(e)=> {
    let candidateInvite=this.state.candidateInvite;
    candidateInvite.lastName=e.target.value;
    this.setState({candidateInvite:candidateInvite});
  }
  handleEmailChange=(e)=> {
    let candidateInvite=this.state.candidateInvite;
    candidateInvite.email=e.target.value;
    this.setState({candidateInvite:candidateInvite});
  }
  sendInvite=async()=>{
    await sendInvitationForAssessment(this.state.candidateInvite);
    this.setState({candidateInvite:{firstName:"",lastName:"",email:"",assessmentId:this.state.assessmentId},inviteCandidatesModal:false});
  }
  render(){
    const data=this.state.questions;
  return (
    <>
      <PageContainer>

        <Card style={{marginBottom:'20px'}}>
          <Card.Body>
            <Card.Title>Assessment: {this.state.assessment.title}</Card.Title>
            <Card.Text>
              {this.state.assessment.description}
            </Card.Text>
            <div style={{display:'flex'}}>
            <Button style={{display:'flex',width:'fit-content',marginBottom:'20px',marginRight:'20px'}} color="primary" variant="contained" onClick={async ()=>{this.editWelcomeVideo()}}>
              Welcome Video
            </Button>
            <Button style={{display:'flex',width:'fit-content',marginBottom:'20px',marginRight:'20px'}} color="primary" variant="contained">
              <Link to={"/assessments/"+this.state.assessmentId+"/submissions"} style={{textDecoration:'none',color:'white'}}>Submissions</Link>
            </Button>
            <Button style={{display:'flex',width:'fit-content',marginBottom:'20px'}} color="primary" variant="contained" onClick={()=>{this.setState({inviteCandidatesModal:true})}}>
              Invite Candidate
            </Button>
            </div>
          </Card.Body>
        </Card>
        <Card>

          <Card.Body>

        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
        <Card.Title style={{marginBottom:'0px'}}>Questions</Card.Title>

          <DropdownButton id="dropdown-basic-button" title="New Question">
            <Dropdown.Item onClick={async()=>{await this.openNewQuestion('MCQ')}}>Non-video</Dropdown.Item>
            <Dropdown.Item onClick={async()=>{await this.openNewQuestion('Video')}}>Video</Dropdown.Item>
          </DropdownButton>

          </div>
          <ListGroup>

            {data && data.map((item, index) => (
              <ListGroup.Item key={index}>
              <Container>
              <Row>
              <Col xs={12} md={10} style={{display:'flex',alignItems:'center'}}>
                  {item.title}
              </Col>
              <Col style={{display:'flex',justifyContent:'flex-end'}}>

                <IconButton aria-label="delete" onClick={async ()=>{await this.editQuestion(item.id)}}>
                         <EditIcon />
                </IconButton>

                <IconButton aria-label="delete" onClick={async()=>{await this.deleteQuestion(item.id)}}>
                          <DeleteIcon />
                </IconButton>
                </Col>
                </Row>
                </Container>


              </ListGroup.Item>
            ))}

            </ListGroup>
          </Card.Body>
          </Card>

              <EditQuestion questionId={this.state.modalQuestion.id}
                isOpen={this.state.editQuestion}
                close={this.closeEditQuestion}
                removeChoice={this.removeChoice}
                save={this.save}
                handleTitleChange={this.handleTitleChange}
                handleDescriptionChange={this.handleDescriptionChange}
                handleChoiceTextChange={this.handleChoiceTextChange}
                handleChoiceCorrectChange={this.handleChoiceCorrectChange}
                handleTimeLimitChange={this.handleTimeLimitChange}
                handleAnswerTypeChange={this.handleAnswerTypeChange}
                addChoice={this.addChoice}
                updateVideoFile={this.updateVideoFile}
                {...this.state}/>
              {this.state.welcomeVideoModal &&
                <div>
                    <Modal show={this.state.welcomeVideoModal} onHide={()=>{this.setState({welcomeVideoModal:false})}}>
                    <Modal.Header closeButton>
                      <Modal.Title>Welcome Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflow: 'auto'}}>
                    <Video src={this.state.assessment.welcomeVideoUrl} updateVideoFile={(file)=>{this.updateVideoFile(file)}}/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Btn variant="secondary" onClick={()=>{this.setState({welcomeVideoModal:false})}}>
                        Close
                      </Btn>
                      <Btn variant="primary"  onClick={async ()=>{await this.saveWelcomeVideo()}}>
                        Save Changes
                      </Btn>
                    </Modal.Footer>
                  </Modal>
                 </div>
              }
              {this.state.inviteCandidatesModal &&
                <div>
                    <Modal show={this.state.inviteCandidatesModal} onHide={()=>{this.setState({inviteCandidatesModal:false})}}>
                    <Modal.Header closeButton>
                      <Modal.Title>Invite Candidates</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflow: 'auto'}}>
                    <Form>
                          <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" onChange={e=>{this.handleFirstNameChange(e)}} />
                          </Form.Group>
                          <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" onChange={e=>{this.handleLastNameChange(e)}} />
                          </Form.Group>
                          <Form.Group controlId="email">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter e-mail" onChange={e=>{this.handleEmailChange(e)}} />
                          </Form.Group>
                          </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Btn variant="secondary" onClick={()=>{this.setState({inviteCandidatesModal:false})}}>
                        Close
                      </Btn>
                      <Btn variant="primary"  onClick={async ()=>{await this.sendInvite()}}>
                        Save Changes
                      </Btn>
                    </Modal.Footer>
                  </Modal>
                 </div>
              }
      </PageContainer>
      </>

  );}
}
