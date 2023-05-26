import Link from "next/link"
import { HiMenu } from 'react-icons/hi';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { useParams, useRouter } from "next/navigation";

import { HeaderDrawer } from "./HeaderDrawer";
import { useState } from "react";

type ParamsProps = {
  tenant: string;
}

export function HeaderTenant() {
  const params = useParams() as ParamsProps;
  const router = useRouter();

  const pageTitle = `Painel ${params.tenant}`;

  const [drawerOpen, setDrawerOpen] = useState(false)

  function handleLogout() {
    router.push(`/${params.tenant}/admin/login`)
  }

  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <AppBar component="nav" position="relative" sx={{ displayPrint: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <HiMenu />
          </IconButton>

          <Typography
            component="div"
            variant="h6"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <Link
              href={`/${params.tenant}/admin/panel/demand`}
              style={{
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              {pageTitle}
            </Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link
              href={`/${params.tenant}/admin/panel/demand`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button sx={{ color: "#fff" }}>Pedidos</Button>
            </Link>
            <Link
              href={`/${params.tenant}/admin/panel/products`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button sx={{ color: "#fff" }}>Produtos</Button>
            </Link>
            <Link
              href={`/${params.tenant}/admin/panel/categories`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Button sx={{ color: "#fff" }}>Categorias</Button>
            </Link>

            <Button
              onClick={handleLogout}
              sx={{ color: "#fff" }}
            >
              Sair
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <HeaderDrawer
          open={drawerOpen}
          onClose={handleDrawerToggle}
          title={pageTitle}
          onLogout={handleLogout}
          params={params}
        />
      </Box>
    </>
  )
}
