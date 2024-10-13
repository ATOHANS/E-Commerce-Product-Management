<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all());
    }

    public function store(Request $request)
    {
        // Validate the incoming request to ensure all required fields are present
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',     // Add 'name' as a required field
            'barcode' => 'required|string|unique:products',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category' => 'required|string',
        ]);

        // Create a new product using the validated data
        $product = Product::create($validatedData);
        return response()->json($product, 201);
    }

    public function show($id)
    {
        return response()->json(Product::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request for update
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'barcode' => 'sometimes|required|string|unique:products,barcode,' . $id,
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'quantity' => 'sometimes|required|integer',
            'category' => 'sometimes|required|string',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validatedData);
        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(null, 204);
    }
}
