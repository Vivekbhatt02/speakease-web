import {useState} from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {getPhrases, savePhrase, updatePhrase, deletePhrase} from '../../services/storage.service.js';
import {PageContainer} from '../PageContainer';
import {PhraseCard} from './PhraseCard';

const styles = {
    title: {
        mb: '0.5rem',
        fontWeight: 700,
    },
    subtitle: {
        mb: '2rem',
        color: 'text.secondary',
    },
    inputSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        mb: '2rem',
        pb: '2rem',
        borderBottom: '1px solid',
        borderColor: 'divider',
    },
    inputWrapper: {
        display: 'flex',
        gap: '1rem',
        width: '100%',
    },
    input: {
        flex: 1,
    },
    addButton: {
        py: '0.75rem',
    },
    phrasesList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    emptyState: {
        textAlign: 'center',
        py: '3rem',
        color: 'text.secondary',
    },
};

export const SavedPhrasesPage = () => {
    const [phrases, setPhrases] = useState(() => getPhrases());
    const [newPhraseText, setNewPhraseText] = useState('');

    const handleSavePhrase = () => {
        if (!newPhraseText.trim()) return;

        const phrase = savePhrase(newPhraseText);
        if (phrase) {
            setPhrases([...phrases, phrase]);
            setNewPhraseText('');
        }
    };

    const handleDeletePhrase = (id) => {
        const success = deletePhrase(id);
        if (success) {
            setPhrases(phrases.filter((p) => p.id !== id));
        }
    };

    const handleEditPhrase = (id, newText) => {
        const updated = updatePhrase(id, newText);
        if (updated) {
            setPhrases(phrases.map((p) => (p.id === id ? updated : p)));
        }
    };

    return (
      <PageContainer>
          <Typography variant="h4" sx={styles.title}>
              Saved Phrases
          </Typography>
          <Typography variant="body1" sx={styles.subtitle}>
              Quick access to your frequently used phrases
          </Typography>

          <Box sx={styles.inputSection}>
              <Box sx={styles.inputWrapper}>
                  <TextField
                    placeholder="Add a new phrase..."
                    value={newPhraseText}
                    onChange={(e) => setNewPhraseText(e.target.value)}
                    multiline
                    maxRows={3}
                    fullWidth
                    sx={styles.input}
                    aria-label="New phrase input"/>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon/>}
                    onClick={handleSavePhrase}
                    disabled={!newPhraseText.trim()}
                    sx={styles.addButton}>
                      Save
                  </Button>
              </Box>
          </Box>

          {phrases.length === 0
            ?
            (
              <Box sx={styles.emptyState}>
                  <Typography>No saved phrases yet. Add one to get started!</Typography>
              </Box>
            )
            :
            (
              <Box sx={styles.phrasesList}>
                  {phrases.map((phrase) => (
                    <PhraseCard
                      key={phrase.id}
                      phrase={phrase}
                      onEdit={handleEditPhrase}
                      onDelete={handleDeletePhrase}/>
                  ))}
              </Box>
            )
          }
      </PageContainer>
    );
};
