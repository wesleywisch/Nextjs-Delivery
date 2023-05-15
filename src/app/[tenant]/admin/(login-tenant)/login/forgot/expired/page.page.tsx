"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Box, Alert, Link as MuiLink } from "@mui/material"

type ParamsProps = {
  tenant: string;
}

export default function Expired() {
  const params = useParams() as ParamsProps;

  return (
    <Box
      component="div"
      sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Alert
        variant="filled"
        severity="error"
        sx={{ mb: 3 }}
      >
        Este link expirou, refaça o procedimento.
      </Alert>

      <MuiLink
        href={`/${params.tenant}/admin/login/forgot`}
        variant="button"
        component={Link}
      >
        Esqueci minha senha
      </MuiLink>
    </Box>
  )
}
