import React from 'react'
import { Modal } from 'react-bootstrap'

function TransactionHistory(props) {
    return (
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered backdrop='static' keyboard='false'>
            <div className='reg'>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Signup
                </Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
            </div>
        </Modal>
    )
}

export default TransactionHistory
