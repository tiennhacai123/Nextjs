import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import fs from 'fs'
import path from 'path'
interface Product{
    id:number,
    productName:string,
    image:string,
    price:number,
    quantity:number
}
export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
          const filePath = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    
    let find = products.find((item:any)=>{
        return item.id == +params.id
    })
    return NextResponse.json(find);  
    } catch (error) {
    return NextResponse.json(`Khong tim thay san pham co id la ${params.id}`)
    }

}
export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    try {
      const filePath = path.join(process.cwd(), 'database', 'products.json');
      const products: Product[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const updatedProduct = await request.json();
      const findIndex = products.findIndex(product => product.id === +params.id);
      if (findIndex !== -1) {
        products[findIndex] = { ...products[findIndex], ...updatedProduct };
        
        // Ghi lại vào file
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
        return NextResponse.json("Cập nhật sản phẩm thành công");
      } else {
        return NextResponse.json("Không tìm thấy sản phẩm", { status: 404 });
      }
    } catch (error) {
      return NextResponse.json("Đã xảy ra lỗi khi cập nhật sản phẩm", { status: 500 });
    }
  }

export async function DELETE(request: NextRequest, { params }: { params: { id: number }}) {
    const filePath = path.join(process.cwd(), 'database', 'products.json');
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const findIndex = products.findIndex((product: any) => product.id === +params.id);
    if (findIndex !== -1) {
        products.splice(findIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
        return NextResponse.json("Xoa phan tu thanh cong");
    } else {
        return NextResponse.json("Xoa phan tu khong thanh cong");
    }
}