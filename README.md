# Research Paper Converter -RESEARCH HUB (TEAM SQUADDIE)

## 🚀 Getting Started  

FRONTEND

### Clone the Repository  
```bash
git clone https://github.com/hkpatel321/MINED
cd frontend
npm install 
npm run dev 

BACKEND 
git clone https://github.com/hkpatel321/MINED
cd backend 
node server.js


DESCRIPTION : 

This repository provides a backend solution for extracting text from research papers (PDF format), summarizing it, and converting it into a PowerPoint presentation (PPT). Additionally, the repository generates graphical abstracts (data visualizations) based on extracted research data.

Features:
Text Extraction: Extracts text from PDF files using PyMuPDF.
Summarization: Uses the Gemini Pro AI model to generate a summarized version of the research paper.
Graphical Abstract Generation: Creates data visualizations using Matplotlib (bar charts, graphs).
PowerPoint Creation: Automatically generates a PowerPoint presentation with summarized content and graphical abstracts using python-pptx.
Tools & Libraries Used:
PyMuPDF (fitz): For extracting text from PDFs.
Gemini Pro AI: For text summarization.
Matplotlib: For generating basic graphical abstracts (charts, graphs).
python-pptx: For creating PowerPoint presentations.
Prerequisites
Before running the code, make sure you have the following:

Python 3.x installed on your system.
A Gemini Pro API key for summarization. (Sign up for Gemini Pro to get an API key).
Install the Required Libraries:
You can install all required dependencies using pip. Run the following command:

bash
Copy
Edit
pip install google-generativeai fitz matplotlib python-pptx
Setup & Usage
Step 1: Clone the Repository
Clone this repository to your local machine:



python
Copy
Edit
genai.configure(api_key="YOUR_API_KEY")
Step 3: Prepare Your Research Paper PDF
Ensure that you have a PDF of the research paper you'd like to process. Place the PDF in the same directory as the script or provide the path to it.

Step 4: Run the Script
Run the Python script to generate the PowerPoint presentation and graphical abstract:

bash
Copy
Edit
python generate_ppt.py
Step 5: Output
After running the script, the output will be a PowerPoint (.pptx) file named research_presentation.pptx in the same directory. This PowerPoint file will contain:

A title slide with the paper's title.
A slide with summarized text from the paper.
A slide with the graphical abstract (bar chart representing example data).
You can modify the create_graphical_abstract function to handle different types of data visualizations as per the research paper content.

Example Code Flow
Extract Text: The script extracts the text content from the research paper PDF using PyMuPDF (fitz).
Summarize Text: The text is sent to Gemini Pro to generate a concise summary suitable for a PowerPoint presentation.
Generate Graphical Abstract: The script creates a simple bar chart using Matplotlib to represent example research data (this can be customized).
Create PowerPoint: A PowerPoint presentation is generated using python-pptx, containing the summarized text and graphical abstract.
File Structure
bash
Copy
Edit
research-paper-to-ppt/
│
├── generate_ppt.py           # Main script to process the paper and generate the presentation
├── requirements.txt          # List of required libraries
├── research_paper.pdf        # Example research paper (PDF format)
└── graphical_abstract.png     # Sample graphical abstract (generated automatically)
Contributing
Feel free to contribute by submitting issues or pull requests. If you have any ideas for improving the graphical abstract generation (e.g., more advanced chart types or interactive features), we’d love to hear from you!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For questions or inquiries, feel free to reach out to [Your Name or Contact Information].

Notes:
Make sure to modify the create_graphical_abstract function if you want to use more advanced data visualization tools (e.g., Plotly, Seaborn).
You may want to add error handling for edge cases like empty PDFs, missing text, or data inconsistencies.



✨ Frontend Description
The frontend of our Research Paper Converter platform is designed to provide a seamless and interactive experience for users dealing with research papers. It includes:

1️⃣ Login & Authentication
Users can sign up or log in using Google.
Direct authentication via Google Scholar and research journal platforms for easy access.
2️⃣ Home Page – Smooth Navigation & User Experience
Sleek UI with hover effects and smooth animations.
Active navigation links with visual effects indicating the current page.
Light & Dark Mode toggle for enhanced readability.
3️⃣ Convert Page – Core Functionality
Users can drag & drop research papers into dedicated domain-based sections.
Automatic language detection of the uploaded research paper.
Two output options:
Audio podcast summary for easy listening.
PowerPoint conversion for seamless research presentation.
4️⃣ About Page & Contact Page
About Page lists future enhancements & ideas for expanding the platform.
Contact Page includes a form for user queries & collaborations.
🛠 Technologies Used
Frontend Framework: React.js
Styling: Tailwind CSS
State Management: Context API
Authentication: Firebase Auth (Google Login)
Drag & Drop: React-DnD
Theme Management: React Context (Light/Dark Mode)
📌 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

📄 License
This project is open-source under the MIT License.
