import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const API_URL = 'http://52.250.54.24:3500/api/node/';

function App() {
    const [sensorData, setSensorData] = useState(null);
    const [error, setError] = useState(null);
    const [nodeValue, setNodeValue] = useState(81029); // Default nodeValue
    const [inputValue, setInputValue] = useState(81029); // Controlled input state
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Track if it's the first load
    const [lastUpdated, setLastUpdated] = useState(null); // Last successful update timestamp

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setSensorData(data);
            setError(null); // Clear any previous errors
            setLastUpdated(new Date()); // Set the last updated timestamp

            // Mark the first load as complete
            if (isFirstLoad) {
                setIsFirstLoad(false);
            }
        } catch (err) {
            setError(err);
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch

        const interval = setInterval(() => {
            fetchData(); // Periodic updates
        }, 10000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [isFirstLoad]);

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

    const getUpdateMessage = () => {
        if (!lastUpdated) return "Loading...";

        const secondsAgo = Math.floor((new Date() - lastUpdated) / 1000);
        return error
            ? `Could not update ${secondsAgo} seconds ago`
            : `Updated ${secondsAgo} seconds ago`;
    };

    return (
        <div className="App">
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <p>{getUpdateMessage()}</p>
            </div>

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

            {isFirstLoad ? (
                <p>Loading...</p>
            ) : (
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
                        {sensorData && sensorData.response
                            .filter((item) => item.nodeValue === nodeValue)
                            .map((item, index) => (
                                <li key={index}>
                                    <h3>Node Value: {item.nodeValue}</h3>
                                    <p>Device ID: {item.activityData.device_id}</p>
                                    <p>Timestamp: {item.createdAt}</p>
                                    {/* ... other fields ... */}
                                    <p>Temperature: {item.activityData.data.temperature}</p>
                                    <p>Humidity: {item.activityData.data.humidity}</p>
                                    <p>PM 2.5: {item.activityData.data.pm2_5}</p>
                                    <p>PM 10: {item.activityData.data.pm10}</p>
                                    <p>PM 1: {item.activityData.data.pm1}</p>
                                    <p>CO: {item.activityData.data.co}</p>
                                    <p>VOC: {item.activityData.data.voc}</p>
                                    <p>CO2: {item.activityData.data.co2}</p>
                                    {/* Add other fields from activityData.data here */}
                                    <p>AQI Dust (Calculated): {item.activityData.calculated.aqi_dust}</p>
                                    <p>AQI CO (Calculated): {item.activityData.calculated.aqi_co}</p>
                                    {/* Add other fields from activityData.calculated here */}
                                    {/*<p>AQI Dust (Predicted): {item.activityData.predicted.aqi_dust}</p>*/}
                                    {/*<p>AQI CO (Predicted): {item.activityData.predicted.aqi_co}</p>*/}
                                    {/* Add other fields from activityData.predicted here */}
                                    <p>Dust Status: {item.activityData.status.dust}</p>
                                    <p>CO Status: {item.activityData.status.co}</p>
                                </li>
                            ))}
                    </ul>

                    {error && !sensorData && (
                        <p>Error: {error.message}. No previous data available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
