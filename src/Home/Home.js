import {React,useState,useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import  Button  from 'react-bootstrap/Button';
import { Redirect } from 'react-router';
import  '../Home/Home.css';




function Home(props) {

    const[loginStatus,setLoginStatus]=useState(props.location.state);

    const[isLoggedout,setIsLoggedout]=useState(false)

    console.log("the props passed are :",props,loginStatus)

    useEffect(() =>{
        console.log('in home effect', loginStatus)
        //setLoginStatus(props.location.state);
        return ()=>{
            setLoginStatus({...loginStatus,status:'notallowed'});
            //loginStatus.status='notallowed'
            console.log("in return of home",loginStatus)
        }
    },[loginStatus])


    function test(){
        setIsLoggedout(true);
       <Redirect  to='/' /> 
    }

    // useEffect(()=>{
    //     console.log("the test data",testData)
    // },[testData])

    

    if(loginStatus && loginStatus.status==='allowed' && !isLoggedout){
        return (
            <div className='home_bckg'>
                <Container>
                    <Row>
                        <Col> Home page</Col>
                        <Col> <Button  onClick={() =>test()}>Logout</Button></Col>
                   
                    </Row>
                   
                   

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
