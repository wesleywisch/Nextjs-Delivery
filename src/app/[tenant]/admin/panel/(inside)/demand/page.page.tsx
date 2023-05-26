"use client";
import { useState, useEffect } from "react";
import { BiRefresh, BiSearch } from "react-icons/bi";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";

import { OrderItem } from "../../../../../../components/OrderItem";

import { useApiTenant } from "../../../../../../hooks/useApi-Tenant";

import { OrderUserInTenant } from "../../../../../../types/OrderUserInTenant";

export default function Demand() {
  const api = useApiTenant();

  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<OrderUserInTenant[]>([])

  function handleSearchInput() {

  }

  function handleSearchKey() {

  }

  async function getOrders() {
    try {
      setSearchInput('');
      setOrders([])
      setLoading(true);

      const orderList: OrderUserInTenant[] = await api.getOrders()
      setOrders(orderList)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Box sx={{ my: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 2 }}>
            Pedidos
          </Typography>

          {!loading ? (
            <Button onClick={getOrders} size="small" sx={{ justifyContent: { xs: 'flex-start', md: 'center', gap: 3 } }}>
              <BiRefresh size={24} />
              <Typography component="span" sx={{ color: '#555', display: { xs: 'none', sm: 'block' } }}>
                Atualizar
              </Typography>
            </Button>
          ) : (
            <CircularProgress size={24} />
          )}
        </Box>

        <TextField
          value={searchInput}
          onChange={handleSearchInput}
          onKeyUp={handleSearchKey}
          placeholder="Pesquise um pedido"
          variant="standard"
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <BiSearch />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4, }}>
        {loading ? (
          <>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
          </>
        ) : (
          <>
            {orders && orders.map((order, key) => (
              <Grid key={key} item xs={1}>
                <OrderItem
                  order={order}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  )
}
