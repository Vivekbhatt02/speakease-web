import {useState, useEffect} from 'react';
import {Box, Typography, Slider, Button, Collapse} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {getVoiceSettings, saveVoiceSettings} from '../../services/storage.service.js';

const RATE_CONFIG = {
    min: 0.5,
    max: 2.0,
    step: 0.1,
    marks: [
        {value: 0.5, label: '0.5x'},
        {value: 1.0, label: '1x'},
        {value: 1.5, label: '1.5x'},
        {value: 2.0, label: '2x'},
    ],
};

const PITCH_CONFIG = {
    min: 0.5,
    max: 2.0,
    step: 0.1,
    marks: [
        {value: 0.5, label: 'Low'},
        {value: 1.0, label: 'Normal'},
        {value: 1.5, label: 'High'},
        {value: 2.0, label: 'Very High'},
    ],
};

const styles = {
    section: {
        width: '100%',
        mb: '1.5rem',
        pb: '1.5rem',
        borderBottom: '1px solid',
        borderColor: 'divider',
    },
    toggleButton: {
        width: '100%',
        justifyContent: 'space-between',
        mb: '1rem',
        py: '0.75rem',
        textTransform: 'none',
    },
    controlsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        px: '1rem',
    },
    sliderGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '100%',
    },
    label: {
        fontWeight: 600,
        fontSize: '1rem',
    },
};

const buildPitchLabel = (pitch) => {
    if (pitch < 0.8) return 'Very Low';
    if (pitch < 1.0) return 'Low';
    if (pitch < 1.2) return 'Normal';
    if (pitch < 1.6) return 'High';
    return 'Very High';
};

export const VoiceControls = () => {
    const [expanded, setExpanded] = useState(false);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);

    useEffect(() => {
        const settings = getVoiceSettings();
        setRate(settings.rate);
        setPitch(settings.pitch);
    }, []);

    const handleRateChange = (event, newValue) => {
        setRate(newValue);
        saveVoiceSettings({rate: newValue, pitch});
    };

    const handlePitchChange = (event, newValue) => {
        setPitch(newValue);
        saveVoiceSettings({rate, pitch: newValue});
    };

    return (
      <Box sx={styles.section}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setExpanded(!expanded)}
            sx={styles.toggleButton}
            endIcon={expanded
              ?
              <ExpandLessIcon/>
              :
              <ExpandMoreIcon/>
            }
            aria-expanded={expanded}
            aria-label="Toggle voice settings"
          >
              Voice Settings
          </Button>

          <Collapse in={expanded}>
              <Box sx={styles.controlsContainer}>
                  <Box sx={styles.sliderGroup}>
                      <Typography sx={styles.label}>
                          Speed: {rate.toFixed(1)}x
                      </Typography>
                      <Slider
                        value={rate}
                        onChange={handleRateChange}
                        aria-label="Speech rate"
                        aria-valuetext={`${rate.toFixed(1)} times normal speed`}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value.toFixed(1)}x`}
                        size="large"
                        {...RATE_CONFIG}
                      />
                  </Box>

                  <Box sx={styles.sliderGroup}>
                      <Typography sx={styles.label}>
                          Pitch: {pitch.toFixed(1)} ({buildPitchLabel(pitch)})
                      </Typography>
                      <Slider
                        value={pitch}
                        onChange={handlePitchChange}
                        aria-label="Speech pitch"
                        aria-valuetext={`${buildPitchLabel(pitch)} pitch`}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => value.toFixed(1)}
                        size="large"
                        {...PITCH_CONFIG}
                      />
                  </Box>
              </Box>
          </Collapse>
      </Box>
    );
};
