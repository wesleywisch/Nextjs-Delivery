"use client"
import { FormEvent, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material"

import { useApiTenant } from "../../../../../../hooks/useApi-Tenant"

export default function Forgot() {
  const api = useApiTenant();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailField, setEmailField] = useState('');

  async function handleLoginTenant(event: FormEvent) {
    event.preventDefault();

    if (!emailField.trim()) {
      return setError('Preencha o seu e-mail');
    }

    try {
      setLoading(true)
      setError('');
      setSuccess('');

      const result = await api.forgotPassword(emailField);

      if (result.error) {
        return setError(result.error);
      }

      setSuccess('Enviamos um e-mail com as instruções para recuperação da sua senha.')
      setEmailField('');
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
        Deseja recuperar sua senha?
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

        {error && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            variant="filled"
            severity="success"
            sx={{ mb: 3 }}
          >
            {success}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Recuperar a senha'}
        </Button>
      </Box>
    </>
  )
}
