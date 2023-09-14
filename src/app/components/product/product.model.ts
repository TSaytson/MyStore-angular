export interface Product {
  id?: number,
  name: string,
  price: number | null
}

export interface ProductDTO{
  name: string,
  price: number | null
}