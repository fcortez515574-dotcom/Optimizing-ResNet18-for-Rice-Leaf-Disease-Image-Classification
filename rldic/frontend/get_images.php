<?php
// get_images.php

// Folder filter (e.g., 'Brown Spot', 'Blast', etc.)
$folder = $_GET['folder'] ?? '';

// Absolute path to the image dataset
$baseDir   = __DIR__ . "/images/test_samples";
$targetDir = $folder ? "$baseDir/$folder" : $baseDir;

// Web path base (used to serve images in <img>)
$webPath = "images/test_samples" . ($folder ? "/$folder" : "");

$images   = [];

if (is_dir($targetDir)) {
    // Filter image files (jpg, jpeg, png)
    $files = array_filter(scandir($targetDir), function ($file) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        return in_array($ext, ['jpg', 'jpeg', 'png']);
    });

    // Sort by the same order as in the folder (e.g., by file modification time)
    usort($files, function($a, $b) use ($targetDir) {
        $mtimeA = filemtime("$targetDir/$a");
        $mtimeB = filemtime("$targetDir/$b");
        // Ascending order: older files first
        return $mtimeA <=> $mtimeB;
    });

    // Pagination setup
    $page       = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
    $perPage    = 12;
    $total      = count($files);
    $totalPages = ceil($total / $perPage);

    // Slice for current page
    $paginated = array_slice($files, ($page - 1) * $perPage, $perPage);

    // Build image URLs
    foreach ($paginated as $file) {
        $images[] = "$webPath/$file";
    }

    echo json_encode([
        'images'      => $images,
        'page'        => $page,
        'total_pages' => $totalPages
    ]);
} else {
    echo json_encode([
        'images'      => [],
        'page'        => 1,
        'total_pages' => 1
    ]);
}
