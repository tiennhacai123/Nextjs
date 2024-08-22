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
export async function PUT(request: NextRequest, paramrs: { params: { id: string}}){
    const filePath = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(filePath,"utf8"));
    const findIndex = products.findIndex((product:any)=> product.id == +paramrs.params.id);
    if (findIndex !==-1){
        products[findIndex].productName="abcd"
        products[findIndex].image="https://cdn.pixabay.com/photo/2023/08/25/10/33/apples-8212695_1280.jpg"
        products[findIndex].price=20
        products[findIndex].quantity=20
    }
    fs.writeFileSync(filePath, JSON.stringify(products), "utf8");
    return NextResponse.json("thay doi san pham thanh cong")
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
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