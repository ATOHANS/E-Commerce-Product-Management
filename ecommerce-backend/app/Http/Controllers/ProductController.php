<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // View all products (with search and filter functionality)
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('search')) {
            $query->where('description', 'like', '%' . $request->search . '%');
        }

        $products = $query->get();

        return response()->json($products);
    }

    // Get a specific product by ID
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json($product);
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
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'quantity' => 'nullable|integer',
            'category' => 'nullable|string',
        ]);

        $product->update(array_filter($validated));

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
