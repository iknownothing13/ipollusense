import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const API_URL = 'http://52.250.54.24:3500/api/node/';

function App() {
    const [sensorData, setSensorData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nodeValue, setNodeValue] = useState(81029); // Default nodeValue
    const [inputValue, setInputValue] = useState(81029); // Controlled input state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(API_URL);
                const data = await response.json();
                setSensorData(data);
            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getLatestSensorData = () => {
        if (!sensorData || !sensorData.response) {
            return [];
        }

        return sensorData.response
            .filter((item) => item.nodeValue === nodeValue)
            .slice(-10)
            .map((item, index) => ({
                index,
                pm2_5: item.activityData.data.pm2_5,
                pm10: item.activityData.data.pm10,
            }));
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNodeValue(Number(inputValue)); // Update the nodeValue state
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label htmlFor="nodeValueInput">Enter Node Value: </label>
                <input
                    id="nodeValueInput"
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : sensorData ? (
                <div>
                    <h2>PM2.5 & PM10 Graph (Last 10 Items)</h2>
                    <LineChart width={600} height={300} data={getLatestSensorData()}>
                        <XAxis dataKey="index" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pm2_5" stroke="#8884d8" name="PM2.5" />
                        <Line type="monotone" dataKey="pm10" stroke="#82ca9d" name="PM10" />
                    </LineChart>

                    <h2>Sensor Data</h2>
                    <ul>
                        {sensorData.response
                            .filter((item) => item.nodeValue === nodeValue)
                            .map((item, index) => (
                                <li key={index}>
                                    <h3>Node Value: {item.nodeValue}</h3>
                                    <p>Device ID: {item.activityData.device_id}</p>
                                    <p>Timestamp: {item.createdAt}</p>
                                    {/* ... other fields ... */}
                                </li>
                            ))}
                    </ul>
                </div>
            ) : (
                <p>No Sensor Data</p>
            )}
        </div>
    );
}

export default App;
