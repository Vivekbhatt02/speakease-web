import {useState} from 'react';
import {Card, CardContent, Typography, IconButton, Box, TextField} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import {speak} from '../../services/textToSpeech.service.js';

const styles = {
    card: {
        width: '100%',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        pb: '1rem',
    },
    textDisplay: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1,
    },
    phraseText: {
        flex: 1,
        wordBreak: 'break-word',
    },
    editMode: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-end',
        width: '100%',
    },
    editTextField: {
        flex: 1,
    },
    actionButtons: {
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'flex-end',
    },
};

export const PhraseCard = ({phrase, onEdit, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(phrase.text);

    const handleSpeak = () => {
        speak(phrase.text);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditText(phrase.text);
    };

    const handleSaveEdit = () => {
        if (editText.trim() && editText !== phrase.text) {
            onEdit(phrase.id, editText);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditText(phrase.text);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(phrase.id);
    };

    return (
      <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
              {!isEditing
                ?
                (
                  <Box sx={styles.textDisplay}>
                      <Typography sx={styles.phraseText} variant="body1">
                          {phrase.text}
                      </Typography>
                      <Box sx={styles.actionButtons}>
                          <IconButton
                            size="small"
                            onClick={handleSpeak}
                            aria-label="Speak phrase">
                              <VolumeUpIcon fontSize="small"/>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleEditClick}
                            aria-label="Edit phrase">
                              <EditIcon fontSize="small"/>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleDelete}
                            aria-label="Delete phrase"
                            color="error">
                              <DeleteIcon fontSize="small"/>
                          </IconButton>
                      </Box>
                  </Box>
                )
                :
                (
                  <Box sx={styles.editMode}>
                      <TextField
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        multiline
                        maxRows={3}
                        fullWidth
                        sx={styles.editTextField}
                        autoFocus
                        aria-label="Edit phrase text"/>
                      <Box sx={styles.actionButtons}>
                          <IconButton
                            size="small"
                            onClick={handleSaveEdit}
                            aria-label="Save edit"
                            color="success">
                              <CheckIcon fontSize="small"/>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleCancelEdit}
                            aria-label="Cancel edit">
                              <DeleteIcon fontSize="small"/>
                          </IconButton>
                      </Box>
                  </Box>
                )
              }
          </CardContent>
      </Card>
    );
};
