require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
// const { extractTextFromFile } = require("./extractText");
const { extractTextFromPdf, summarizeText, textToSpeech, generateGraphicalAbstract, generatePptSlides } = require("./utils/aiUtils");

const app = express();
const upload = multer({ dest: "uploads/" });
const cors = require('cors');

app.use(cors({origin: true, credentials: true}));

app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

app.post("/upload", upload.single("researchPaper"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        console.log("Uploaded File Path:", req.file.path);

        // Extract text from the uploaded research paper
        const ans = await extractTextFromPdf(req.file.path);
        const an2 = await summarizeText(ans);

        // Generate PPT slides
        const pptPath = path.join(__dirname, 'output.pptx');
        const uniquePptPath = await generatePptSlides(an2, 5, pptPath); // Adjust the number of slides as needed

        // Return the summarized text and PPT path
        res.status(200).json({ summary: an2, ppt: uniquePptPath });
    } catch (error) {
        console.error("Error:", error);  // Log the full error
        res.status(500).json({ error: "Something went wrong!", details: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

app.post("/summarize", upload.single("researchPaper"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        console.log("Uploaded File Path:", req.file.path);

        // Extract text from the uploaded research paper
        const ans = await extractTextFromPdf(req.file.path);
        const summary = await summarizeText(ans);

        // Return the summarized text
        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error:", error);  // Log the full error
        res.status(500).json({ error: "Something went wrong!", details: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

app.post("/text-to-audio", upload.single("researchPaper"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        console.log("Uploaded File Path:", req.file.path);

        // Extract text from the uploaded research paper
        const ans = await extractTextFromPdf(req.file.path);
        console.log("Extracted Text:", ans);
        const summary = await summarizeText(ans);
        
        const audioPath = path.join(__dirname, 'output.mp3');
        await textToSpeech(summary, audioPath);

        // Set headers to prompt download
        res.setHeader('Content-Disposition', 'attachment; filename=output.mp3');
        res.setHeader('Content-Type', 'audio/mpeg');

        // Send the audio file as a response
        res.sendFile(audioPath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ error: "Something went wrong!", details: err.message });
            } else {
                console.log("Audio file sent successfully.");
            }
        });
    } catch (error) {
        if (error.code === 'ECONNRESET') {
            console.error("Connection reset by peer:", error);
            res.status(500).json({ error: "Connection reset by peer", details: error.message });
        } else {
            console.error("Error:", error);  // Log the full error
            res.status(500).json({ error: "Something went wrong!", details: error.message });
        }
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

app.post("/generate-ppt", upload.single("researchPaper"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        console.log("Uploaded File Path:", req.file.path);

        // Extract text from the uploaded research paper
        const ans = await extractTextFromPdf(req.file.path);
        const an2 = await summarizeText(ans);

        // Generate PPT slides
        const pptPath = path.join(__dirname, 'output.pptx');
        const uniquePptPath = await generatePptSlides(an2, 5, pptPath); // Adjust the number of slides as needed

        // Return the PPT path
        res.status(200).json({ ppt: uniquePptPath });
    } catch (error) {
        console.error("Error:", error);  // Log the full error
        res.status(500).json({ error: "Something went wrong!", details: error.message });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
});

app.listen(5000, () => {
    console.log("Backend server running on port 5000");
});