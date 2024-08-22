import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdate: (updatedProduct: Product) => void;
}

export default function UpdateProductModal({ isOpen, onClose, product, onUpdate }: UpdateProductModalProps) {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setImage(product.image);
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
    }
  }, [product]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      productName,
      image,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      await axios.put(`http://localhost:3000/api/products/${product.id}`, updatedProduct);
      onUpdate(updatedProduct);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Cập Nhật Sản Phẩm</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
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
              required
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
              required
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
              required
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
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black font-bold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
