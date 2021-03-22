import React from "react";
import {FC} from "react";
import {Button} from 'react-bootstrap';
import {
  getAssessmentForAttempt
} from "../../../service";
import { Link } from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";

const PageContainer = styled.div`
  display: flex;
  margin:auto;
  max-width:1160px;
  flex-direction: column;
`;
export default class TestWelcome extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state={
      assessmentId:this.props.match.params.assessmentId,
      attemptId:this.props.match.params.attemptId,
      welcomeVideo:""
    }
  }
  async componentDidMount() {

    const assessment=await getAssessmentForAttempt(this.state.attemptId);
    this.setState({welcomeVideo:assessment.welcomeVideoUrl});

  }
  render(){
      return (
      <>
        <PageContainer>
        <div style={{textAlign:'center'}}>
        <h2>Welcome to test</h2>
        <video controls src={this.state.welcomeVideo}/>
        <div>
        <Link to={"/assessments/"+this.state.assessmentId+"/attempts/"+this.state.attemptId+"/started"}>
          <Button variant="primary">
            Start Test
          </Button>
        </Link>
        </div>
        </div>
        </PageContainer>
      </>
    );
  }
}
