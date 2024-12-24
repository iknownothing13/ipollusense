import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Fab,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const AboutProjectModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {/* Floating Info Button */}
            <Fab
                color="primary"
                onClick={handleOpen}
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                }}
            >
                <InfoIcon />
            </Fab>

            {/* Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                scroll="paper"
            >
                <DialogTitle>About The Project</DialogTitle>
                <DialogContent dividers>
                    {/* Video Section */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        <video
                            controls
                            preload="metadata"
                            poster="thumbnail.png"
                            style={{ maxWidth: "80%" }}
                        >
                            <source src="video.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Accordion Sections */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Our Objectives</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li>A device that monitors the ambient PM 2.5, PM 10, CO, NO₂, VOC, and C₂H₅OH.</li>
                                <li>
                                    A secondary sensing system that measures AQI using temperature, humidity, and
                                    meteorological features.
                                </li>
                                <li>A dashboard that displays the collected data using cloud synchronization.</li>
                                <li>
                                    A demo voice assistant that periodically speaks the current air quality.
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Challenges / Known Issues</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li>
                                    Multichannel gas sensors need laboratory-based calibration for accurate readings.
                                </li>
                                <li>
                                    Separate machine learning models for each sensor consume significant resources.
                                </li>
                                <li>
                                    Minimizing device form factor while ensuring airflow remains a challenge.
                                </li>
                                <li>
                                    Pollution profiles vary across regions, requiring location-specific models.
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Future Goals</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li>
                                    Use secondary sensing to validate and recalibrate pollutant sensors.
                                </li>
                                <li>Integrate noise pollution monitoring.</li>
                                <li>Develop a companion mobile app for health and route recommendations.</li>
                                <li>Make the device cloud-agnostic with Bluetooth integration.</li>
                                <li>Implement a customizable interactive voice assistant.</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">What is AQI</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                An Air Quality Index (AQI) indicates how polluted the air currently is or is forecast
                                to be. It is based on concentrations of various air pollutants.
                            </Typography>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                <tr>
                                    <th>AQI Category</th>
                                    <th>PM₂.₅</th>
                                    <th>PM₁₀</th>
                                    <th>CO</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Good (0–50)</td>
                                    <td>0–30</td>
                                    <td>0–50</td>
                                    <td>0–1.0</td>
                                </tr>
                                <tr>
                                    <td>Satisfactory (51–100)</td>
                                    <td>31–60</td>
                                    <td>51–100</td>
                                    <td>1.1–2.0</td>
                                </tr>
                                <tr>
                                    <td>Moderate (101–200)</td>
                                    <td>61–90</td>
                                    <td>101–250</td>
                                    <td>2.1–10</td>
                                </tr>
                                </tbody>
                            </table>
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>

                {/* Modal Actions */}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AboutProjectModal;
