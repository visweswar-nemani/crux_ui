import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';
import '../Login/Login.css';
import * as yup from 'yup';
import {React,useEffect,useState} from 'react'

import { FormControl } from 'react-bootstrap';
import { render } from '@testing-library/react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';



const schema = yup.object().shape({

    email: yup.string().email().required(),
    password: yup.string().required(),
})

const LOGIN_API='http://localhost:8080/authenticate'

function Login(props) {

    const history = useHistory();

    //const [loginStatus,setloginStatus] = useState({status:'',username:''});

    function check(values){
        
        //setloginStatus( )
        console.log(values)
        axios.post(LOGIN_API,values).then( response => {
            props.onHide();
            console.log('player logged in :',values)
            history.push("/login",{
                status:'allowed',username:'viswa'            
            })
        }).catch(error =>{
            console.log('login error occured ',error)
            
        })

    }


  



    return (
        <Modal {...props}  aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
            <div className='bckg'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={ values => check(values)}
                        initialValues={
                            {
                                email:'',
                                password:'',
                            }
                        }
                    >
                        {({handleBlur,handleChange,handleSubmit,values,touched,isValid,errors}) =>(
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationFormik01">
                                        <FormControl
                                            type='text'
                                            name='email'
                                            placeholder='Email Id'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.email && errors.email}
                                            />
                                        <FormControl.Feedback type='invalid'>{errors.email}</FormControl.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationFormik012">
                                        <FormControl
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.password && errors.password}
                                        />
                                        <FormControl.Feedback type='invalid'>{errors.password}</FormControl.Feedback>
                                    </Form.Group>
                                </Form.Row> 
                                <Form.Row>                               
                                    <Button  type="submit">Submit</Button>
                                </Form.Row>
                            </Form>
                        )}                        
                    </Formik>
                </Modal.Body>
            </div>
            
        </Modal>
    );
}


render(<Login />);
export default Login