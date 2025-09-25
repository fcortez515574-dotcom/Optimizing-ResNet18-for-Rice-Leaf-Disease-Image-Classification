<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>🌿Rice Leaf Disease Image Classifier</title>
    <link rel="stylesheet" href="css/rldic_style.css">
</head>
<body>
    <div class="sidebar">
        <h2 onclick="resetImageFilter()">🌱RLDIC</h2>
        <ul>
            <li onclick="filterImages('Bacterial Blight')">📁Bacterial Blight</li>
            <li onclick="filterImages('Blast')">📁Blast</li>
            <li onclick="filterImages('Brown Spot')">📁Brown Spot</li>
            <li onclick="filterImages('Healthy')">📁Healthy</li>
            <li onclick="filterImages('Tungro')">📁Tungro</li>
            <li onclick="filterImages('Unrelated')">📁Unrelated</li>
        </ul>
    </div>

    <div class="main">
        <h1>🌿Rice Leaf Disease Image Classifier</h1>

        <!-- ⭐ Dynamic Image Gallery + Pagination -->
        <div class="gallery-scroll">
            <div id="image-gallery" class="gallery"></div>
            <div id="pagination-controls" class="pagination"></div>
        </div>

        <!-- ⭐ Epoch Selection and Predict Button -->
        <div class="controls">
            <select id="epoch-select">
                <option value="" disabled selected>-- Select Epoch --</option>
                <option value="5">5 Epochs</option>
                <option value="10">10 Epochs</option>
                <option value="15">15 Epochs</option>
                <option value="20">20 Epochs</option>
            </select>
            <button id="predict-btn">Predict The Disease</button>
        </div>

        <!-- ⭐ Selected Image Preview -->
        <div class="selected-image-preview">
            <img id="selected-image" src="" alt="Selected Image" />
        </div>

        <!-- ⭐ Prediction Results -->
        <div class="results">
            <div class="model-result">
                <h2>BASELINE MODEL</h2>
                <p>Predicted Label: <span id="baseline-label">-</span></p>
                <p>Model's Accuracy Rate: <span id="baseline-accuracy">-</span></p>
                <p>Model's Confidence Rate: <span id="baseline-confidence">-</span></p>
                <p>Inference Time: <span id="baseline-time">-</span></p>
            </div>

            <div class="model-result">
                <h2>PROPOSED MODEL</h2>
                <p>Predicted Label: <span id="proposed-label">-</span></p>
                <p>Model's Accuracy Rate: <span id="proposed-accuracy">-</span></p>
                <p>Model's Confidence Rate: <span id="proposed-confidence">-</span></p>
                <p>Inference Time: <span id="proposed-time">-</span></p>
            </div>
        </div>
    </div>

<script src="js/rldic_script.js?v=1234"></script>
</body>
</html>
