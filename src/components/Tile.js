import React, {useState, useRef} from 'react';
import {Button, Carousel, Card, Row, Col} from 'react-bootstrap';
import Task from './Task';
import EditTaskForm from './EditTaskForm';
import AddTaskForm from './AddTaskForm';
import EditTileForm from './EditTileForm';
import axios from 'axios';

const Tile = ({tile}) => {
    const [showEditTaskForm,
        setShowEditTaskForm] = useState(false);
    const [showEditTileForm, setShowEditTileForm] = useState(false);
    const [showAddForm,
        setShowAddForm] = useState(false);
    const [selectedTaskId,
        setSelectedTaskId] = useState(null);
    const [updatedTile,
        setUpdatedTile] = useState(tile);
    const carouselRef = useRef(null);

    const handleTaskEditClick = (taskId) => {
        setSelectedTaskId(taskId);
        setShowEditTaskForm(true);
    };

    const handleTileEditClick = () => {
        setShowEditTileForm(true)
    }

    const handleAddTaskClick = () => {
        setShowAddForm(true);
    };

    const handleTaskSubmit = (editedTaskData) => {
        const updatedTasks = updatedTile.tasks.map(task =>
            task.id === editedTaskData.id ? editedTaskData : task
        );
    
        setUpdatedTile({
            ...updatedTile,
            tasks: updatedTasks,
        });
    };
    

    const nextCarousel = () => {
        if (carouselRef.current) {
            carouselRef
                .current
                .next();
        }
    };

    const prevCarousel = () => {
        if (carouselRef.current) {
            carouselRef
                .current
                .prev();
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this tile?');
    
        if (confirmDelete) {
            axios
                .delete(`http://127.0.0.1:8000/tiles/${tile.id}`)
                .then(() => {
                    console.log('Tile deleted successfully');
                    // Perform any other actions after successful deletion
                })
                .catch((error) => {
                    console.error('Error deleting tile:', error);
                });
        }
    };

    return (
        <div
            style={{
            paddingTop: '30px',
            paddingBottom: '20px'
        }}>
            <Card>
                <Card.Body>
                    <Card.Title>{tile.title}</Card.Title>
                    <Card.Text>
                        Launch Date: {tile.launch_date}<br/>
                        Status: {tile.status}
                    </Card.Text>
                    <Button variant="success" onClick={handleAddTaskClick}>
                        Add Task
                    </Button>
                    <Button variant="primary" onClick={handleTileEditClick}>
                    Edit
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                    Delete
                    </Button>
                </Card.Body>
            </Card>
            <Carousel interval={null} indicators={false} controls={false} ref={carouselRef}>
                {[...Array(Math.ceil(updatedTile.tasks.length / 3))].map((_, index) => (
                    <Carousel.Item key={index}>
                        <Row>
                            {updatedTile
                                .tasks
                                .slice(index * 3, (index + 1) * 3)
                                .map((task, taskIndex) => (
                                    <Col key={taskIndex}>
                                        <Task task={task} onEdit={() => handleTaskEditClick(task.id)}/>
                                    </Col>
                                ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div
                style={{
                textAlign: 'center',
                marginTop: '10px'
            }}>
                <Button
                    variant="secondary"
                    style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'black',
                    backgroundColor: 'lightgray',
                    padding: '8px 12px',
                    marginRight: '10px'
                }}
                    onClick={prevCarousel}>
                    &#8249;
                </Button>
                <Button
                    variant="secondary"
                    style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'black',
                    backgroundColor: 'lightgray',
                    padding: '8px 12px'
                }}
                    onClick={nextCarousel}>
                    &#8250;
                </Button>
            </div>

            <AddTaskForm
                show={showAddForm}
                onHide={() => setShowAddForm(false)}
                onSuccess={handleTaskSubmit}
                tileId={tile.id}/>

            <EditTaskForm
                show={showEditTaskForm}
                onHide={() => setShowEditTaskForm(false)}
                id={selectedTaskId}/>
            <EditTileForm 
            show={showEditTileForm}
            onHide={()=> setShowEditTileForm(false)}
            id={tile.id}
            initial_launch_date={tile.launch_date}
            initial_status={tile.status}/>

        </div>
    );
};

export default Tile;
