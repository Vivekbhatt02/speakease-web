import {Typography} from "@mui/material";
import {PageContainer} from "../PageContainer";
import {SpeakInput} from "./SpeakInput";

const styles = {
    title: {
        mb: '0.5rem',
        fontWeight: 700,
    },
    subtitle: {
        mb: '2rem',
        color: 'text.secondary',
    },
};

export const SpeakPage = () => {
    return (
      <PageContainer>
          <Typography variant="h4" sx={styles.title}>
              SpeakEase
          </Typography>
          <Typography variant="body1" sx={styles.subtitle}>
              Type your message and tap Speak
          </Typography>
          <SpeakInput/>
      </PageContainer>
    );
};
