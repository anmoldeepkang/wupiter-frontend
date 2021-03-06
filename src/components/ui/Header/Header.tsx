import React, {FC} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {UserModel} from "infrastructure/context";
import avantiLogo from "../../../assets/avanti-logo.svg";
export type HeaderProps = {
  user?: UserModel;
  showBreakpoints: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: FC<HeaderProps> = ({user, showBreakpoints, onLogin, onLogout}) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
      <div style={{display:'flex',alignItems:'baseline'}}>
      <img
       src={avantiLogo}
       width="150"
       height="27"
       className="d-inline-block align-top"
       alt="React Bootstrap logo"
     />
      <span>Avanti Candidate Screening</span>
      </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={window.location.pathname}>


        </Nav>
        {showBreakpoints && (
          <>
            <div className="d-block d-sm-none">XS</div>
            <div className="d-none d-sm-block d-md-none">SM</div>
            <div className="d-none d-md-block d-lg-none">MD</div>
            <div className="d-none d-lg-block d-xl-none">LG</div>
            <div className="d-none d-xl-block">XL</div>
          </>)}
        {user ? (
          <>
            <Nav className={"mx-2"}><LinkContainer
              to={`/`}><Nav.Link>{user.name}</Nav.Link></LinkContainer></Nav>
            <Button size="sm" onClick={onLogout}>Log Out</Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={onLogin}>Log In</Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
