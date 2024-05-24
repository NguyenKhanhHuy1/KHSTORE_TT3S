/* eslint-disable @typescript-eslint/no-explicit-any */
export class Product {
  _id?: string;
  productName: string;
  productDescription: string;
  supplierId: string;
  categoryId: string;
  unit: string;
  price: number;
  photo: string;
  Category?: any[];
  Supplier?: any[];
}
