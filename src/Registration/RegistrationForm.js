import { React } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal';
import './Form.css';
import { render } from '@testing-library/react';
import axios from 'axios';

// const { Formik } = Formik;

const REGISTER_API = 'http://ec2-3-21-128-229.us-east-2.compute.amazonaws.com:8080/register';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  mobileNumber: yup.number('should be a number').required(),
  address_1: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});



function RegistrationForm(props) {

  function check(values) {
    console.log('submit clicked')
    if (values.terms === true) {

      props.onHide();
      //alert('hello')
      console.log('on submit', values, props);

      axios.post(REGISTER_API, values).then(response => {
        console.log("result is ", response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return (

    <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
      <div className='reg'>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Signup
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={values => check(values)}  /*   handle submit here ........*/
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              mobileNumber: '',
              address_1: '',
              address_2:'',
              city: '',
              state: '',
              zip: '',
              terms: false,
            }}
          >

            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.firstName && errors.firstName}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    {/* <Form.Label>Last name</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.lastName && errors.lastName}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.lastName}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Email Id"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik06">
                    {/* <Form.Label>First name</Form.Label> */}
                    <Form.Control
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={values.mobileNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.mobileNumber && errors.mobileNumber}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.mobileNumber}</Form.Control.Feedback>
                  </Form.Group>

                  {/* <Form.Group as={Col} md="4" controlId="validationFormik08">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      isInvalid={touched.dob && errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                  </Form.Group> */}

                  <Form.Group as={Col} md="4" controlId="validationFormik07">
                    {/* <Form.Label>Address</Form.Label> */}
                    <Form.Control
                      type="text"
                      name="address_1"
                      placeholder="Address"
                      value={values.address_1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.address_1 && errors.address_1}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.address_1}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationFormik07">
                    <Form.Control
                      type="text"
                      name="address_2"
                      placeholder="Address"
                      value={values.address_2}
                      onChange={handleChange}
                    />             
                  </Form.Group>

                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationFormik03">
                    {/* <Form.Label>City</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      isInvalid={touched.city && errors.city}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationFormik04">
                    {/* <Form.Label>State</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      isInvalid={touched.state && errors.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik05">
                    {/* <Form.Label>Zip</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="Zip"
                      name="zip"
                      value={values.zip}
                      onChange={handleChange}
                      isInvalid={touched.zip && errors.zip}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.zip}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Check
                    required
                    name="terms"
                    label="Agree to terms and conditions"
                    onChange={handleChange}
                    isInvalid={touched.terms && errors.terms}
                    feedback={errors.terms}
                    id="validationFormik0"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.terms}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </div>
    </Modal>
  );
}

render(<RegistrationForm />);
export default RegistrationForm;