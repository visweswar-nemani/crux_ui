import React from 'react'
import {useFormik} from 'formik';
import  Button  from 'react-bootstrap/Button';

 
function RegisterTest() {
    const formik = useFormik({
        initialValues:{
            firstName:'',
            lastName:'',
            email:'',
            country:''
        },
        onSubmit: values => {
            console.log('the resultant values',values);
        }
    })

    console.log( ' the values are ', formik.values);
    return (
        
        <div>
            <form onSubmit={formik.handleSubmit}> 
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id='firstName' name='firstName'  onChange={formik.handleChange} value={formik.values.firstName}></input>

                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id='lastName' name='lastName'  onChange={formik.handleChange} value={formik.values.lastName}></input>

                <label htmlFor='email'>Email Id</label>
                <input type='email' id='emailemail' name='email'  onChange={formik.handleChange} value={formik.values.email}></input>

                <label htmlFor='country'>Country</label>
                <input type='text' id='country' name='country'  onChange={formik.handleChange} value={formik.values.country}></input>
                <Button type='submit'>Submit</Button>
                
            </form>
            
        </div>
    )
}

export default RegisterTest
