'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ConfirmationModal from '../components/Delete';
import AddProductForm from '../components/AddProductForm';
import UpdateProductModal from '../components/UpdateProductModal';

interface Product {
  id: number;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error( error);
      });
  }, []);

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      axios.delete(`http://localhost:3000/api/products/${productToDelete}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== productToDelete));
          setProductToDelete(null);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setShowDeleteModal(false);
        });
    }
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setIsUpdateModalOpen(true);
  };
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <div className="items-center min-h-full bg-gray-100">
        <b>Danh sách quản lý sản phẩm</b>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">STT</th>
              <th className="py-3 px-6 text-left">Tên sản phẩm</th>
              <th className="py-3 px-6 text-left">Hình ảnh</th>
              <th className="py-3 px-6 text-left">Giá</th>
              <th className="py-3 px-6 text-left">Số lượng</th>
              <th className="py-3 px-6 text-left">Chức năng</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item.productName}</td>
                <td className="py-3 px-6 text-left">
                  <img src={item.image} alt={item.productName} className="w-17 h-16 object-cover" />
                </td>
                <td className="py-3 px-6 text-left">{item.price}.000 VNĐ</td>
                <td className="py-3 px-6 text-left">{item.quantity}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          message="Bạn có chắc chắn muốn xóa sản phẩm này không?"
        />
      </div>

      <div className="bg-gray-100 items-center">
        <br />
        <AddProductForm products={products} setProducts={setProducts} />
      </div>

      {/* Update Product Modal */}
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={productToEdit}
        onUpdate={handleUpdateProduct}
      />
    </>
  );
}
