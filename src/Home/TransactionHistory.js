import React from 'react'
import { Modal,Form , Row,Col ,Button} from 'react-bootstrap'
import * as yup from 'yup'
import axios from 'axios'
import { Formik } from 'formik'


const schema = yup.object().shape({
    userAccountId: yup.string().required(),
    startDate: yup.date(),
    endDate:yup.date().max(new Date().toLocaleDateString(),'end date cannot be greater than today')
})


// const DO_TRANSFER_API='http://localhost:8080/getTransactionHistory'

const DO_TRANSFER_API='http://ec2-18-223-1-4.us-east-2.compute.amazonaws.com:8080/getTransactionHistory'

function TransactionHistory(props) {


    function submitData(values){
        console.log('on submit data TransactionHistory' ,values)
        if((values.startDate)>(values.endDate)){
            console.log("start date greater than end Date")

        }
        axios.post(DO_TRANSFER_API,values).then(response =>{
            console.log('on submit data TransactionHistory' ,response)
            if(response.data.status==='SUCCESS'){
                console.log("response on txnHistory",response.data)
                window.alert("An email with account statement has been sent to your mail")
                props.onHide();
            }
        }).catch(error =>{
            console.log('error while fetching getTransactionHistory')
        })
    }


    return (
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
            <div className='reg'>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Transaction History
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Formik
                        validationSchema={schema}
                        onSubmit={values => submitData(values)}
                        initialValues={
                            {
                                userAccountId: props.sender_accountid,
                                startDate:'',
                                endDate:'',
                                
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
                                            <Form.Label> Start Date </Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="select Date"
                                                aria-describedby="inputGroupPrepend"
                                                name="startDate"
                                                value={values.startDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.startDate && errors.startDate}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.startDate}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="validationFormikUsername">
                                            <Form.Label> End Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="select Date"
                                                aria-describedby="inputGroupPrepend"
                                                name="endDate"
                                                value={values.endDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.endDate && errors.endDate}

                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.endDate}
                                            </Form.Control.Feedback>
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

export default TransactionHistory
