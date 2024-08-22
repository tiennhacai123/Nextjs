import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import fs from 'fs'
import path from 'path'
export async function GET(req:NextRequest, res:NextResponse) {
    try {
        const filePath = path.join(process.cwd(),"database", "products.json");
        const data = fs.readFileSync(filePath, "utf8")
        const products = JSON.parse(data);
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function POST(request:NextRequest, response:NextResponse) {
    try {
        const productRequest = await request.json();
        const filePath = path.join(process.cwd(),"database", "products.json");
        const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
        products.push(productRequest);
        fs.writeFileSync(filePath, JSON.stringify(products), "utf8");
        return NextResponse.json({message:"them san pham thanh cong", productRequest})
    } catch (error) {
        return NextResponse.json("them san pham that bai")
    }
}