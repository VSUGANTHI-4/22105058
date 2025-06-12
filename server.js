const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

const windowState = {
    'p': [],
    'f': [],
    'e': [],
    'r': []
};

const API_URLS = {
    'p': 'http://20.244.56.144/evaluation-service/primes',
    'f': 'http://20.244.56.144/evaluation-service/fibo',
    'e': 'http://20.244.56.144/evaluation-service/even',
    'r': 'http://20.244.56.144/evaluation-service/rand'
};

async function fetchNumbers(url) {
    try {
        const response = await axios.get(url, { timeout: TIMEOUT });
        return response.data.numbers || [];
    } catch (error) {
        return [];
    }
}

function getUniqueMergedArray(current, incoming) {
    const set = new Set(current);
    for (let num of incoming) {
        set.add(num);
    }
    return Array.from(set);
}

function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return parseFloat((sum / arr.length).toFixed(2));
}

app.get('/numbers/:id', async (req, res) => {
    const id = req.params.id;

    if (!['p', 'f', 'e', 'r'].includes(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const prevWindow = [...windowState[id]];
    const newNumbers = await fetchNumbers(API_URLS[id]);

    let merged = getUniqueMergedArray(prevWindow, newNumbers);

    if (merged.length > WINDOW_SIZE) {
        merged = merged.slice(merged.length - WINDOW_SIZE);
    }

    windowState[id] = merged;

    res.json({
        windowPrevState: prevWindow,
        windowCurrState: merged,
        numbers: newNumbers,
        avg: calculateAverage(merged)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
