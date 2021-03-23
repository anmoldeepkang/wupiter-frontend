import React from "react";
import {FC} from "react";
import {Button} from 'react-bootstrap';
import {
  getSubmissions
} from "../../../service";
import styled, {ThemeProvider} from "styled-components";
import {ListGroup,Card} from 'react-bootstrap';

import { Link } from "react-router-dom";
const PageContainer = styled.div`
  display: flex;
  margin:auto;
  max-width:1160px;
  flex-direction: column;
`;
export default class Submissions extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state={
      submissions:null,
      assessmentId:null
    }
  }
  async componentDidMount() {
    let assessmentId=window.location.pathname.split("/")[2];
    const submissions=await getSubmissions(assessmentId);
    this.setState({submissions:submissions,assessmentId:assessmentId});
  }
  render(){
      return (
      <>
      <PageContainer>
      <Card>
        <Card.Body>
          <Card.Title>Submissions</Card.Title>
          <ListGroup>

            {this.state.submissions && this.state.submissions.map((item, index) => (
              <ListGroup.Item key={item.id}>
              <Link to={`/assessments/${item.assessmentId}/submissions/${item.id}`}>
                  {item.firstName} : {item.score}%
              </Link>
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
