import React, {FC, useContext, useEffect} from 'react';
import {
  Router,
  Switch,
  Route,
} from "react-router";
import {createBrowserHistory} from "history";
import {UserContext, UserContextModel,UserContextProvider} from 'infrastructure/context';
import {Identity} from "./infrastructure/auth/Identity";
import {Redirect} from "react-router-dom";

import {lightTheme} from "./themes";
import styled, {ThemeProvider} from "styled-components";
import {Header} from "./components/ui";
import {Home} from "./components/pages";
import Assessments from "./components/pages/assessments/Assessments";
import AssessmentDetails from "./components/pages/assessment-details/AssessmentDetails";
import TestWelcome from "./components/pages/test-welcome/TestWelcome";
import TakeTest from "./components/pages/take-test/TakeTest";
import Submissions from "./components/pages/submissions/Submissions";
import SubmissionDetails from "./components/pages/submission-details/SubmissionDetails";

import ThankYou from "./components/pages/thank-you/ThankYou";
import {PrivateRoute} from "./infrastructure/auth/PrivateRoute";
import authService from "./infrastructure/auth/AuthService";

const browserHistory = createBrowserHistory();

const App = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  const {setUser, user} = useContext<UserContextModel>(UserContext);

  useEffect(() => setTheme(lightTheme), []);

  // Log in with locally cached token
  useEffect(() => {
    (async function getIdentity() {
      const identity = await authService.getIdentity()

        if (setUser && identity.name) {
          setUser({
            name: identity.name
          });
          let token=identity.accessToken;
          localStorage.setItem('token',`${token}`);
        }



    })();
  }, [setUser]);

  // Log in with new response token
  const handleLogin = async () => {
    const identity =  await authService.signIn();
      if (setUser && identity.name) {
        setUser({
          name: identity.name
        });
        let token=identity.accessToken;
        localStorage.setItem('token',`${token}`);
      }
  }

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await authService.signOut();
  };

  return (
    <ThemeProvider theme={theme}>

        <Router history={browserHistory}>
        <PageContainer>
          <Header user={user} onLogin={handleLogin} onLogout={handleLogout} showBreakpoints={false}/>
          <RouteContainer>

            <Switch>
              <Route exact path="/">
              {user ? <Redirect to="/assessments"/>:<Home/>}
              </Route>
              <Route exact path="/assessments">
              {user ? <Assessments/>:<Redirect to="/"/>}

              </Route>
              <Route exact path="/assessments/:id">
                {user ? <AssessmentDetails/>:<Redirect to="/"/>}
              </Route>
              <Route exact path="/assessments/:id/submissions">
                  {user ? <Submissions/>:<Redirect to="/"/>}
              </Route>
              <Route exact path="/assessments/:id/submissions/:attemptId">
                {user ?<SubmissionDetails/>:<Redirect to="/"/>}
              </Route>
              <Route exact path="/assessments/:assessmentId/attempts/:attemptId/welcome" component={TestWelcome}>
              </Route>
              <Route exact path="/assessments/:assessmentId/attempts/:attemptId/started" component={TakeTest}>
              </Route>
              <Route exact path="/thank-you" component={ThankYou}>
              </Route>
            </Switch>
          </RouteContainer>
          </PageContainer>
        </Router>

    </ThemeProvider>
  );
}
const RouteContainer = styled.div`
  margin: 16px;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export default App;
