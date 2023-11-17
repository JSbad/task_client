import React from 'react';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';

const Task = ({task, onEdit}) => {

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this tile?');
    
        if (confirmDelete) {
            axios
                .delete(`http://127.0.0.1:8000/tasks/${task.id}`)
                .then(() => {
                    console.log('Task deleted successfully');
                    // Perform any other actions after successful deletion
                })
                .catch((error) => {
                    console.error('Error deleting task:', error);
                });
        }
    };
    return (
        <Card>
            <Card.Body>
                <Card.Header>Order: {task.order}</Card.Header>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button variant="primary" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Task;