import {useState} from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {getPhrases, savePhrase, updatePhrase, deletePhrase} from '../../services/storage.service.js';
import {DEFAULT_PHRASES} from '../../data/defaultPhrases.js';
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
    addButton: {
        py: '0.75rem',
    },
    categorySection: {
        mb: '2rem',
    },
    categoryHeader: {
        mb: '1rem',
        fontWeight: 600,
        color: 'primary.main',
        fontSize: '1rem',
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
    categoriesContainer: {
        mb: '1.5rem',
    },
    customPhrasesHeader: {
        mt: '2rem',
        mb: '1rem',
        fontWeight: 600,
        color: 'text.primary',
    },
};

export const SavedPhrasesPage = () => {
    const [phrases, setPhrases] = useState(() => getPhrases());
    const [newPhraseText, setNewPhraseText] = useState('');

    const categories = Object.keys(DEFAULT_PHRASES);
    const defaultPhrases = phrases.filter((p) => p.category);
    const customPhrases = phrases.filter((p) => !p.category);

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

    const renderCategorySection = (category) => {
        const phrasesInCategory = defaultPhrases.filter((p) => p.category === category);
        if (phrasesInCategory.length === 0) return null;

        return (
          <Box key={category} sx={styles.categorySection}>
              <Typography sx={styles.categoryHeader}>
                  {category}
              </Typography>
              <Box sx={styles.phrasesList}>
                  {phrasesInCategory.map((phrase) => (
                    <PhraseCard
                      key={phrase.id}
                      phrase={phrase}
                      onEdit={handleEditPhrase}
                      onDelete={handleDeletePhrase}/>
                  ))}
              </Box>
          </Box>
        );
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
              <Box>
                  {defaultPhrases.length > 0 && (
                    <Box sx={styles.categoriesContainer}>
                        {categories.map((category) => renderCategorySection(category))}
                    </Box>
                  )}

                  {customPhrases.length > 0 && (
                    <>
                        <Typography sx={styles.customPhrasesHeader}>
                            My Phrases
                        </Typography>
                        <Box sx={styles.phrasesList}>
                            {customPhrases.map((phrase) => (
                              <PhraseCard
                                key={phrase.id}
                                phrase={phrase}
                                onEdit={handleEditPhrase}
                                onDelete={handleDeletePhrase}/>
                            ))}
                        </Box>
                    </>
                  )}
              </Box>
            )
          }
      </PageContainer>
    );
};
