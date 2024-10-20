<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // View all products (with search and filter functionality)
    public function index(Request $request)
    {
        $products = Product::all();  // Fetch all products from the 'products' table
        return response()->json($products);
    }

    // Add a new product
    public function store(Request $request)
    {
        $validated = $request->validate([
            'barcode' => 'required|unique:products|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category' => 'required|string',
        ]);

        $product = Product::create($validated);

        return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);
    }

    // Edit an existing product
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'description' => 'string',
            'price' => 'numeric',
            'quantity' => 'integer',
            'category' => 'string',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
