# Rice Leaf Disease Classification (ResNet18 + SVM)

**Overview:**  
This project classifies rice leaf diseases using ResNet18 CNN enhanced with an SVM-style margin loss for stronger class separation on small datasets. It improves accuracy while maintaining practical runtime.

**Dataset & Preprocessing:**  
- Stratified splits: 20:80, 50:50, 30:70  
- Image augmentation: rotation, flips, color jitter, grayscale, ImageNet normalization  

**Performance:**  
- 20:80 split at 20 epochs: F1 = 90% (baseline: 88%)  
- Efficient and accurate class separation  

**Setup & Usage:**  
1. Clone repository:  
   ```bash
   git clone <repo-url>
   cd rice_leaf_disease_project
Create & activate virtual environment:

bash
Copy code
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # Linux/macOS
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run backend:

bash
Copy code
python app.py
Open classify.php in XAMPP, upload images, select model/epoch, and view predictions.
