import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

interface AddProductFormProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function AddProductForm({ products, setProducts }: AddProductFormProps) {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let message = '';
    if (!productName.trim()) {
      message = "Tên sản phẩm không được để trống.";
      valid = false;
    } else if (!image.trim()) {
      message = "Hình ảnh không được để trống.";
      valid = false;
    } else if (
      parseInt(price, 10) <= 0 ||
      isNaN(parseInt(price, 10))
    ) {
      message = "Giá phải lớn hơn 0 và không được để trống.";
      valid = false;
    } else if (
      parseInt(quantity, 10) <= 0 ||
      isNaN(parseInt(quantity, 10))
    ) {
      message = "Số lượng phải lớn hơn 0 và không được để trống.";
      valid = false;
    }
    if (!valid) {
      setError(message);
      return;
    }
    try {
      const randomId = Math.floor(Math.random() * 1000000);

      const newProduct: Product = {
        id: randomId,
        productName,
        image,
        price: Number(price),
        quantity: Number(quantity),
      };
      await axios.post('http://localhost:3000/api/products', newProduct);
      setProducts([...products, newProduct]);
      setProductName('');
      setImage('');
      setPrice('');
      setQuantity('');
      setError('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Tên Sản Phẩm
          </label>
          <input
            type="text"
            id="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Hình Ảnh (URL)
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Giá
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Số Lượng
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Thêm Sản Phẩm
        </button>
      </form>
    </div>
  );
}
