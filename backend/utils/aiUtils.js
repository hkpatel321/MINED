const pdf = require('pdf-parse');
const gTTS = require('gtts');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const pptxgen = require('pptxgenjs');

exports.extractTextFromPdf = async (pdfPath) => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    console.log(data.text);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
};

exports.summarizeText = async (text) => {
  try {
    if (typeof text !== 'string') {
      text = String(text);
    }
    console.log('Original text:', text);
    const formattedText = text.replace(/\s+/g, ' ').trim();
    console.log('Formatted text:', formattedText);

    const { pipeline } = await import('@xenova/transformers');
    const summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
    const summary = await summarizer(formattedText, { max_length: 1500, min_length: 500, do_sample: false });
    console.log('Summary:', summary);
    return summary[0].summary_text;
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
};

exports.textToSpeech = (text, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const tts = new gTTS(text, 'en');
      const stream = tts.stream();
      const writer = fs.createWriteStream(outputPath);
      stream.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', (error) => {
        console.error('Error writing audio file:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error converting text to speech:', error);
      reject(error);
    }
  });
};

exports.generateGraphicalAbstract = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', // Using Hugging Face API for Stable Diffusion
      {
        inputs: prompt
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Replace with your Hugging Face API key
          'Content-Type': 'application/json'
        },
      }
    );
    console.log('Graphical Abstract Response:', response.data);

    // Check if the response contains the expected data
    if (response.data && response.data.length > 0 && response.data[0].generated_image_url) {
      const imageUrl = response.data[0].generated_image_url;
      console.log('Generated Image URL:', imageUrl);
      return imageUrl;
    } else {
      throw new Error('Invalid response format from Hugging Face API');
    }
  } catch (error) {
    console.error('Error generating graphical abstract:', error);
    throw error;
  }
};
exports.generatePptSlides = async (text, numSlides, outputPath) => {
  try {
    const pptx = new pptxgen();
    const lines = text.split('. ');
    const linesPerSlide = Math.ceil(lines.length / numSlides);

    for (let i = 0; i < numSlides; i++) {
      const slide = pptx.addSlide();
      const slideText = lines.slice(i * linesPerSlide, (i + 1) * linesPerSlide).join('. ');

      slide.addText(slideText, {
        x: 0.5, y: 0.5, w: '90%', h: '50%',
        fontSize: 18, color: '363636', align: pptx.AlignH.left
      });

      // Add an image to each slide (valid image URL)
      // slide.addImage({ path: 'https://www.example.com/valid-image.png', x: 0.5, y: 3.5, w: 8, h: 4 });
    }

    const uniqueOutputPath = outputPath.replace('.pptx', `_${Date.now()}.pptx`);
    await pptx.writeFile({ fileName: uniqueOutputPath });
    console.log('PPT slides generated successfully:', uniqueOutputPath);
    return uniqueOutputPath;
  } catch (error) {
    console.error('Error generating PPT slides:', error);
    throw error;
  }
};