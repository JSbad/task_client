import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditTaskForm = ({ show, onHide, id }) => {
    const [taskData, setTaskData] = useState({});

    useEffect(() => {
        if (show && id) {
            axios
                .get(`http://127.0.0.1:8000/tasks/${id}/`)
                .then((response) => {
                    setTaskData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching task data:', error);
                });
        }
    }, [id, show]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://127.0.0.1:8000/tasks/${id}/`, taskData)
            .then(() => {
                console.log(`Task updated successfully`);
                onHide();
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEditSubmit}>
                    <Form.Group controlId="order">
                        <Form.Label>Order</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Order"
                            name="order"
                            value={taskData.order || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={taskData.type || ''}
                            onChange={handleInputChange}
                            name="type"
                        >
                            <option value="survey">Survey</option>
                            <option value="discussion">Discussion</option>
                            <option value="diary">Diary</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                            value={taskData.title || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Description"
                            name="description"
                            value={taskData.description || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Update Task
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditTaskForm;
