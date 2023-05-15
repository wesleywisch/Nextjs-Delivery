"use client"
import { FormEvent, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material"

import { useApiTenant } from "../../../../../../../hooks/useApi-Tenant"

export default function Confirm() {
  const api = useApiTenant();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [confirmPasswordField, setConfirmPasswordField] = useState('');

  async function handleLoginTenant(event: FormEvent) {
    event.preventDefault();

    if (!passwordField.trim() || !confirmPasswordField.trim()) {
      return setError('Preencha a senha.');
    }

    if (passwordField !== confirmPasswordField) {
      return setError('As senhas não batem.');
    }

    try {
      setLoading(true)
      setError('');
      setSuccess('');

      const result = await api.redefinePassword(passwordField, 'tokenFake');

      if (result.error) {
        return setError(result.error);
      }

      setSuccess('Senha redefina com sucesso!');
      setPasswordField('');
      setConfirmPasswordField('');
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
        Olá **Usuário**, defina sua nova senha abaixo.
      </Typography>

      <Box
        component="form"
        sx={{ mt: 3 }}
        onSubmit={handleLoginTenant}
      >
        <TextField
          label="Digite sua nova senha"
          name="password"
          type="password"
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={e => setPasswordField(e.target.value)}
          value={passwordField}
        />

        <TextField
          label="Confirme sua nova senha"
          name="confirmPassword"
          type="password"
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={e => setConfirmPasswordField(e.target.value)}
          value={confirmPasswordField}
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
          {loading ? 'Carregando...' : 'Definir nova senha'}
        </Button>
      </Box>
    </>
  )
}
