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
    Checkbox,
    FormControlLabel,
    FormGroup,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend ,CartesianGrid} from 'recharts';
import { FiCloud } from 'react-icons/fi';

const API_URL = 'http://52.250.54.24:3500/api/node/';

const GraphWithFeatureSelection = ({ data }) => {
    const allFeatures = [
        { key: 'pm2_5', label: 'PM2.5', color: '#FF5733' },
        { key: 'pm10', label: 'PM10', color: '#33FF57' },
        { key: 'pm1', label: 'PM1', color: '#3357FF' },
        { key: 'temperature', label: 'Temperature', color: '#FFC300' },
        { key: 'humidity', label: 'Humidity', color: '#DAF7A6' },
        { key: 'co', label: 'CO', color: '#C70039' },
        { key: 'voc', label: 'VOC', color: '#900C3F' },
        { key: 'co2', label: 'CO2', color: '#581845' },
    ];

    const [selectedFeatures, setSelectedFeatures] = useState(['pm2_5', 'pm10']);

    const handleFeatureToggle = (key) => {
        setSelectedFeatures((prev) =>
            prev.includes(key) ? prev.filter((feature) => feature !== key) : [...prev, key]
        );
    };

    const formatTooltipValue = (value) => {
        return value !== null && value !== undefined ? value.toFixed(2) : 'N/A';
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center', p: 2 }}>
            {/* Graph Title */}
            <Typography
                variant="h4"
                sx={{
                    color: '#1976d2',
                    fontWeight: 'bold',
                    mb: 3,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
            >
                iPolluSense Dynamic Sensor Data Graph
            </Typography>

            {/* Checkbox List for Features */}
            <FormGroup row sx={{ justifyContent: 'center', mb: 3 }}>
                {allFeatures.map((feature) => (
                    <FormControlLabel
                        key={feature.key}
                        control={
                            <Checkbox
                                checked={selectedFeatures.includes(feature.key)}
                                onChange={() => handleFeatureToggle(feature.key)}
                                sx={{
                                    color: feature.color,
                                    '&.Mui-checked': {
                                        color: feature.color,
                                    },
                                }}
                            />
                        }
                        label={
                            <span style={{ color: feature.color, fontWeight: 'bold' }}>
                                {feature.label}
                            </span>
                        }
                        sx={{
                            marginRight: '20px',
                        }}
                    />
                ))}
            </FormGroup>

            {/* Line Chart */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '10px',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                    background: 'linear-gradient(135deg, #f3f4f6, #e2e8f0)',
                }}
            >
                <LineChart
                    width={Math.max(window.innerWidth * 0.85, 800)}
                    height={500}
                    data={data.map((item, index) => ({
                        index, // Ensure an index key exists
                        ...item, // Spread the data object for flexible features
                    }))}
                    margin={{
                        top: 20,
                        right: 40,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <defs>
                        {allFeatures.map((feature) => (
                            <linearGradient key={feature.key} id={feature.key} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={feature.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={feature.color} stopOpacity={0.3} />
                            </linearGradient>
                        ))}
                    </defs>
                    <XAxis dataKey="index" tick={{ fill: '#555', fontWeight: 'bold' }} />
                    <YAxis
                        tick={{ fill: '#555', fontWeight: 'bold' }}
                        tickFormatter={(value) => value.toFixed(2)}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                        itemStyle={{ fontWeight: 'bold', color: '#333' }}
                        formatter={formatTooltipValue}
                    />
                    <Legend
                        wrapperStyle={{
                            bottom: -10,
                            fontWeight: 'bold',
                            color: '#555',
                        }}
                    />
                    {allFeatures
                        .filter((feature) => selectedFeatures.includes(feature.key))
                        .map((feature) => (
                            <Line
                                key={feature.key}
                                type="monotone"
                                dataKey={feature.key}
                                stroke={`url(#${feature.key})`}
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name={feature.label}
                            />
                        ))}
                </LineChart>
            </Box>
        </Box>
    );
};

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
    const [nodeValue, setNodeValue] = useState(1192);
    const [inputValue, setInputValue] = useState(1192);
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
        const interval = setInterval(fetchData, 15000);
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
                pm1:item.activityData.data.pm1,
                temperature:item.activityData.data.temperature,
                humidity:item.activityData.data.humidity,
                co:item.activityData.data.co,
                voc:item.activityData.data.voc,
                co2:item.activityData.data.co2
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
                <GraphWithFeatureSelection data={getLatestSensorData()} />

                {/* Sensor Data Section */}
                <SensorDataCards data={getLast10SensorData()} />
            </Box>
        </div>
    );
};

export default App;
