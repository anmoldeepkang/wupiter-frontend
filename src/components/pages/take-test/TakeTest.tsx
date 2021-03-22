import React from "react";
import {FC} from "react";
import {
  getQuestions,completeTest
} from "../../../service";
import styled, {ThemeProvider} from "styled-components";
import TestQuestion from '../../ui/TestQuestion/TestQuestion';
const PageContainer = styled.div`
  display: flex;
  margin:auto;
  max-width:1160px;
  flex-direction: column;
`;
export default class TakeTest extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state={
      assessmentId:this.props.match.params.assessmentId,
      attemptId:this.props.match.params.attemptId,
      questions:[],
      questionIndex:0,
      currentQuestion:{}
    }
  }

  async componentDidMount() {
    const data=await getQuestions(this.state.assessmentId);
    this.setState({questions:data});
    this.setState({currentQuestion:this.state.questions[this.state.questionIndex]});
  }
   goToNextQuestion=async() => {
    let questionIndex=this.state.questionIndex+1;

    if(questionIndex==this.state.questions.length) {
      await completeTest(this.state.attemptId);
      this.props.history.push("/thank-you");
    } else {
      this.setState({questionIndex:questionIndex});
      let currentQuestion=this.state.questions[questionIndex];
      this.setState({currentQuestion:currentQuestion});
    }
  }
  render(){
      return (
      <>
        <PageContainer>
        <TestQuestion question={this.state.currentQuestion}
        assessmentId={this.state.assessmentId}
        attemptId={this.state.attemptId}
        goToNextQuestion={async ()=> {await this.goToNextQuestion()}}/>
        </PageContainer>
      </>
    );
  }
}
