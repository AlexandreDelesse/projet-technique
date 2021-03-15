<?php

namespace App\Http\Controllers;

use App\Models\File;
use Exception;
use Intervention\Image\Facades\Image;

class FilesController extends Controller
{
    public function store() {
        request()->validate([
            'file' => 'required|image'
        ]);

        $path = request()->file('file')->store('uploads');
        
        if ($path) {
            // Orientate the image
            Image::make('storage/' . $path)
                ->orientate()
                ->save();

            $file = File::create([
                'path' => env('APP_URL') . '/storage/' . $path,
                'original_filename' => request()->file('file')->getClientOriginalName(),
                'size' => request()->file('file')->getSize(),
                'type' => request()->file('file')->extension()
                ]
            );

            return $file;
        }
        throw new Exception('failed to upload file.');
    }
}
