import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik';
import { FormControl } from 'react-bootstrap';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    
})

function ForgotPassword(props) {

    function sendEmail(values){
        console.log("send Email")
        props.onHide();
        console.log(values);
    }

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
                    onSubmit={values => sendEmail(values)}
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
                                        <FormControl.Feedback type='invalid'>{errors.email}</FormControl.Feedback>
                                    </Form.Group>                                    
                                </Form.Row>
                                <Form.Row><Button type='submit'>Send Email</Button></Form.Row>
                        </Form>
                    )}

                </Formik>
            </Modal.Body>
            </div>
        </Modal>
            
        
    )
}

export default ForgotPassword
