"use client";
import { Box, Container, Typography } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Container component="main" maxWidth="xs">
          <Box sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItens: 'center',
          }}>
            <Typography component="h3" variant="h3">B7Delivery</Typography>
            <Typography component="h5" variant="h5">Painel de estabelecimento</Typography>

            {children}
          </Box>
        </Container>
      </body>
    </html>
  );
}
