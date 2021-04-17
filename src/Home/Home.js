import axios from 'axios';
import {React,useState,useEffect,useRef} from 'react'
import { Accordion, Card, Col, Container, Dropdown, DropdownButton,  Navbar, Row } from 'react-bootstrap';
import  Button  from 'react-bootstrap/Button';
import { Redirect } from 'react-router';
import  '../Home/Home.css';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import TransactionHistory from './TransactionHistory';
import TransferAmount from './TransferAmount';
import _isEqual from 'lodash';




const GET_ACCOUNT_DATA_API='http://localhost:8080/getAccountData'
//const GET_ACCOUNT_DATA_API = 'http://ec2-18-223-1-4.us-east-2.compute.amazonaws.com:8080/getAccountData'
const GET_FORCE_CHANGE_PASSWORD_API='http://localhost:8080/forceChangePassword'

function Home(props) {

    const[loginStatus,setLoginStatus]=useState(props.location.state);

    const[isLoggedout,setIsLoggedout]=useState(false)

    const [accountData,setAccountData] =useState([])

    const[showProfileData,setShowProfileData]=useState(false)

    const[showChangePassword,setShowChangePassword]=useState(false)

    const[forceChangePassword,setForceChangePassword]=useState(false)

    const[showAmountTransferModal,setShowAmountTransferModal]=useState(false)

    const[showTransactionHistory,setShowTransactionHistory]=useState(false)

    const[senderAccountId,SetsenderAccountId]=useState({})

    const[isFetchAccountDataRequired,setIsFetchAccountDataRequired]=useState(true)
    

    //console.log("the props passed are :",loginStatus)

    useEffect(() =>{
        //console.log('in home effect', loginStatus)
        if(loginStatus && loginStatus.status==='allowed' ){
            setIsFetchAccountDataRequired(true)
        }       
        return ()=>{
            setLoginStatus({...loginStatus,status:'notallowed'});
            //loginStatus.status='notallowed'
            console.log("in return of home",loginStatus)
        }
    },[loginStatus])

    useEffect(()=>{
        if(isFetchAccountDataRequired)
        fetchAccountData(loginStatus.username);
    },[isFetchAccountDataRequired])


    useEffect(() =>{
        isforceChangePasswordNeeded(loginStatus.username)
        return(()=>{
            setForceChangePassword(false)   
        })        
    },[])

    function isforceChangePasswordNeeded(email){
        axios.get(GET_FORCE_CHANGE_PASSWORD_API,{params:{email}}).then((response)=>{
            console.log(" response from force change password ",response)
            if(response.data){
                setShowChangePassword(true)
                setForceChangePassword(true)
            }
        } ).catch( (error)=>{
                console.log('Error in fetching force change password')
        })
    }


    function logout(){
        setIsLoggedout(true);
       <Redirect  to='/' /> 
    }

    function fetchAccountData( email){        
        axios.get(GET_ACCOUNT_DATA_API,{params:{email}}).then(response =>{
            console.log('fetching account data: ', response)
            setAccountData(response.data);
            setIsFetchAccountDataRequired(false);
        }).catch(error => {
            console.log("error while feteching account data")
        })
    }

  
    function handleChangePasswordModal(){
        setShowChangePassword(true)
        setForceChangePassword(false)
    }

    function openAccountTransferModal(data){
        setShowAmountTransferModal(true)
        SetsenderAccountId(data)
    }
    

    if(loginStatus && loginStatus.status==='allowed' && !isLoggedout){
        let accordion_accountData='No data found'
        if(accountData!= null && accountData.length>0){    
            //console.log("THE ACCOUNT DATA IS ", accountData)    
             accordion_accountData = accountData.map(acc_data =>
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
                                            <Button variant='warning' onClick={()=>openAccountTransferModal(acc_data.account_id)} >Transfer Amount</Button>
                                        </Col>
                                        <Col>
                                        <Button variant='warning' onClick={()=> setShowTransactionHistory(true)}>Transaction History</Button>
                                        </Col>
                                    </Row>                  
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                </>
            );
        }
        
        return (
            <div className='home_bckg'>
                <Navbar expand='lg'>
                    <Navbar.Brand >Welcome {loginStatus.username} !!</Navbar.Brand>
                    {/* <Navbar.Toggle /> */}
                    <Navbar.Collapse className="justify-content-end">
                        <DropdownButton id="dropdown-basic-button" variant='warning' size='sm' title={loginStatus.username}>
                            <Dropdown.Item onClick={() => setShowProfileData(true)}>My Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() =>handleChangePasswordModal() }  >Change Password</Dropdown.Item>
                            <Dropdown.Item onClick={() =>logout()} >Logout</Dropdown.Item>                            
                        </DropdownButton>
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                        Your Accounts:
                        {accountData!==null && accordion_accountData}
                </Container>
                <ChangePassword show={showChangePassword} onHide={() =>setShowChangePassword(false)} email={loginStatus.username} isforcechangepassword={forceChangePassword.toString()}></ChangePassword>
                <Profile show={showProfileData} onHide={() =>setShowProfileData(false)} email={loginStatus.username}></Profile>
                <TransferAmount  show={showAmountTransferModal} onHide={() =>setShowAmountTransferModal(false)} sender_accountid={senderAccountId} updateBalance={() =>setIsFetchAccountDataRequired(true)}></TransferAmount>
                <TransactionHistory  show={showTransactionHistory} onHide={() =>setShowTransactionHistory(false)}  ></TransactionHistory>
            </div>
        )
    } else{
        return(
            <Redirect to ='/'/>
        )
    }

}

export default Home
