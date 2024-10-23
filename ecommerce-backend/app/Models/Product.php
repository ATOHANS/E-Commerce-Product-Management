<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory; // Make sure this line is included

    protected $fillable = [
        'barcode',
        'description',
        'price',
        'quantity',
        'category',
    ];
}
