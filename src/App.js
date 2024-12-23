import React, { useState, useEffect } from 'react';

const API_URL = 'http://52.250.54.24:3500/api/node/';

function App() {
    const [sensorData, setSensorData] = useState(null); // Initialize with null
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : sensorData ? (
                <div>
                    <p>{sensorData.response[0].nodeValue}</p>
                </div>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
}

export default App;