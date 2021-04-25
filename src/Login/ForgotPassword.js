import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import {React,useState,useEffect} from 'react'
import * as yup from 'yup'
import { Formik } from 'formik';
import { FormControl,Row } from 'react-bootstrap';
import axios from 'axios';


const FORGOT_PASSWORD_API='http://ec2-18-223-1-4.us-east-2.compute.amazonaws.com:8080/forgotPassword'

//const FORGOT_PASSWORD_API='http://localhost:8080/forgotPassword'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    
})

function ForgotPassword(props) {


    const [errorDescription,setErrorDescription] =useState('')

    function sendEmail(email){
        console.log("send Email" ,email)
        axios.get(FORGOT_PASSWORD_API,{params:{email}}).then( response => {            
            console.log('forgot password :',response)
            setErrorDescription(response.data.errorDescription);
            if(response.data.status!=='FAILURE'){
                props.onHide();
                window.alert(response.data.errorDescription);
            }
        }).catch(error =>{
            console.log('login error occured ',error)            
        });
    }

    

    useEffect(() => {        
        return () => {
            setErrorDescription('');
            console.log("closing forgot password modal",errorDescription)
        }
    },[props.show])

    return (
        <Modal {...props}  aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
        <div className='reg'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Forgot Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    initialValues={
                        {
                            email:'',
                        }
                    }
                    onSubmit={values => sendEmail(values.email)}
                >
                    {({handleSubmit,handleChange,handleBlur,touched,values,isValid,errors}) =>(
                        <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationFormik03">
                                        <FormControl
                                            type='text'
                                            name='email'
                                            placeholder='Enter Email Id to send password to your email'
                                            value={values.email}
                                            onChange={handleChange} 
                                            onBlur={handleBlur}
                                            isInvalid={touched.email && errors.email}
                                        />
                                        <FormControl.Feedback type='invalid'>{errors.email} </FormControl.Feedback>
                                    </Form.Group> 
                                </Form.Row>
                                {errorDescription!==''  && <Form.Row as={Col}> 
                                {errorDescription}</Form.Row>}  
                                <Form.Row as={Col}><Button type='submit'>Send Email</Button></Form.Row>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            </div>
        </Modal>
            
        
    )
}

export default ForgotPassword
