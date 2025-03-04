const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Autorise toutes les origines
    },
});

let sections = []

async function middlewareSection(req, res, next) {
    const sectionId = req.header("X-Section-Id");
    const section = sections.find((s) => s.id === sectionId);
    if (!section) {
        return res.status(404).json({error: "Section non trouvée"});
    }
    res.locals.section = section;
    next();
}

async function getTickerData(ticker, period, interval) {
    try {
        const response = await axios.get(
            `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=${interval}&range=${period}`
        )

        const data = []

        for (let i = 0; i < response.data.chart.result[0].timestamp.length; i++) {
            data.push({
                timestamp: new Date(response.data.chart.result[0].timestamp[i]),
                open: response.data.chart.result[0].indicators.quote[0].open[i],
                high: response.data.chart.result[0].indicators.quote[0].high[i],
                low: response.data.chart.result[0].indicators.quote[0].low[i],
                close: response.data.chart.result[0].indicators.quote[0].close[i],
                volume: response.data.chart.result[0].indicators.quote[0].volume[i],
            })
        }

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Gestion des connexions Socket.IO
io.on("connection", (socket) => {
    console.log("Client connecté :", socket.id);
    let sectionId = socket.handshake.auth.sectionId;

    if (sectionId) {
        const section = sections.find((s) => s.id === sectionId);
        if (section) {
            section.users.push({id: socket.id});
        } else {
            socket.disconnect();
        }
    } else {
        socket.disconnect();
    }

    socket.on("disconnect", () => {
        console.log("Client déconnecté :", socket.id);
        sections.forEach((section) => {
            const userIndex = section.users.findIndex((u) => u.id === socket.id);
            if (userIndex !== -1) {
                section.users.splice(userIndex, 1);
            }
        });
    });
});


app.get(middlewareSection, "/api/tickers/:ticker", async (req, res) => {
    try {
        const {ticker} = req.params;
        const {interval, period} = req.query;

        if (!interval || !period) {
            return res.status(400).json({error: "Paramètres manquants"});
        }

        for (const user of res.locals.section.users) {
            io.to(user.id).emit("get-ticker", {ticker, interval, period});
        }

        const data = await getTickerData(ticker, period, interval)

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Erreur serveur"});
    }
});


app.post(middlewareSection, "/api/actions", async (req, res) => {
    const {action, ticker, quantity, timestamp, interval, period} = req.body;
    if (!action || !ticker || !quantity || !timestamp) {
        return res.status(400).json({error: "Paramètres manquants"});
    }

    let tickerData = (await getTickerData(ticker, period, interval)).find((elem) => elem.timestamp === timestamp);

    if (!tickerData)
        return res.status(400).json({error: "Timestamp not found"});

    


    for (const user of res.locals.section.users) {
        io.to(user.id).emit("post-action", {action, ticker, quantity, funds: res.locals.section.fund});
    }

    res.json({message: "Action envoyée", funds: res.locals.section.fund});
});

app.post("/api/sessions", (req, res) => {
    const {name, fund} = req.body;
    const id = crypto.randomUUID();
    const session = {
        id: id, name, users: [], fund: [
            {currency: "USD", quantity: fund, ticker: "USD"},
        ]
    };
    sections.push(session);
    res.json(session);
});

app.get("/api/sessions/:id", (req, res) => {
    const section = sections.find((s) => s.id === req.params.id);
    if (!section) {
        return res.status(404).json({error: "Section non trouvée"});
    }
    res.json(section);
});


// Démarrer le serveur WebSocket
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`✅ Serveur WebSocket démarré sur le port ${PORT}`);
});