import React from "react";
import {FC} from "react";
import {Button} from 'react-bootstrap';
import {
  getSubmission,getAttempt
} from "../../../service";
import styled, {ThemeProvider} from "styled-components";
import {ListGroup,Form,Card} from 'react-bootstrap';

import { Link } from "react-router-dom";
import greenTick from "../../../assets/greenTick.png";
import wrongCross from "../../../assets/wrongCross.png";

const PageContainer = styled.div`
  display: flex;
  margin:auto;
  max-width:1160px;
  flex-direction: column;
`;
export default class SubmissionDetails extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state={
      answers:null,
      submission:null
    }
  }
  async componentDidMount() {
    let assessmentId=window.location.pathname.split("/")[2];
    let attemptId=window.location.pathname.split("/")[4];
    const answers=await getSubmission(assessmentId,attemptId);
    const submission=await getAttempt(attemptId);
    this.setState({answers:answers,submission:submission});
  }
  render(){
      return (
      <>
      <PageContainer>
      <Card>
        <Card.Body>
          <Card.Title>Responses: {this.state.submission && (<span>{this.state.submission.firstName} ({this.state.submission.score}%)</span>)}</Card.Title>
          <ListGroup>

            {this.state.answers && this.state.answers.map((item, index) => (
              <ListGroup.Item key={item.id}>
                <Card.Text>Q.{index+1} {item.title}</Card.Text>
                <div>
                {item.questionType=='MCQ' &&
                  item.choices.map((choice,ind)=>(
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <Form.Check type="checkbox" label={choice.description} disabled checked={choice.marked} />

                      {choice.correct && choice.marked && <img  src={greenTick} style={{marginLeft:'10px',width:'20px',height: '20px'}}/>}
                      {((!choice.correct && choice.marked) || (choice.correct && !choice.marked)) && <img  src={wrongCross} style={{marginLeft:'10px',width:'20px',height: '20px'}}/>}
                    </div>
                  ))
                }
                </div>
                <div>
                {item.questionType=='Video' &&
                  <video src={item.videoUrl} controls/>
                }
                </div>
                <div>
                {item.answerType=='Video' &&
                  <video src={item.answerVideoUrl} controls/>
                }
                </div>
              </ListGroup.Item>
            ))}

            </ListGroup>
        </Card.Body>
      </Card>

      </PageContainer>
      </>
    );
  }
}
