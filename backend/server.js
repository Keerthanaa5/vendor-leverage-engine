
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { executeQuery } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

async function getData(sql, res) {
    try {
        const result = await executeQuery(sql);
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Database query error:", error.message);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// API HOME
app.get("/", (req, res) => {
    res.json({
        message: "Vendor-Leverage Engine API running"
    });
});

// DATABASE HEALTH
app.get("/api/health", async (req, res) => {
    await getData(
        "SELECT 1 AS STATUS FROM DUAL",
        res
    );
});

// EXECUTIVE SUMMARY
app.get("/api/summary", async (req, res) => {
    await getData(
        "SELECT * FROM VENDOR_LEVERAGE.FINAL_NEGOTIATION_REPORT",
        res
    );
});

// HOURLY USAGE
app.get("/api/usage/hourly", async (req, res) => {
    await getData(
        "SELECT * FROM VENDOR_LEVERAGE.CPU_USAGE_HOURLY_V3 ORDER BY USAGE_DATE, USAGE_HOUR LIMIT 100",
        res
    );
});

// DAILY USAGE
app.get("/api/usage/daily", async (req, res) => {
    await getData(
        "SELECT * FROM VENDOR_LEVERAGE.DAILY_USAGE_COMPLETE ORDER BY USAGE_DATE",
        res
    );
});

// FORECAST
app.get("/api/forecast", async (req, res) => {
    await getData(
        "SELECT * FROM VENDOR_LEVERAGE.FORECAST_7D ORDER BY FORECAST_DATE",
        res
    );
});

// BACKTEST
app.get("/api/backtest", async (req, res) => {
    await getData(
        "SELECT * FROM VENDOR_LEVERAGE.BACKTEST_7D",
        res
    );
});

// COMMITMENT OPTIMIZATION
app.get("/api/optimization", async (req, res) => {
    await getData(
        "SELECT * FROM VENDOR_LEVERAGE.COMMITMENT_OPTIMIZATION",
        res
    );
});

// NEGOTIATION RESULTS
app.get("/api/negotiation", async (req, res) => {
    await getData(
        "SELECT * FROM VENDOR_LEVERAGE.NEGOTIATION_RESULTS",
        res
    );
});

// SERVER
const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `Vendor-Leverage API running at http://localhost:${PORT}`
    );
});
