"use client";
import { Container } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { HeaderTenant } from '../../../../../components/HeaderTenant';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <HeaderTenant />

        <Container component="section" maxWidth="lg">
          {children}
        </Container>
      </body>
    </html>
  );
}
