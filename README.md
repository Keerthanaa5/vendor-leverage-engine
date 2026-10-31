# Vendor-Leverage Engine
### AI-Powered Analytics Platform for Smarter Vendor Contract Negotiations
Exasol-powered Vendor-Leverage Engine for usage forecasting, contract optimization and negotiation intelligence

**Turn historical cloud usage data into actionable vendor negotiation intelligence.**

Vendor-Leverage Engine is an analytics platform designed to help organizations understand their resource consumption, forecast future demand, simulate vendor pricing contracts, and identify cost-effective commitment strategies.

By combining historical usage analytics, forecasting, contract simulation and constrained cost optimization, the platform helps data platform teams make evidence-based vendor negotiation decisions.

---

## 1. Problem Statement

Organizations using cloud analytics and data platforms often struggle to negotiate cost-effective vendor contracts because they lack:

- Clear visibility into historical resource consumption.
- Reliable estimates of future resource requirements.
- Comparisons between different vendor pricing models.
- Evidence to determine whether committed usage agreements are financially beneficial.
- A data-driven basis for negotiating fixed commitment fees.

Without usage intelligence, organizations risk overcommitting, underutilizing resources or paying unnecessarily high costs.

## 2. Our Solution

Vendor-Leverage Engine transforms historical resource usage into actionable financial insights.

The platform:

1. Analyzes historical CPU consumption.
2. Calculates daily and hourly usage patterns.
3. Forecasts resource demand for the next seven days.
4. Evaluates forecast accuracy through backtesting.
5. Simulates different vendor pricing contracts.
6. Tests multiple commitment fee scenarios.
7. Identifies potential savings and break-even negotiation thresholds.

## 3. Key Features

### Overview Dashboard
- Total estimated CPU hours.
- Discounted contract cost.
- Potential savings.
- Break-even commitment fee.
- Executive negotiation insights.

### Usage Analytics
- Historical daily CPU consumption.
- Hourly resource usage.
- Usage statistics and records.
- Database-driven visualizations.

### Demand Forecasting
- Seven-day resource demand forecast.
- Upper and lower prediction bounds.
- Historical forecast validation.
- MAE and MAPE evaluation metrics.

### Contract Simulator
- Interactive commitment fee adjustment.
- Pay-as-you-go cost comparison.
- Discounted pricing simulation.
- Committed contract cost estimation.

### Commitment Optimization
- Multiple commitment fee scenarios.
- Cost comparison across scenarios.
- Identification of the lowest tested cost.
- Potential savings analysis.

### Negotiation Intelligence
- Break-even fixed fee calculation.
- Contract cost comparison.
- Negotiation recommendations.
- Evidence-based vendor negotiation insights.

## 4. System Architecture

```text
Historical Usage Dataset
          |
          v
      Exasol Database
          |
          v
     SQL Analytics
          |
          v
  Node.js / Express API
          |
          v
      React Frontend
          |
          v
   Interactive Dashboard
          |
          v
 Vendor Negotiation Insights
```

Exasol handles analytical data storage and SQL-based computations. The Node.js backend exposes the results through REST APIs, while the React frontend presents them through interactive dashboards.

## 5. Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | Exasol |
| Data Analytics | SQL |
| Visualization | Recharts |
| Icons | Lucide React |
| Data Processing | Python, Pandas, NumPy |
| Version Control | Git, GitHub |

## 6. Dataset

**Source:** Google Cluster Usage Trace

Dataset reference: https://zenodo.org/records/6979672

The project uses a sample of historical cluster CPU usage records.

| Dataset Metric | Value |
|---|---:|
| Total raw records | 25,059 |
| Complete historical days | 28 |
| Estimated CPU hours | 620.57 |
| Average daily CPU hours | 21.31 |

CPU hours are estimated from the sampled CPU usage measurements and sampling interval. They should be treated as an analytical usage proxy, not verified vendor-billed consumption.

## 7. Pricing Model and Assumptions

The project evaluates three illustrative pricing approaches:

| Pricing Model | Assumption |
|---|---|
| Pay-as-you-go | Base rate of 0.10 per CPU hour |
| Discounted plan | 20% discount |
| Committed plan | 40% discount plus fixed commitment fee |

The platform evaluates commitment fees against historical usage and calculates the break-even threshold.

**Note:** These pricing parameters are illustrative simulation assumptions and are not actual vendor quotations.

## 8. Forecasting and Model Validation

The current forecasting implementation uses historical daily average usage to estimate future demand.

The model generates:
- Seven-day demand estimates.
- Upper and lower prediction bounds.
- Mean Absolute Error (MAE).
- Mean Absolute Percentage Error (MAPE).
- Prediction interval coverage.

A seven-day holdout period is used for backtesting.

The current results are based on a limited historical sample and should not be interpreted as guaranteed future demand.

## 9. Project Results

