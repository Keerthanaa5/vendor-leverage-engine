
import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

import {
  LayoutDashboard, Activity, BrainCircuit, FileText,
  SlidersHorizontal, Zap, Cpu, DollarSign,
  TrendingUp, ShieldCheck, RefreshCw, Building2
} from "lucide-react";

import VendorProposalLab from "./VendorProposalLab";
import "./App.css";

const API = "http://localhost:5000";

function parseCSV(csv) {
  if (!csv || typeof csv !== "string") return [];

  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",");

  return lines.slice(1).filter(Boolean).map(line => {
    const values = line.split(",");

    return Object.fromEntries(
      headers.map((header, index) => [
        header.trim(),
        values[index] !== undefined &&
        values[index] !== "" &&
        !isNaN(Number(values[index]))
          ? Number(values[index])
          : values[index]
      ])
    );
  });
}

function Panel({ title, subtitle, children }) {
  return (
    <div className="panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">VENDOR INTELLIGENCE</span>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function DataTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p style={{ padding: 20 }}>No database records available.</p>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        color: "#b8c7d8",
        fontSize: "13px"
      }}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column} style={{
                padding: "13px",
                color: "#23d5b0",
                textAlign: "left",
                borderBottom: "1px solid #263647"
              }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column} style={{
                  padding: "12px",
                  borderBottom: "1px solid #263647"
                }}>
                  {String(row[column] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("Overview");
  const [api, setApi] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commitmentFee, setCommitmentFee] = useState(10);

  const nav = [
    ["Overview", LayoutDashboard],
    ["Usage Analytics", Activity],
    ["Forecasting", BrainCircuit],
    ["Vendor Proposal Lab", Building2],
    ["Contract Simulator", SlidersHorizontal],
    ["Optimization", Zap],
    ["Negotiation Report", FileText]
  ];

  async function loadData() {
    setLoading(true);
    setError("");

    const endpoints = [
      "summary",
      "usage/daily",
      "usage/hourly",
      "forecast",
      "backtest",
      "optimization",
      "negotiation"
    ];

    const results = {};

    await Promise.all(
      endpoints.map(async endpoint => {
        try {
          const response = await fetch(`${API}/api/${endpoint}`);

          if (!response.ok) {
            throw new Error(`${endpoint} API failed`);
          }

          const result = await response.json();

          if (!result.success) {
            throw new Error(result.error || `${endpoint} failed`);
          }

          results[endpoint] = {
            success: true,
            rows: parseCSV(result.data)
          };
        } catch (e) {
          results[endpoint] = {
            success: false,
            rows: [],
            error: e.message
          };
        }
      })
    );

    setApi(results);

    const failed = endpoints.filter(
      endpoint => !results[endpoint]?.success
    );

    if (failed.length) {
      setError("Unable to load: " + failed.join(", "));
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const summary = api.summary?.rows?.[0] || {};
  const daily = api["usage/daily"]?.rows || [];
  const hourly = api["usage/hourly"]?.rows || [];
  const forecast = api.forecast?.rows || [];
  const backtest = api.backtest?.rows || [];
  const optimization = api.optimization?.rows || [];
  const negotiation = api.negotiation?.rows || [];

  const fmt = value => Number(value || 0).toFixed(2);
  const money = value => "$" + fmt(value);

  const averageDaily = Number(summary.AVG_DAILY_USAGE || 0);
  const monthlyUsage = averageDaily * 30;
  const paygCost = monthlyUsage * 0.10;
  const discountedCost = paygCost * 0.80;
  const committedCost = commitmentFee + paygCost * 0.60;

  function Metric({ label, value, Icon }) {
    return (
      <div className="metric-card">
        <div className="metric-top">
          {label}
          {Icon && <div className="metric-icon"><Icon size={19}/></div>}
        </div>
        <div className="metric-value">{value}</div>
        <div className="metric-foot">Powered by Exasol data</div>
      </div>
    );
  }

  function renderOverview() {
    return (
      <>
        <section className="metrics-grid">
          <Metric label="Estimated CPU Hours"
            value={fmt(summary.ESTIMATED_CPU_HOURS)} Icon={Cpu}/>
          <Metric label="Discounted Cost"
            value={money(summary.DISCOUNTED_COST)} Icon={DollarSign}/>
          <Metric label="Potential Savings"
            value={money(summary.SAVINGS_VS_DISCOUNTED)} Icon={TrendingUp}/>
          <Metric label="Break-even Fee"
            value={money(summary.MAX_BREAK_EVEN_FEE)} Icon={ShieldCheck}/>
        </section>

        <section className="insight-strip">
          <div className="insight-icon"><BrainCircuit size={22}/></div>
          <div className="insight-copy">
            <strong>Negotiation intelligence</strong>
            <p>
              Modeled committed plan: {money(summary.COMMITTED_COST_FEE_10)}
              {" "}versus {money(summary.DISCOUNTED_COST)} for the discounted
              plan. Potential savings: {money(summary.SAVINGS_VS_DISCOUNTED)}.
              Break-even fee: {money(summary.MAX_BREAK_EVEN_FEE)}.
            </p>
          </div>
          <div className="insight-tag">MODEL INSIGHT</div>
        </section>

        <section className="charts-grid">
          <Panel title="Daily CPU Consumption"
            subtitle="Historical daily resource usage">
            <div className="chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={daily}>
                  <CartesianGrid stroke="#263647" strokeDasharray="3 5"/>
                  <XAxis dataKey="USAGE_DATE" stroke="#8493a5"/>
                  <YAxis stroke="#8493a5"/>
                  <Tooltip/>
                  <Area dataKey="DAILY_CPU_HOURS"
                    stroke="#23d5b0" fill="#23d5b0" fillOpacity={0.15}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="7-Day Forecast"
            subtitle="Predicted resource demand">
            <div className="chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast}>
                  <CartesianGrid stroke="#263647" strokeDasharray="3 5"/>
                  <XAxis dataKey="FORECAST_DATE" stroke="#8493a5"/>
                  <YAxis stroke="#8493a5"/>
                  <Tooltip/>
                  <Area dataKey="PREDICTED_CPU_HOURS"
                    stroke="#23d5b0" fill="#23d5b0" fillOpacity={0.15}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p style={{ padding: 15 }}>
              Forecast average: {fmt(summary.FORECAST_DAILY_USAGE)} CPU hours
            </p>
          </Panel>
        </section>

        <section className="bottom-grid">
          <Panel title="Forecast Validation"
            subtitle="Held-out historical evaluation">
            <div className="validation-stats">
              <div><span>MAPE</span><strong>{fmt(summary.MAPE_PERCENT)}%</strong></div>
              <div><span>MAE</span><strong>{fmt(summary.MAE)}</strong></div>
              <div><span>Coverage</span><strong>{fmt(summary.COVERAGE_PERCENT)}%</strong></div>
            </div>
            <p style={{ padding: 15 }}>
              {summary.DAYS_WITHIN_RANGE} of {summary.TEST_DAYS} test days
              within the forecast range.
            </p>
          </Panel>

          <Panel title="Optimization Summary"
            subtitle="Best tested contract scenario">
            <div style={{ padding: 20 }}>
              <h2>{money(summary.BEST_TESTED_COST)}</h2>
              <p>Best tested cost</p>
              <h2>{money(summary.MAX_TESTED_SAVINGS)}</h2>
              <p>Maximum tested savings</p>
            </div>
          </Panel>
        </section>
      </>
    );
  }

  function renderUsage() {
    return (
      <>
        <section className="metrics-grid">
          <Metric label="Raw Records" value={summary.RAW_RECORDS}/>
          <Metric label="Complete Days" value={summary.COMPLETE_DAYS}/>
          <Metric label="Average Daily CPU Hours"
            value={fmt(summary.AVG_DAILY_USAGE)}/>
        </section>

        <Panel title="Daily CPU Usage"
          subtitle="Historical consumption by date">
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={daily}>
                <CartesianGrid stroke="#263647" strokeDasharray="3 5"/>
                <XAxis dataKey="USAGE_DATE" stroke="#8493a5"/>
                <YAxis stroke="#8493a5"/>
                <Tooltip/>
                <Area dataKey="DAILY_CPU_HOURS"
                  stroke="#23d5b0" fill="#23d5b0" fillOpacity={0.15}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Hourly Usage Records"
          subtitle="Hourly resource consumption retrieved from Exasol">
          <DataTable rows={hourly}/>
        </Panel>

        <Panel title="Daily Usage Records"
          subtitle="Complete daily historical dataset">
          <DataTable rows={daily}/>
        </Panel>
      </>
    );
  }

  function renderForecasting() {
    return (
      <>
        <section className="metrics-grid">
          <Metric label="Forecast Daily Usage"
            value={fmt(summary.FORECAST_DAILY_USAGE)}/>
          <Metric label="Lower Confidence Bound"
            value={fmt(summary.LOWER_BOUND_95)}/>
          <Metric label="Upper Confidence Bound"
            value={fmt(summary.UPPER_BOUND_95)}/>
        </section>

        <Panel title="7-Day Demand Forecast"
          subtitle="Predicted CPU hours and confidence range">
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecast}>
                <CartesianGrid stroke="#263647" strokeDasharray="3 5"/>
                <XAxis dataKey="FORECAST_DATE" stroke="#8493a5"/>
                <YAxis stroke="#8493a5"/>
                <Tooltip/>
                <Area dataKey="UPPER_BOUND_95"
                  stroke="#7185bd" fill="#7185bd" fillOpacity={0.08}/>
                <Area dataKey="PREDICTED_CPU_HOURS"
                  stroke="#23d5b0" fill="#23d5b0" fillOpacity={0.18}/>
                <Area dataKey="LOWER_BOUND_95"
                  stroke="#d6a65d" fill="#d6a65d" fillOpacity={0.08}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Forecast Backtesting"
          subtitle="Held-out historical evaluation">
          <div className="validation-stats">
            <div><span>MAPE</span><strong>{fmt(summary.MAPE_PERCENT)}%</strong></div>
            <div><span>MAE</span><strong>{fmt(summary.MAE)}</strong></div>
            <div><span>Coverage</span><strong>{fmt(summary.COVERAGE_PERCENT)}%</strong></div>
          </div>
          <DataTable rows={backtest}/>
        </Panel>
      </>
    );
  }

  function renderSimulator() {
    return (
      <>
        <Panel title="Contract Simulator"
          subtitle="Adjust commitment fees and compare modeled contract costs">
          <div style={{ padding: 25, color: "#b8c7d8" }}>
            <h3>Monthly Fixed Commitment Fee</h3>
            <h1 style={{ color: "#23d5b0" }}>{money(commitmentFee)}</h1>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={commitmentFee}
              onChange={e => setCommitmentFee(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#23d5b0" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>
        </Panel>

        <section className="metrics-grid">
          <Metric label="Pay-As-You-Go Cost" value={money(paygCost)}/>
          <Metric label="Discounted Plan Cost" value={money(discountedCost)}/>
          <Metric label="Committed Plan Cost" value={money(committedCost)}/>
          <Metric label="Savings vs Discounted"
            value={money(discountedCost - committedCost)}/>
        </section>

        <Panel title="Simulation Assumptions"
          subtitle="Illustrative model pricing parameters">
          <DataTable rows={[
            { Parameter: "Estimated monthly CPU hours", Value: fmt(monthlyUsage) },
            { Parameter: "Base rate per CPU hour", Value: "$0.10" },
            { Parameter: "Discounted plan discount", Value: "20%" },
            { Parameter: "Committed plan discount", Value: "40%" },
            { Parameter: "Fixed commitment fee", Value: money(commitmentFee) }
          ]}/>
          <p style={{ padding: 15, color: "#8493a5" }}>
            These are illustrative assumptions, not a verified vendor quotation.
          </p>
        </Panel>
      </>
    );
  }

  function renderOptimization() {
    return (
      <>
        <section className="metrics-grid">
          <Metric label="Break-even Fee"
            value={money(summary.MAX_BREAK_EVEN_FEE)}/>
          <Metric label="Best Tested Cost"
            value={money(summary.BEST_TESTED_COST)}/>
          <Metric label="Maximum Tested Savings"
            value={money(summary.MAX_TESTED_SAVINGS)}/>
        </section>

        <Panel title="Commitment Fee Optimization"
          subtitle="Tested contract fee scenarios from Exasol">
          <DataTable rows={optimization}/>
        </Panel>
      </>
    );
  }

  function renderNegotiation() {
    return (
      <>
        <section className="metrics-grid">
          <Metric label="Discounted Cost"
            value={money(summary.DISCOUNTED_COST)}/>
          <Metric label="Committed Cost at $10 Fee"
            value={money(summary.COMMITTED_COST_FEE_10)}/>
          <Metric label="Break-even Fee"
            value={money(summary.MAX_BREAK_EVEN_FEE)}/>
          <Metric label="Potential Savings"
            value={money(summary.SAVINGS_VS_DISCOUNTED)}/>
        </section>

        <Panel title="Negotiation Results"
          subtitle="Results retrieved from Exasol">
          <DataTable rows={negotiation}/>
        </Panel>

        <Panel title="Final Negotiation Intelligence"
          subtitle="Model-generated recommendation">
          <div style={{
            padding: 25,
            color: "#b8c7d8",
            lineHeight: 1.9
          }}>
            <h3>Recommended Negotiation Position</h3>
            <p>
              The modeled break-even fixed fee is
              <strong> {money(summary.MAX_BREAK_EVEN_FEE)}</strong>.
            </p>
            <p>
              Under the current pricing assumptions, negotiate a fixed
              commitment fee below this threshold to make the committed
              plan cheaper than the discounted plan.
            </p>
            <p>
              Potential savings at the tested $10 fee:
              <strong> {money(summary.SAVINGS_VS_DISCOUNTED)}</strong>.
            </p>
          </div>
        </Panel>
      </>
    );
  }

  const pages = {
    "Overview": renderOverview,
    "Usage Analytics": renderUsage,
    "Forecasting": renderForecasting,
    "Vendor Proposal Lab": () => <VendorProposalLab />,
    "Contract Simulator": renderSimulator,
    "Optimization": renderOptimization,
    "Negotiation Report": renderNegotiation
  };

  if (loading) {
    return (
      <div className="loading">
        Connecting to Exasol intelligence...
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Zap size={23}/></div>
          <div>
            <strong>VENDOR<span>LEVERAGE</span></strong>
            <small>INTELLIGENCE PLATFORM</small>
          </div>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <div className="nav-list">
          {nav.map(([name, Icon]) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "active" : ""}`}
              onClick={() => setActive(name)}
            >
              <Icon size={18}/>
              <span>{name}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="system-status">
            {api.summary?.success
              ? "● EXASOL CONNECTED"
              : "● API CONNECTION ISSUE"}
          </div>

          <div className="profile">
            <div className="avatar">VL</div>
            <div>
              <strong>Analytics Workspace</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace / {active}</div>
          <div className="live-status"><span/> LIVE DATA</div>
        </header>

        <section className="page-heading">
          <div>
            <div className="eyebrow">VENDOR INTELLIGENCE / 2026</div>
            <h1>
              {active === "Overview" ? "Command Center" : active}
            </h1>
            <p>
              {active === "Vendor Proposal Lab"
                ? "Compare vendor contracts and identify better pricing opportunities."
                : "Turn usage intelligence into stronger vendor negotiations."}
            </p>
          </div>

          {active !== "Vendor Proposal Lab" && (
            <button className="refresh-btn" onClick={loadData}>
              <RefreshCw size={15}/> Refresh data
            </button>
          )}
        </section>

        {error && <div className="error-box">{error}</div>}

        {pages[active]?.()}

        <footer className="footer">
          <span>VENDOR-LEVERAGE ENGINE · EXASOL DATA PLATFORM</span>
          <span>DECISION INTELLIGENCE · 2026</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
