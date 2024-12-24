import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Box,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { FiCloud } from 'react-icons/fi';

const API_URL = 'http://52.250.54.24:3500/api/node/';

const Graph = ({ data }) => (
    <Box
        sx={{
            backgroundColor: '#f1f8e9',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            height: '500px', // Fixed height for graph section
        }}
    >
        <Typography variant="h6" gutterBottom>
            PM2.5 & PM10 Graph (Last 10 Items)
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="pm2_5"
                    stroke="#ff7043"
                    strokeWidth={3}
                    name="PM2.5"
                    dot={{ r: 6 }}
                />
                <Line
                    type="monotone"
                    dataKey="pm10"
                    stroke="#29b6f6"
                    strokeWidth={3}
                    name="PM10"
                    dot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    </Box>
);

const SensorDataCards = ({ data }) => (
    <Box
        sx={{
            backgroundColor: '#f3f7fb',
            borderRadius: '10px',
            padding: '20px',
        }}
    >
        <Typography
            variant="h5"
            sx={{
                marginBottom: '20px',
                color: '#1976d2',
                fontWeight: 'bold',
                textAlign: 'center',
            }}
        >
            Sensor Data (Last 10 Items)
        </Typography>
        <Grid container spacing={4}>
            {data.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <Card
                        sx={{
                            padding: '20px',
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                        }}
                    >
                        {/* Circular Index Badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#29b6f6',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                                zIndex: 1,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                }}
                            >
                                {index + 1}
                            </Typography>
                        </Box>

                        <CardContent sx={{ paddingTop: '50px' }}>
                            {/* Data Rows */}
                            <Grid container spacing={2}>
                                {/* Data Columns */}
                                <Grid item xs={4}>
                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        Temperature:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#424242' }}>
                                        {item.activityData.data.temperature} °C
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 1 }}>
                                        Humidity:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#424242' }}>
                                        {item.activityData.data.humidity} %
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 1 }}>
                                        PM 2.5:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#ff7043' }}>
                                        {item.activityData.data.pm2_5} µg/m³
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        PM 10:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#ff8a65' }}>
                                        {item.activityData.data.pm10} µg/m³
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 1 }}>
                                        PM 1:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#ff7043' }}>
                                        {item.activityData.data.pm1} µg/m³
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 1 }}>
                                        VOC:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#4db6ac' }}>
                                        {item.activityData.data.voc} ppb
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        CO:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#424242' }}>
                                        {item.activityData.data.co} ppm
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 1 }}>
                                        CO2:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#8e24aa' }}>
                                        {item.activityData.data.co2} ppm
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold', mt: 1 }}>
                                        AQI CO (Calculated):
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                                        {item.activityData.calculated.aqi_co}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Predicted Fields */}
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        Predicted AQI Dust:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#616161' }}>
                                        {item.activityData.predicted.aqi_dust}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        Predicted AQI CO:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#616161' }}>
                                        {item.activityData.predicted.aqi_co}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Bottom Row */}
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        Dust Status:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#616161' }}>
                                        {item.activityData.status.dust}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        CO Status:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#616161' }}>
                                        {item.activityData.status.co}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Divider and Footer */}
                            <Divider sx={{ my: 2 }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: 'center',
                                    color: '#616161',
                                    fontStyle: 'italic',
                                }}
                            >
                                Last Updated: {new Date(item.createdAt).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);




const App = () => {
    const [sensorData, setSensorData] = useState(null);
    const [error, setError] = useState(null);
    const [nodeValue, setNodeValue] = useState(81029);
    const [inputValue, setInputValue] = useState(81029);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setSensorData(data);
            setError(null);
            setLastUpdated(new Date());
            setIsFirstLoad(false);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [nodeValue]);

    const getLatestSensorData = () => {
        if (!sensorData || !sensorData.response) return [];
        return sensorData.response
            .filter((item) => item.nodeValue === nodeValue)
            .slice(-10)
            .map((item, index) => ({
                index,
                pm2_5: item.activityData.data.pm2_5,
                pm10: item.activityData.data.pm10,
            }));
    };

    const getLast10SensorData = () => {
        if (!sensorData || !sensorData.response) return [];
        return sensorData.response
            .filter((item) => item.nodeValue === nodeValue)
            .slice(-10);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNodeValue(Number(inputValue));
    };

    const getUpdateMessage = () => {
        if (!lastUpdated) return "Loading...";
        const secondsAgo = Math.floor((new Date() - lastUpdated) / 1000);
        return error
            ? `Could not update ${secondsAgo} seconds ago`
            : `Updated ${secondsAgo} seconds ago`;
    };

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: '#00796b' }}>
                <Toolbar>
                    <FiCloud size={30} style={{ marginRight: '10px', color: '#ffffff' }} />
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        iPolluSense - Air Quality Monitoring
                    </Typography>
                    <Typography variant="body2">{getUpdateMessage()}</Typography>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    padding: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <TextField
                        label="Node Value"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        size="medium"
                        style={{ width: '50%', marginRight: '10px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        size="large"
                    >
                        Submit
                    </Button>
                </Box>

                {/* Graph Section */}
                <Graph data={getLatestSensorData()} />

                {/* Sensor Data Section */}
                <SensorDataCards data={getLast10SensorData()} />
            </Box>
        </div>
    );
};

export default App;
