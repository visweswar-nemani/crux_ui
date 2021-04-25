import axios from 'axios'
import { Formik } from 'formik'
import { React, useState, useEffect } from 'react'
import * as yup from 'yup';
import { Modal, Form, FormCheck, FormControl, Row, Col, Button } from 'react-bootstrap'

const schema = yup.object().shape({
    email:yup.string().required(),
    currentPassword: yup.string().required('Current Password is required'),
    newPassword: yup.string().required(),
    confirmPassword: yup.string().required(),
})


// const CHANGE_PASSWORD_API = 'http://localhost:8080/changePassword'
const CHANGE_PASSWORD_API = 'http://ec2-18-223-1-4.us-east-2.compute.amazonaws.com:8080/changePassword'

function ChangePassword(props) {

    const [changePasswordFailure, setChangePasswordFailure] = useState(false)
    const [apiResponse, setApiResponse] = useState('')


    useEffect(() => {
        return ()=> {
            setChangePasswordFailure(false);
        }
    }, [changePasswordFailure])

    useEffect(() => {
        return () => {
            setApiResponse(null)
        }
    }, [apiResponse])


    function check(values) {
        console.log(' updating user password ',values)
        if (values.newPassword !== values.confirmPassword) {
            setChangePasswordFailure(true)
        } else {
            
            axios.post(CHANGE_PASSWORD_API, values).then(response => {
                console.log("password changed successfully")
                if (response.data.status === 'SUCCESS') {
                    props.onHide();
                } else {
                    setApiResponse(response.data.errorDescription)
                }
            }).catch(error => {
                console.log("error in changing password ", error)
            })
        }

    }

    return (
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
                <div className='bckg'>
                    {props.isforcechangepassword==='true' ?
                        <>
                            <Modal.Header >
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Change Password
                                </Modal.Title>
                            </Modal.Header>
                        </> :
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Change Password
                                </Modal.Title>
                            </Modal.Header>
                        </>
                    }

                    <Modal.Body>
                        <Formik
                            validationSchema={schema}
                            onSubmit={values => check(values)}
                            initialValues={
                                {   
                                    email:props.email,
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                }
                            }
                        >
                            {({ handleBlur, handleChange, handleSubmit, values, touched, isValid, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="validationFormikUsername">
                                            <Form.Control
                                                type="text"
                                                placeholder="Email Id"
                                                aria-describedby="inputGroupPrepend"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.email && errors.email}
                                                disabled
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>

                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="validationFormik01">
                                            <FormControl
                                                type='password'
                                                name='currentPassword'
                                                placeholder='Current Password'
                                                value={values.currentPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.currentPassword && errors.currentPassword}
                                            />
                                            <FormControl.Feedback type='invalid'>{errors.currentPassword}</FormControl.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="validationFormik012">
                                            <FormControl
                                                type='password'
                                                name='newPassword'
                                                placeholder='New Password'
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.newPassword && errors.newPassword}
                                            />
                                            <FormControl.Feedback type='invalid'>{errors.newPassword}</FormControl.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="validationFormik013">
                                            <FormControl
                                                type='password'
                                                name='confirmPassword'
                                                placeholder='Confirm New Password'
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.confirmPassword && errors.confirmPassword}
                                            />
                                            <FormControl.Feedback type='invalid'>{errors.confirmPassword}</FormControl.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    {changePasswordFailure &&
                                        <>
                                            <Form.Row>passwords not matching</Form.Row>
                                            <Form.Row>{apiResponse}</Form.Row>
                                        </>
                                    }
                                    <Form.Row>
                                        <Button variant='warning' type="submit">Update</Button>
                                    </Form.Row>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </div>

            </Modal>
        </div>
    )
}

export default ChangePassword
