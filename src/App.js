import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tile from './components/Tile';

const App = () => {
    const currentDate = new Date()
        .toISOString()
        .split('T')[0];

    const [tiles,
        setTiles] = useState([]);
    const [newTileData,
        setNewTileData] = useState({
        launch_date: currentDate,
        status: 'live',
        taskData: {
            order: 1,
            type: '',
            title: '',
            description: ''
        }
    });

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/tiles/')
            .then((response) => {
                setTiles(response.data);
            });
    }, []);

    const handleStatusFilter = (status) => {
      let url = 'http://127.0.0.1:8000/tiles/'
        if (status !== 'all') {
          url += `?status=${status}`
        }
        axios
            .get(url)
            .then((response) => {
                setTiles(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tiles:', error);
            });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTileData({
            ...newTileData,
            [name]: value
        });
    };

    const handleTaskInputChange = (e) => {
        const {name, value} = e.target;
        setNewTileData({
            ...newTileData,
            taskData: {
                ...newTileData.taskData,
                [name]: value
            }
        });
    };

    const handleCreateTile = () => {
        axios
            .post('http://127.0.0.1:8000/tiles/', {
            launch_date: newTileData.launch_date,
            status: newTileData.status
        })
            .then((response) => {
                const createdTile = response.data;
                setTiles([
                    ...tiles,
                    createdTile
                ]);

                axios
                    .post('http://127.0.0.1:8000/tasks/', {
                    order: newTileData.taskData.order,
                    tile: createdTile.id,
                    type: newTileData.taskData.type,
                    title: newTileData.taskData.title,
                    description: newTileData.taskData.description
                })
                    .catch((error) => {
                        console.error('Error creating task:', error);
                    });
            })
            .catch((error) => {
                console.error('Error creating tile:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Tasks App</h1>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                width: '80%',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    backgroundColor: 'lightgrey',
                    borderRadius: '5px',
                }}>
                    <div
                        onClick={() => handleStatusFilter('all')}
                        style={{
                            width: '25%',
                            textAlign: 'center',
                            padding: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        All
                    </div>
                    <div
                        onClick={() => handleStatusFilter('live')}
                        style={{
                            width: '25%',
                            textAlign: 'center',
                            padding: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        Live
                    </div>
                    <div
                        onClick={() => handleStatusFilter('pending')}
                        style={{
                            width: '25%',
                            textAlign: 'center',
                            padding: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        Pending
                    </div>
                    <div
                        onClick={() => handleStatusFilter('archived')}
                        style={{
                            width: '25%',
                            textAlign: 'center',
                            padding: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        Archived
                    </div>
                </div>
            </div>

            <div
                style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                width: '80%',
                margin: '0 auto'
            }}>
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateTile();
                }}
                    style={{
                    width: '100%'
                }}>
                    <div className="mb-3">
                        <label htmlFor="launch_date" className="form-label">Launch Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="launch_date"
                            name="launch_date"
                            value={newTileData.launch_date}
                            onChange={handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            value={newTileData.status}
                            onChange={handleInputChange}>
                            <option value="live">Live</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="order" className="form-label">Task Order</label>
                        <input
                            type="number"
                            className="form-control"
                            id="order"
                            name="order"
                            value={newTileData.taskData.order}
                            disabled/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Task Type</label>
                        <select
                            className="form-select"
                            id="type"
                            name="type"
                            value={newTileData.taskData.type}
                            onChange={handleTaskInputChange}>
                            <option value="">Select Type</option>
                            <option value="survey">Survey</option>
                            <option value="discussion">Discussion</option>
                            <option value="diary">Diary</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Task Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={newTileData.taskData.title}
                            onChange={handleTaskInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Task Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={newTileData.taskData.description}
                            onChange={handleTaskInputChange}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Create Tile and Task</button>
                    </div>
                </form>
            </div>

            {tiles.map((tile) => (<Tile key={tile.id} tile={tile}/>))}
        </div>
    );
};

export default App;