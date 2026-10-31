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
| Data Processing | Python,
