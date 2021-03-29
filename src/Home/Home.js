import axios from 'axios';
import {React,useState,useEffect} from 'react'
import { Accordion, Card, Col, Container, Dropdown, DropdownButton,  Navbar, Row } from 'react-bootstrap';
import  Button  from 'react-bootstrap/Button';
import { Redirect } from 'react-router';
import  '../Home/Home.css';



const GET_ACCOUNT_DATA_API='http://localhost:8080/getAccountData'
//const GET_ACCOUNT_DATA_API = 'http://ec2-18-223-1-4.us-east-2.compute.amazonaws.com:8080/getAccountData'


function Home(props) {

    const[loginStatus,setLoginStatus]=useState(props.location.state);

    const[isLoggedout,setIsLoggedout]=useState(false)

    const [accountData,setAccountData] =useState([])

    console.log("the props passed are :",loginStatus)

    useEffect(() =>{
        //console.log('in home effect', loginStatus)
        if(loginStatus && loginStatus.status==='allowed'){
            fetchAccountData(loginStatus.username);
        }
        return ()=>{
            setLoginStatus({...loginStatus,status:'notallowed'});
            //loginStatus.status='notallowed'
            console.log("in return of home",loginStatus)
        }
    },[loginStatus])


    function logout(){
        setIsLoggedout(true);
       <Redirect  to='/' /> 
    }

    function fetchAccountData( email){
        
        axios.get(GET_ACCOUNT_DATA_API,{params:{email}}).then(response =>{
            console.log('account data: ', response)
            setAccountData(response.data);
        }).catch(error => {
            console.log("error while feteching account data")
        })
    }

    
    

    if(loginStatus && loginStatus.status==='allowed' && !isLoggedout){

        const accordion_accountData = accountData.map(acc_data =>
            <>
                    <Accordion defaultActiveKey="1">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                {acc_data.accountType}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>  
                                <Row>
                                    <Col>
                                        Account Id:  {acc_data.account_id}  
                                    </Col>
                                    <Col>
                                        Balance :{acc_data.balance} USD
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant='warning'>Transfer</Button>
                                    </Col>
                                    <Col>
                                    <Button variant='warning'>Transaction History</Button>
                                    </Col>
                                </Row>                        
                                                         
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
            </>
        );
        
        return (
            <div className='home_bckg'>
                <Navbar expand='lg'>
                    <Navbar.Brand href="#home">Welcome {loginStatus.username} !!</Navbar.Brand>
                    {/* <Navbar.Toggle /> */}
                    <Navbar.Collapse className="justify-content-end">
                        <DropdownButton id="dropdown-basic-button" variant='warning' size='sm' title={loginStatus.username}>
                            <Dropdown.Item onClick={() => console.log('edit profile')}>My Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() =>logout()} >Logout</Dropdown.Item>                            
                        </DropdownButton>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                        Your Accounts:
                        {accordion_accountData}
                        

                  
                </Container>
                
            </div>
        )
    } else{
        return(
            <Redirect to ='/'/>
        )
    }

}

export default Home
