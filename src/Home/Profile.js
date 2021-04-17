import axios from 'axios';
import { Formik } from 'formik';
import {React,useState,useEffect} from 'react'
import { Modal,Form,Button, FormControl ,Col, InputGroup } from 'react-bootstrap'
import * as yup from 'yup';


const schema = yup.object().shape({

    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    mobileNumber: yup.number('should be a number').required(),
    address_1: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
})

const GET_PROFILE_DATA_API='http://localhost:8080/getProfileData'  

const POST_PROFILE_DATA_API ='http://localhost:8080/setProfileData'


function Profile(props) {


    const [isProfileDataFetched,setisProfileDataFetched] =useState(false)
    const[ profileData,setProfileData]=useState({})

    //console.log('in profile page ',props)


    function fetchProfileData(email){
        axios.get(GET_PROFILE_DATA_API,{params:{email}}).then( response =>{
            console.log('fetching profile data ',response.data)
            setProfileData(response.data)
            setisProfileDataFetched(true)
        }).catch(error =>{
            console.log('error in fetching profile')
        })
    }

    useEffect(() => {
        if(props.show){
            fetchProfileData(props.email)
        }
        return () => {
            //console.log('closing profile data page')
            setProfileData({})
            setisProfileDataFetched(false)
        }
    }, [props.show,props.email])


    function check(values){
        console.log('updating profile data ', values)
        axios.post(POST_PROFILE_DATA_API,values).then( response =>{
            console.log( response)
            if(response.data.status==='SUCCESS'){
                window.alert("Profile updated successfully")
            } else{
                window.alert("profile update unsuccessful")
            }
            props.onHide()
        }).catch(error =>{
            console.log("  error while updating user profile")
        })

    }

    

        //console.log("the profile data is ",profileData)
    
    return (        
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
            <div className='reg'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Profile Data
            </Modal.Title>
            </Modal.Header>
            {
            (isProfileDataFetched && profileData!==null ) &&
            <Modal.Body>
                
                <Formik
                validationSchema={schema}
                onSubmit={values => check(values)}  /*   handle submit here ........*/
                initialValues={{
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    email:  profileData.email,
                    mobileNumber: profileData.mobileNumber,
                    address_1:  profileData.address_1,
                    address_2: profileData.address_2,
                    city:  profileData.city,
                    state:  profileData.state,
                    zip:  profileData.zip,
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
                            disabled
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
                            disabled

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
                            disabled
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
                            disabled
                        />
                        <Form.Control.Feedback type='invalid'>{errors.mobileNumber}</Form.Control.Feedback>
                        </Form.Group>

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
                        <Button variant='warning' type="submit">Update</Button>
                    </Form>
                )}
                </Formik>
            </Modal.Body>
            }
            </div>
        </Modal>
    );
    
}

export default Profile





