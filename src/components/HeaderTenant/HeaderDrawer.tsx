import Link from "next/link";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"

type HeaderDrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onLogout: () => void;
  params: {
    tenant: string;
  }
}

export function HeaderDrawer({ open, onClose, title, onLogout, params }: HeaderDrawerProps) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { width: '70%' }
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          {title}
        </Typography>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Link
                href={`/${params.tenant}/admin/panel/demand`}
                style={{
                  textDecoration: 'none',
                  color: "#000",
                }}
              >
                <ListItemText primary="Pedidos" />
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <Link
                href={`/${params.tenant}/admin/panel/products`}
                style={{
                  textDecoration: 'none',
                  color: "#000",
                }}
              >
                <ListItemText primary="Produtos" />
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <Link
                href={`/${params.tenant}/admin/panel/categories`}
                style={{
                  textDecoration: 'none',
                  color: "#000",
                }}
              >
                <ListItemText primary="Categorias" />
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={onLogout}>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
