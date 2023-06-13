"use client";
import { useState, useEffect, FormEvent } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { ProductTableSkeleton } from "../../../../../../components/ProductTableSkeleton";
import { ProductTableItem } from "../../../../../../components/ProductTableItem";
import { ProductEditDialog } from "../../../../../../components/ProductEditDialog";

import { useApiTenant } from "../../../../../../hooks/useApi-Tenant";

import { Product } from "../../../../../../types/Product";
import { CategoryProduct } from "../../../../../../types/CategoryProduct";

export default function Categories() {
  const api = useApiTenant();

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<CategoryProduct[]>([])

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productIDDelete, setProductIDDelete] = useState('');

  const [editOrCreateDialogOpen, setEditOrCreateDialogOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>()

  async function getDataApi() {
    try {
      setLoading(true)

      const [productsResponse, categoriesResponse] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ])

      setProducts(productsResponse)
      setCategories(categoriesResponse)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteProduct(id: string) {
    setShowDeleteDialog(true)
    setProductIDDelete(id)
  }

  async function handleConfirmDelete() {
    if (productIDDelete) {
      try {
        setLoadingDelete(true)
        await api.deleteProduct(productIDDelete)
        getDataApi()
      } catch (err) {
        console.log(err)
      } finally {
        setShowDeleteDialog(false)
        setLoadingDelete(false)
      }
    }
  }

  function handleNewProduct() {
    setProductToEdit(null)
    setEditOrCreateDialogOpen(true)
  }

  function handleEditProduct(product: Product) {
    setProductToEdit(product)
    setEditOrCreateDialogOpen(true)
  }

  useEffect(() => {
    getDataApi()
  }, [])

  return (
    <Box sx={{ my: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography component="h5" variant="h5" sx={{ color: '#555', mr: 2 }}>
          Produtos
        </Typography>

        <Button onClick={handleNewProduct}>Novo produto</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 50, display: { xs: 'none', md: 'table-cell' } }}>ID</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Preço</TableCell>
            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Categoria</TableCell>
            <TableCell sx={{ width: { xs: 50, md: 130 } }}>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <>
              <ProductTableSkeleton />
              <ProductTableSkeleton />
              <ProductTableSkeleton />
            </>
          ) : (
            <>
              {products && products.map((product, key) => (
                <ProductTableItem
                  key={key}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>

      {/* Modal para confirmar a deleção de um produto */}
      <Dialog open={showDeleteDialog} onClose={() => !loadingDelete ? setShowDeleteDialog(false) : null}>
        <DialogTitle>Tem certeza que deseja deletar este produto?</DialogTitle>

        <DialogContent>
          <DialogContentText>Não é possível voltar atrás após confirmar esta ação.</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button disabled={loadingDelete} onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
          <Button disabled={loadingDelete} onClick={handleConfirmDelete}>Deletar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para editar e criar um novo produto */}
      <ProductEditDialog
        open={editOrCreateDialogOpen}
        onClose={() => setEditOrCreateDialogOpen(false)}
        product={productToEdit}
        categories={categories}
      />
    </Box>
  )
}
