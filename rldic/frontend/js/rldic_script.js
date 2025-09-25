let selectedImageFile = null;
let currentFolder = '';
let currentPage = 1;

// ----- Result Reset Helper -----
function resetResults() {
    document.getElementById("baseline-label").innerText = "-";
    document.getElementById("baseline-accuracy").innerText = "-";
    document.getElementById("baseline-confidence").innerText = "-";
    document.getElementById("baseline-time").innerText = "-";

    document.getElementById("proposed-label").innerText = "-";
    document.getElementById("proposed-accuracy").innerText = "-";
    document.getElementById("proposed-confidence").innerText = "-";
    document.getElementById("proposed-time").innerText = "-";
}

// Load images from PHP backend
async function loadImages(folder, page = 1) {
    currentFolder = folder;
    currentPage = page;
    const gallery = document.getElementById("image-gallery");
    gallery.innerHTML = '';

    try {
        const res = await fetch(`get_images.php?folder=${encodeURIComponent(folder)}&page=${page}`);
        const data = await res.json();

        data.images.forEach(imgPath => {
            const img = document.createElement("img");
            img.classList.add("test-image");
            img.src = imgPath;
            img.alt = "Sample Image";

            img.addEventListener("click", () => {
                document.getElementById("selected-image").src = img.src;
                resetResults();

                // Convert displayed image into File object for backend
                fetch(img.src)
                    .then(r => r.blob())
                    .then(blob => {
                        selectedImageFile = new File([blob], "selected_image.jpg", { type: blob.type });
                        console.log("[Selected ImageFile]", selectedImageFile);
                    });
            });

            gallery.appendChild(img);
        });

        updatePaginationControls(data.page, data.total_pages);

    } catch (err) {
        console.error("❌ Failed to load images:", err);
        alert("Failed to load images. Check get_images.php or server response.");
    }
}

// Pagination UI
function updatePaginationControls(page, totalPages) {
    const pagination = document.getElementById("pagination-controls");
    pagination.innerHTML = '';

    if (page > 1) {
        const prev = document.createElement("button");
        prev.innerText = "← Prev";
        prev.onclick = () => loadImages(currentFolder, page - 1);
        pagination.appendChild(prev);
    }

    if (page < totalPages) {
        const next = document.createElement("button");
        next.innerText = "Next ➡";
        next.onclick = () => loadImages(currentFolder, page + 1);
        pagination.appendChild(next);
    }
}

// Predict image
document.getElementById("predict-btn").onclick = async () => {
    // 1) Validate
    if (!selectedImageFile) {
        return alert("❌ Please select an image from the gallery.");
    }
    const selectedEpoch = document.getElementById("epoch-select").value;
    if (!selectedEpoch) {
        return alert("❌ Please select an epoch value (5, 10, 15, or 20).");
    }

    // 2) Build form data
    const formData = new FormData();
    formData.append("image", selectedImageFile);
    formData.append("epoch", selectedEpoch);

    try {
        // 3) Send request
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("[API ERROR RESPONSE]", errorText);
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        // 4) Parse JSON
        const data = await response.json();
        console.log("🚀 /predict data:", data);

        // 5) Helper to avoid undefined/null
        const txt = v => (v === null || v === undefined) ? "-" : v;

        // --- BASELINE CARD ---
        const b = data.baseline || {};
        document.getElementById("baseline-label").innerText = txt(b.label);
        document.getElementById("baseline-accuracy").innerText =
            (typeof b.accuracy === "number" ? b.accuracy.toFixed(2) + "%" : "-");
        document.getElementById("baseline-confidence").innerText =
            (typeof b.confidence === "number" ? b.confidence.toFixed(2) + "%" : "-");
        document.getElementById("baseline-time").innerText =
            (typeof b.time === "number" ? b.time.toFixed(2) + " ms" : "-");

        // --- PROPOSED CARD ---
        const p = data.proposed || {};
        document.getElementById("proposed-label").innerText = txt(p.label);
        document.getElementById("proposed-accuracy").innerText =
            (typeof p.accuracy === "number" ? p.accuracy.toFixed(2) + "%" : "-");
        document.getElementById("proposed-confidence").innerText =
            (typeof p.confidence === "number" ? p.confidence.toFixed(2) + "%" : "-");
        document.getElementById("proposed-time").innerText =
            (typeof p.time === "number" ? p.time.toFixed(2) + " ms" : "-");

    } catch (error) {
        console.error("❌ Prediction failed:", error);
        alert(error.message);
    }
};

// Filter gallery by class
function filterImages(diseaseClass) {
    loadImages(diseaseClass);
}

function resetImageFilter() {
    loadImages('');
}

// Run result reset on initial page load
window.addEventListener('DOMContentLoaded', () => {
    resetResults();
    loadImages('');  // initial load
});
