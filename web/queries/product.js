
export const PRODUCT_QUERY = `
query add($title: String!, ) {
  productCreate(input: $input) {
    product {
      id
    }
  }
}
`