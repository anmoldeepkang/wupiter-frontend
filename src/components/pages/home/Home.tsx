import React,{FC} from "react";
import PageContainer from "../../ui/PageContainer/PageContainer";
import {Card,Button} from "react-bootstrap";


export const Home:FC<any> = ({onLogin}) => {



  return (
    <>
      <PageContainer>
      <Card>
        <Card.Header>Avanti Candidate Screening Portal</Card.Header>
        <Card.Body>
          <Card.Title>About this solution !</Card.Title>
          <Card.Text>
            This is a solution which allows you to create assessments, invite candidates to take assessments & review responses. Sign-up/Login to try out !
          </Card.Text>
          <Button variant="primary" onClick={onLogin}>Login</Button>
        </Card.Body>
      </Card>
      </PageContainer>

    </>
  );
}