Current analytical results:

| Metric | Result |
|---|---:|
| Estimated CPU Hours | 620.57 |
| Average Daily Usage | 21.31 |
| Discounted Cost | 49.65 |
| Committed Cost at Fixed Fee 10 | 47.23 |
| Potential Savings | 2.41 |
| Break-even Fixed Fee | 12.41 |
| Backtesting MAPE | 27.21% |
| Forecast Interval Coverage | 85.71% |

The results demonstrate how usage history and contract simulation can support more informed pricing discussions.

All monetary figures are modeled cost units under the illustrative pricing assumptions.

## 10. Getting Started

### Prerequisites

Install the following:

- Node.js and npm.
- Git.
- Exasol Starter Kit.
- Podman and WSL2, as required by the Exasol setup.

### Clone the Repository

```bash
git clone https://github.com/Keerthanaa5/vendor-leverage-engine.git

cd vendor-leverage-engine
```

### Configure Exasol

Start your Exasol Starter Kit and verify that the database is reachable.

The backend currently uses the Exasol `starter-kit` profile through the Exapump CLI.

Configure the profile locally with your Exasol connection details. Do not commit passwords or credentials to GitHub.

### Start the Backend

```bash
cd backend

npm install

node server.js
```

Backend URL:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Open the local Vite URL displayed in your terminal, typically:

```text
http://localhost:5173
```

## 11. API Endpoints

| Endpoint | Description |
|---|---|
| `GET /` | API status |
| `GET /api/health` | Database connectivity test |
| `GET /api/summary` | Executive summary |
| `GET /api/usage/hourly` | Hourly usage records |
| `GET /api/usage/daily` | Daily usage records |
| `GET /api/forecast` | Seven-day forecast |
| `GET /api/backtest` | Forecast validation |
| `GET /api/optimization` | Commitment fee optimization |
| `GET /api/negotiation` | Negotiation results |

## 12. Future Enhancements

- Advanced time-series forecasting models.
- Seasonality-aware demand prediction.
- Confidence interval calibration.
- Multi-vendor pricing comparisons.
- Automated contract recommendation engine.
- Real-time usage monitoring.
- Exportable negotiation reports.
- Integration with additional cloud analytics platforms.

## 13. Business Impact

Vendor-Leverage Engine aims to help organizations:

- Reduce unnecessary analytics infrastructure expenditure.
- Improve contract transparency.
- Understand resource demand patterns.
- Identify economically viable commitment levels.
- Strengthen vendor negotiations using historical evidence.

## 14. Repository Structure

```text
vendor-leverage-engine/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md

## 15. Getting Started – Run Locally

Follow these steps to set up and run Vendor-Leverage Engine on your local machine.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) (LTS version)
- [Git](https://git-scm.com/)
- [Exasol](https://www.exasol.com/) database
- Exasol Starter Kit and Exapump CLI
- Podman and WSL2 for the Starter Kit environment

### Step 1: Clone the Repository

Open PowerShell or a terminal and execute:

```bash
git clone https://github.com/Keerthanaa5/vendor-leverage-engine.git
```

Navigate into the project:

```bash
cd vendor-leverage-engine
```

### Step 2: Start Exasol

Start your Exasol Starter Kit environment.

Verify that the database is reachable using the Exasol tools.

The project uses the Exapump CLI with the `starter-kit` profile to execute SQL queries.

**Important:** The database must be running before starting the backend.

### Step 3: Set Up the Backend

Open a terminal in the project directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
node server.js
```

When successful, you should see:

```text
Vendor-Leverage API running at http://localhost:5000
```

The backend exposes REST API endpoints on port 5000.

Test the backend by opening:

```text
http://localhost:5000
```

Expected response:

```json
{
  "message": "Vendor-Leverage Engine API running"
}
```

### Step 4: Set Up the Frontend

Open a **second terminal**. Keep the backend terminal running.

Navigate to the frontend directory:

```bash
cd vendor-leverage-engine/frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Vite will display a local URL, usually:

```text
http://localhost:5173
```

If port 5173 is already occupied, Vite may automatically select another available port, such as 5174.

Open the URL displayed in your terminal.

### Step 5: Access the Dashboard

Once both servers are running:

- Backend: `http://localhost:5000`
- Frontend: Use the Vite URL displayed in your terminal.

The dashboard provides access to:

1. Overview
2. Usage Analytics
3. Forecasting
4. Contract Simulator
5. Optimization
6. Negotiation Report

### Project Architecture

```text
                 USER
                   |
                   v
            REACT FRONTEND
              Vite Server
                   |
             REST API Calls
                   |
                   v
          NODE.JS / EXPRESS
              Port 5000
                   |
                   v
             EXASOL DATABASE
                   |
              SQL QUERIES
                   |
                   v
          ANALYTICS AND RESULTS
                   |
                   v
