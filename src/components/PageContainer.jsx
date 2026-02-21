import {Container} from "@mui/material";

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: '2rem',
        px: '1rem',
        pb: '2rem',
        pt: '5rem',
    },
};

export const PageContainer = ({children}) => {
    return (
      <Container maxWidth="sm" sx={styles.container}>
          {children}
      </Container>
    );
};
