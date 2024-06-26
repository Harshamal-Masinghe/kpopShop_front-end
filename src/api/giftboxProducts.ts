import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get<Product[]>('http://localhost:8080/products/giftbox-products');
    const giftBoxProducts = response.data;
    res.status(200).json(giftBoxProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gift box products' });
  }
};

interface Product {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;

}