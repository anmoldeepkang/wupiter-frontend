import React from "react";
import {FC} from "react";
import {Table,ListGroup,Col,Container,Row,Card} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import {getAssessments,getAssessment,deleteAssessment,createAssessment,updateAssessment} from "../../../service"
import AssessmentDetails from "../assessment-details/AssessmentDetails";
import styled, {ThemeProvider} from "styled-components";
import EditAssessment from "../../ui/EditAssessment/EditAssessment";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
    <Card>
      <Card.Body>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>

        <Card.Title>Assessments</Card.Title>
        <Button style={{display:'flex',width:'fit-content'}} color="primary" variant="contained" onClick={async ()=>{await this.openNewAssessment()}}>
          New Assessment
        </Button>
      </div>
      <ListGroup>

              {this.state.assessments && this.state.assessments.map((item, index) => (
                <ListGroup.Item key={index}>
                <Container>
                <Row>
                    <Col xs={11} md={10} style={{display:'flex',alignItems:'center'}}>
                    <Link to={`/assessments/${item.id}`}>{item.title}</Link>
                    </Col>
                    <Col style={{display:'flex',justifyContent:'flex-end'}}>
                    <IconButton aria-label="delete" onClick={async ()=>{await this.editAssessment(item.id)}}>
                             <EditIcon />
                           </IconButton>

                           <IconButton aria-label="delete" onClick={async()=>{await this.deleteAssessment(item.id)}}>
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
