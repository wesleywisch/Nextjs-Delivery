export function useFormatter() {
  return {
    formatPrice: (price: number) => {
      return price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
      });
    },
    formatQuantity: (quantity: number, minDigits: number) => {
      if (quantity.toString().length >= minDigits) {
        return quantity;
      }
      const remain = minDigits - quantity.toString().length;
      return `${'0'.repeat(remain)}${quantity}`;
    }
  }
}