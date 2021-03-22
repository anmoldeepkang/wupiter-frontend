import React from "react";
import {FC} from "react";
import {Table,ListGroup,Col,Container,Row} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import {getAssessments,getAssessment,deleteAssessment,createAssessment,updateAssessment} from "../../../service"
import AssessmentDetails from "../assessment-details/AssessmentDetails";
import styled, {ThemeProvider} from "styled-components";
import EditAssessment from "../../ui/EditAssessment/EditAssessment";

const PageContainer = styled.div`
  display: flex;
  margin:auto;
  max-width:1160px;
  flex-direction: column;
`;

export default class Assessments extends React.Component<any, any>  {


  constructor(props:any) {
    super(props);
    this.state={
      assessments:[],
      modalAssessment:null,
      editAssessment:false,
      newAssessment:false
    }
  }
  async componentDidMount() {
    await this.refreshAssessments();
  }
  async refreshAssessments() {
    const data=await getAssessments();
    this.setState({assessments:data});
  }

  editAssessment=async(assessmentId) => {
    let data=await getAssessment(assessmentId);
    this.setState({modalAssessment:data});
    this.setState({editAssessment:true});
  }
  deleteAssessment=async(assessmentId)=>{
    await deleteAssessment(assessmentId);
    await this.refreshAssessments();
  }
  closeEditAssessment=async()=> {
    this.setState({newAssessment:false});
    this.setState({editAssessment:false});
  }
  openNewAssessment=async() =>{
    let modalAssessment={
      description:"",
      title:""
    }
    this.setState({modalAssessment:modalAssessment});
    this.setState({editAssessment:true});
    this.setState({newAssessment:true});

  }
  save=async()=> {

    if(this.state.newAssessment) {
      await createAssessment(this.state.modalAssessment);
    } else {
      await updateAssessment(this.state.modalAssessment);
    }
    this.setState({newAssessment:false});
    this.setState({editAssessment:false});
    this.refreshAssessments();
  }
  handleTitleChange=(e)=> {
    let modalAssessment=this.state.modalAssessment;
    modalAssessment.title=e.target.value;
    this.setState({modalAssessment:modalAssessment});
  }
  handleDescriptionChange=(e)=> {
    let modalAssessment=this.state.modalAssessment;
    modalAssessment.description=e.target.value;
    this.setState({modalAssessment:modalAssessment});
  }
  render(){

  return (
    <>
    <PageContainer>
      <h2>Assessments</h2>
      <Button style={{display:'flex',width:'fit-content',marginBottom:'20px'}} color="primary" variant="contained" onClick={async ()=>{await this.openNewAssessment()}}>
        New Assessment
      </Button>
      <ListGroup>

              {this.state.assessments && this.state.assessments.map((item, index) => (
                <ListGroup.Item key={index}>
                <Container>
                <Row>
                    <Col xs={12} md={10} style={{display:'flex',alignItems:'center'}}>
                    <Link to={`/assessments/${item.id}`}>{item.title}</Link>
                    </Col>
                    <Col style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <Button variant="contained" color="primary" onClick={async ()=>{await this.editAssessment(item.id)}}>
                              Edit
                      </Button>

                      <Button variant="contained" color="secondary" onClick={async()=>{await this.deleteAssessment(item.id)}}>
                              Delete
                      </Button>
                      </Col>
                </Row>
                </Container>
                </ListGroup.Item>

              ))}
              </ListGroup>
              <EditAssessment
                save={this.save}
                close={this.closeEditAssessment}
                handleTitleChange={this.handleTitleChange}
                handleDescriptionChange={this.handleDescriptionChange}
                {...this.state}
              />
              </PageContainer>

      </>
  );}
}
