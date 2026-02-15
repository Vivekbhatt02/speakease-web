import {useState} from "react";
import {TextField, Button, Box} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {speak} from "../../services/textToSpeech.service.js";
import {getVoiceSettings} from "../../services/storage.service.js";

const styles = {
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    speakButton: {
        py: '0.75rem',
    },
};

export const SpeakInput = () => {
    const [text, setText] = useState("");

    const handleSpeak = () => {
        const settings = getVoiceSettings();
        speak(text, settings);
    };

    return (
      <Box sx={styles.wrapper}>
          <TextField
            multiline
            rows={4}
            placeholder="Type what you want to say..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            aria-label="Text to speak"
          />
          <Button
            variant="contained"
            size="large"
            startIcon={<VolumeUpIcon/>}
            onClick={handleSpeak}
            disabled={!text.trim()}
            sx={styles.speakButton}
          >
              Speak
          </Button>
      </Box>
    );
};
