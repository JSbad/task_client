import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

const EditTileForm = ({show, onHide, id, initial_launch_date, initial_status}) => {
    const [tileData,
        setTileData] = useState({launch_date: initial_launch_date, status:initial_status});

   
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTileData({
            ...tileData,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://127.0.0.1:8000/tiles/${id}/`, tileData)
            .then((response) => {
                console.log(`Tile updated successfully`);
                console.log(response.data)
                console.log(tileData)
            });

        onHide();
    };


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEditSubmit}>
                    <Form.Group controlId="launch_date">
                        <Form.Label>Launch Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter Launch Date"
                            name="launch_date"
                            value={tileData.launch_date || ''}
                            onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={tileData.status} name="status" onChange={handleInputChange}>
                            <option value="live">Live</option>
                            <option value="pending">Pending</option>
                            <option value="archived">Archived</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Update Tile
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditTileForm;