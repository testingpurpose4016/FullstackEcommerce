import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { productsTable } from '../../db/productsSchema.js';
import { eq } from 'drizzle-orm';
import _ from 'lodash';

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (e) {
    console.log(e);
    // Return mock data if database is not available
    const mockProducts = [
      {
        id: 1,
        name: 'AirPods Pro',
        description: 'Apple\'s wireless noise-cancelling earbuds with adaptive transparency and spatial audio.',
        image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/airpodspro.jpg',
        price: 249.99
      },
      {
        id: 2,
        name: 'Apple Watch Series 9',
        description: 'Latest smartwatch from Apple featuring always-on retina display and advanced health monitoring.',
        image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/applewatch.jpg',
        price: 399.99
      },
      {
        id: 3,
        name: 'Bose Noise Cancelling Headphones',
        description: 'Premium noise-cancelling over-ear headphones with 20 hours of battery life and voice assistant integration.',
        image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/boseheadphones.jpg',
        price: 349.99
      }
    ];
    res.json(mockProducts);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (e) {
    console.log(e);
    // Return mock data if database is not available
    const mockProducts = [
      {
        id: 1,
        name: 'AirPods Pro',
        description: 'Apple\'s wireless noise-cancelling earbuds with adaptive transparency and spatial audio.',
        image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/airpodspro.jpg',
        price: 249.99
      },
      {
        id: 2,
        name: 'Apple Watch Series 9',
        description: 'Latest smartwatch from Apple featuring always-on retina display and advanced health monitoring.',
        image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/applewatch.jpg',
        price: 399.99
      },
      {
        id: 3,
        name: 'Bose Noise Cancelling Headphones',
        description: 'Premium noise-cancelling over-ear headphones with 20 hours of battery life and voice assistant integration.',
        image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/boseheadphones.jpg',
        price: 349.99
      }
    ];

    const productId = Number(req.params.id);
    const mockProduct = mockProducts.find(p => p.id === productId);

    if (!mockProduct) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.json(mockProduct);
    }
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    console.log(req.userId);

    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product was not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Product was not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
