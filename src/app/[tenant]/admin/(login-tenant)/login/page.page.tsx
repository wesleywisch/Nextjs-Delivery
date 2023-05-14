"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FormEvent, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Alert,
} from "@mui/material"

import { useApiTenant } from "../../../../../hooks/useApi-Tenant"

type ParamsProps = {
  tenant: string;
}

export default function LoginTenant() {
  const params = useParams() as ParamsProps;
  const api = useApiTenant();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  async function handleLoginTenant(event: FormEvent) {
    event.preventDefault();

    if (!emailField.trim() || !passwordField.trim()) {
      return setError('Preencha e-mail e senha.');
    }

    setLoading(true)
    setError('');

    try {
      const result = await api.login(emailField, passwordField);

      if (result.error) {
        setError(result.error);
      }

      setEmailField('');
      setPasswordField('');
    } catch (err) {
      setError('Ocorreu um erro! Tente novamente.')
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Typography
        component="p"
        sx={{
          mt: 2,
          textAlign: 'center',
          color: "#555"
        }}
      >
        Digite seus dados para entrar no painel administrativo do estabelecimento e gerenciar produtos/pedidos.
      </Typography>

      <Box
        component="form"
        sx={{ mt: 3 }}
        onSubmit={handleLoginTenant}
      >
        <TextField
          label="Digite seu e-mail"
          name="email"
          type="email"
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={e => setEmailField(e.target.value)}
          value={emailField}
        />

        <TextField
          label="Digite sua senha"
          name="password"
          type="password"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={e => setPasswordField(e.target.value)}
          value={passwordField}
        />

        {error && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>

        <Box sx={{ mt: 3 }}>
          <MuiLink
            href={`/${params.tenant}/admin/login/forgot`}
            variant="body2"
            component={Link}
          >
            Esqueceu sua senha?
          </MuiLink>
        </Box>
      </Box>
    </>
  )
}
