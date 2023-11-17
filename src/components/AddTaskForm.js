import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

const AddTaskForm = ({show, onHide, onSuccess, tileId}) => {
    const [taskData,
        setTaskData] = useState({tile: tileId, order: 1, type: '', description: '', title: ''});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://127.0.0.1:8000/tasks/', taskData)
            .then((response) => {
                onSuccess(response.data);
                onHide();
            })
            .catch((error) => {
                console.error('Error adding task:', error);
            });
    };

    const handleTypeChange = (e) => {
        setTaskData({
            ...taskData,
            type: e.target.value
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            value={taskData.title}
                            onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="order">
                        <Form.Label>Order</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter order"
                            name="order"
                            value={taskData.order}
                            onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" value={taskData.type} onChange={handleTypeChange}>
                            <option value="">Select Type</option>
                            <option value="survey">Survey</option>
                            <option value="discussion">Discussion</option>
                            <option value="diary">Diary</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter description"
                            name="description"
                            value={taskData.description}
                            onChange={handleInputChange}/>
                    </Form.Group>

                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Add Task
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTaskForm;
