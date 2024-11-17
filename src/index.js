import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from "openai";
import PptxGenJS from "pptxgenjs";
import * as cheerio from 'cheerio';

const openai = new OpenAI({
});

dotenv.config();
const app = express();
const PORT = 5000;



// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// Make sure pdf-parse is installed

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});
app.post('/api/chat', async (req, res) => {
    const { message, nodes, edges } = req.body;

    // Ensure nodes and edges are properly structured
    if (!nodes || !edges) {
        return res.status(400).json({ error: 'Missing nodes or edges' });
    }

    // Construct the prompt
    const graphData = {
        nodes: nodes.map(node => `Node ID: ${node.id}, Name: ${node.name}, Category: ${node.category}, Description: ${node.description}`).join('\n'),
        edges: edges.map(edge => `Edge from ${edge.source} to ${edge.target} labeled: ${edge.label}`).join('\n'),
    };

    const prompt = `
        Answer this finance-related question, given that the user has the following nodes and edges representing their business/product:
        Nodes:
        ${graphData.nodes}

        Edges:
        ${graphData.edges}

        The user's question is: ${message}
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating chat response:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
});
// Chat endpoint to respond to user queries
app.post('/api/chat', async (req, res) => {
    const { message, nodes, edges } = req.body;

    // Ensure nodes and edges are properly structured
    if (!nodes || !edges) {
        return res.status(400).json({ error: 'Missing nodes or edges' });
    }

    // Construct the prompt
    const graphData = {
        nodes: nodes.map(node => `Node ID: ${node.id}, Name: ${node.name}, Category: ${node.category}, Description: ${node.description}`).join('\n'),
        edges: edges.map(edge => `Edge from ${edge.source} to ${edge.target} labeled: ${edge.label}`).join('\n'),
    };

    const prompt = `
        Answer this finance-related question, given that the user has the following nodes and edges representing their business/product:
        Nodes:
        ${graphData.nodes}

        Edges:
        ${graphData.edges}

        The user's question is: ${message}
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating chat response:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
});
// Chat endpoint to respond to user queries
app.post('/api/chatPrompt', async (req, res) => {
    const { message } = req.body;

   


    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating chat response:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
});


async function scrapeFinanceTerminology() {
    try {
        const { data } = await axios.get('https://www.investopedia.com/financial-term-dictionary-4769738'); 
        const $ = cheerio.load(data);
        const terms = [];

        // Extract financial terms and definitions
        $('div.definition').each((index, element) => {
            const term = $(element).find('h3').text();
            const definition = $(element).find('p').text();
            terms.push({ term, definition });
        });

        return terms; // Return array of terms and definitions
    } catch (error) {
        console.error('Error scraping finance data:', error);
        return [];
    }
}

// RAG Finance Chatbot route
app.post("/api/ragFinanceChatbot", async (req, res) => {
    const { query } = req.body;

    // Step 1: Scrape finance terminology
    let scrapedData = await scrapeFinanceTerminology();

    if (!scrapedData || scrapedData.length === 0) {
        return res.status(500).json({ error: 'Failed to scrape finance data.' });
    }

    // Prepare scraped data as a string (to be passed to the GPT model)
    let scrapedText = scrapedData.map(item => `${item.term}: ${item.definition}`).join("\n");

    // Step 2: Create a prompt with the scraped data and user query
    const prompt = `Given the following financial terms and definitions, answer the user's query:

    ${scrapedText}

    User Query: ${query}
    Answer:`;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: query }
            ],
        });

        const response = chatCompletion.choices[0].message.content.trim();
        res.json({ response });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Failed to generate a response.' });
    }
});
app.post("/api/generatePpt", async (req, res) => {
    try {
        const { nodes } = req.body;

        console.log("Received Nodes Data:", nodes); // Log received data

        if (!Array.isArray(nodes)) {
            throw new Error("Invalid input: 'nodes' must be an array.");
        }

        const ppt = new PptxGenJS();

        // Iterate over the nodes to create a slide for each one
        nodes.forEach((node) => {
            console.log("Creating slide for node:", node); // Log each node's title and content

            const pptSlide = ppt.addSlide();
            pptSlide.addText(node.title || "Untitled", {
                x: 0.5,
                y: 0.5,
                fontSize: 24,
                bold: true,
            });
            pptSlide.addText(node.content || "No description available", {
                x: 0.5,
                y: 1.5,
                fontSize: 14,
            });
        });

        const buffer = await ppt.write("arraybuffer");
        res.setHeader("Content-Disposition", "attachment; filename=GeneratedPresentation.pptx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error("Error generating PowerPoint:", error);
        res.status(500).send({ error: "Failed to generate PowerPoint presentation." });
    }
});



// Graph generation endpoint
app.post('/generateGraph', async (req, res) => {
    const { inputText } = req.body;

let prompt = `You are a helpful assistant that generates graph nodes and relationships. Given the input data text, generate an array of nodes and relations. Create edges between nodes that are related and define the label of the edge to define the relationship type. The nodes will contain the following properties: id, name (string), category (string), description (string). The result should be a valid JSON array with the nodes and edges all in a single line with no line breaks, spaces, or additional formatting. The format should be exactly as follows, all on one line: { "nodes": [ { "id": 1, "name": "Node 1", "category": "Category 1", "description": "Description 1" }, { "id": 2, "name": "Node 2", "category": "Category 2", "description": "Description 2" } ], "edges": [ { "source": 1, "target": 2, "label": "Edge 1" } ] }. Do not add any formatting, line breaks, or other formatting styles such as "/n" or "/t". Return only the valid JSON in a single line.`;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: inputText }, { role: 'system', content: prompt }],
        });

        res.json({ response: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating graph:', error);
        res.status(500).json({ 
            error: 'Something went wrong while generating the graph!',
            details: error.message,
        });
    }
});
app.post('/generatePPT', async (req, res) => {
    const { inputText } = req.body;

    let prompt = `You are a helpful assistant that generates graph nodes and relationships. Given the input data text, `;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: inputText }, { role: 'system', content: prompt }],
        });

        res.json({ response: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating graph:', error);
        res.status(500).json({ 
            error: 'Something went wrong while generating the graph!',
            details: error.message,
        });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ 
        error: 'An unexpected error occurred',
        details: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

