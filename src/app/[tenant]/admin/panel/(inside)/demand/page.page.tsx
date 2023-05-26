"use client";
import { useState, useEffect, KeyboardEvent } from "react";
import { BiRefresh, BiSearch } from "react-icons/bi";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";

import { OrderItem } from "../../../../../../components/OrderItem";

import { useApiTenant } from "../../../../../../hooks/useApi-Tenant";
import { useFormatter } from "../../../../../../hooks/useFormatter";

import { OrderUserInTenant } from "../../../../../../types/OrderUserInTenant";
import { OrderStatus } from "../../../../../../types/OrderStatus";

export default function Demand() {
  const api = useApiTenant();
  const formatter = useFormatter();

  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<OrderUserInTenant[]>([])
  const [filteredOrders, setFilteredOrders] = useState<OrderUserInTenant[]>([])
  const [printOrder, setPrintOrder] = useState<OrderUserInTenant | null>(null)

  function handleSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code.toLowerCase() === 'enter') {
      if (searchInput.trim() !== '') {
        let newOrders: OrderUserInTenant[] = [];

        for (let i in orders) {
          if (orders[i].id === searchInput) {
            newOrders.push(orders[i])
          }
        }

        return setFilteredOrders(newOrders)
      }

      setFilteredOrders(orders)
    }
  }

  function handlePrintAction(order: OrderUserInTenant) {
    setPrintOrder(order);

    setTimeout(() => {
      if (window) window.print()
    }, 500)
  }

  async function handleChangeStatus(id: string, newStatus: OrderStatus) {
    await api.changeOrderStatus(id, newStatus);
    getOrders();
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

  useEffect(() => {
    setSearchInput('');
    setFilteredOrders(orders);
  }, [orders])

  return (
    <>
      <Box sx={{ my: 3, displayPrint: 'none' }}>
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
            onChange={e => setSearchInput(e.target.value)}
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
              {filteredOrders && filteredOrders.map((order, key) => (
                <Grid key={key} item xs={1}>
                  <OrderItem
                    order={order}
                    onChangeStatus={handleChangeStatus}
                    onPrint={handlePrintAction}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>

      <Box sx={{ display: 'none', displayPrint: 'block' }}>
        {printOrder && (
          <>
            <Typography component="h5" variant="h5">Pedido</Typography>
            <Box>ID: #{printOrder.id}</Box>
            <Box>Data do pedido: {formatter.formatDateOrdersTenant(printOrder.orderDate)}</Box>
            <Box>Cliente: {printOrder.userName}</Box>

            <Typography component="h5" variant="h5">Pagamento</Typography>
            <Box>Tipo de pagamento: {printOrder.paymentType === 'card' ? 'Cartão' : 'Dinheiro'}</Box>
            <Box>SubTotal: R$ {printOrder.subTotal.toFixed(2)}</Box>
            <Box>Entrega: R$ {printOrder.shippingPrice.toFixed(2)}</Box>
            {printOrder.couponDiscount && <Box>Desconto: -R$ {printOrder.couponDiscount.toFixed(2)}</Box>}
            <Box>Total: R$ {printOrder.total.toFixed(2)}</Box>

            <Typography component="h5" variant="h5">Endereço</Typography>
            <Box>Rua: {printOrder.shippingAddress.street}</Box>
            <Box>Número: {printOrder.shippingAddress.number}</Box>
            <Box>Complemento: {printOrder.shippingAddress.complement}</Box>
            <Box>CEP: {printOrder.shippingAddress.zipcode}</Box>
            <Box>Bairro: {printOrder.shippingAddress.neighborhood}</Box>
            <Box>Cidade: {printOrder.shippingAddress.city}</Box>
            <Box>Estado: {printOrder.shippingAddress.state}</Box>

            <Typography component="h5" variant="h5">Itens</Typography>
            {printOrder.products.map((product, key) => (
              <Box key={key}>
                {product.quantity}x {product.product.name}
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  )
}
