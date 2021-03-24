
import '../App.css';
import '../Login/Login.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import RegistrationForm from '../Registration/RegistrationForm';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import {useState} from 'react';
import Login from '../Login/Login';
import ForgotPassword from '../Login/ForgotPassword';

 

function Welcome() {

  const [signupModalShow,setSignupModalShow] = useState(false)
  const [loginModalShow,setLoginpModalShow] = useState(false)
  const [forgotPasswordModalShow,setForgotPasswordModalShow] = useState(false)



  return (
    <div className='App-header'>
           
      <Navbar fixed="top">
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Container>
              <Row>
                <Col><Button variant="dark" size='lg' onClick = {() => setSignupModalShow(true)}>Signup</Button> </Col>
                <Col><Button variant="dark" size='lg ' onClick= {() => setLoginpModalShow(true)}>Login</Button></Col>
                <Col><Button size='sm' className='forgot_password' variant='link' onClick= {() => setForgotPasswordModalShow(true)}>Forgot Password?</Button></Col>
              </Row>
            </Container>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <RegistrationForm show={signupModalShow}  onHide={() => setSignupModalShow(false)}></RegistrationForm>
      <Login show={loginModalShow}  onHide={() => setLoginpModalShow(false)}></Login>
      <ForgotPassword show={forgotPasswordModalShow} onHide={() =>setForgotPasswordModalShow(false)}></ForgotPassword>
          
    </div>
  );
}

export default Welcome;
