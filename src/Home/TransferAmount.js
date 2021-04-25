
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { Modal, Form, Row, Col, InputGroup,Button } from 'react-bootstrap'
import * as yup from 'yup'


// const DO_TRANSFER_API='http://localhost:8080/doTransfer'

const DO_TRANSFER_API='http://ec2-18-223-1-4.us-east-2.compute.amazonaws.com:8080/doTransfer'


const schema = yup.object().shape({
    userAccountId: yup.string().required(),
    beneficiaryAccountId: yup.number('value shoud be number').required('Beneficiary Account Number is required'),
    routingNumber: yup.number('value shoud be number').required('Please enter your beneficiary bank routing number'),
    amount: yup.number('value shoud be number').required(),
})

function TransferAmount(props) {

    function submitData(values) {
        console.log('clicked function',values)
        axios.post(DO_TRANSFER_API,values).then(  response=>{
            //console.log('response of do transfer ',response)
            if(response.data.status==='SUCCESS'){
                props.onHide();
                props.updateBalance();
            }
        }).catch(error =>{
            console.log('error while transferring amounrt',error)
        })
    }
    
    return (
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
            <div className='reg'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Transfer Amount
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={values => submitData(values)}
                        initialValues={
                            {
                                userAccountId: props.sender_accountid,
                                beneficiaryAccountId: '',
                                routingNumber: '123456',
                                amount: ''
                            }
                        }
                    >
                        {({ handleBlur, handleChange, handleSubmit, values, touched, isValid, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="validationFormikUsername">
                                            <Form.Label>User Account Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="User AccountId"
                                                aria-describedby="inputGroupPrepend"
                                                name="userAccountId"
                                                value={values.userAccountId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.userAccountId && errors.userAccountId}
                                                disabled
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.userAccountId}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="validationFormikUsername">
                                            <Form.Label> Beneficairy Account Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Beneficairy Account Number"
                                                aria-describedby="inputGroupPrepend"
                                                name="beneficiaryAccountId"
                                                value={values.beneficiaryAccountId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.beneficiaryAccountId && errors.beneficiaryAccountId}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.beneficiaryAccountId}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="validationFormikUsername">
                                            <Form.Label>Routing number</Form.Label>

                                            <Form.Control
                                                type="text"
                                                placeholder="Routing Number"
                                                aria-describedby="inputGroupPrepend"
                                                name="routingNumber"
                                                value={values.routingNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.routingNumber && errors.routingNumber}
                                                disabled
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.routingNumber}
                                            </Form.Control.Feedback>

                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="validationFormikUsername">
                                        <Form.Label>Amount</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="basic-addon2">$</InputGroup.Text>
                                                </InputGroup.Prepend>

                                                <Form.Control
                                                    type="text"
                                                    placeholder="Amount to be transferred"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="amount"
                                                    value={values.amount}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.amount && errors.amount}                                                    
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.amount}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="validationFormikUsername">
                                            <Button variant='warning' type='submit' >Submit</Button>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default TransferAmount
