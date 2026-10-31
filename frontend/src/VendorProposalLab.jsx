
import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Calculator,
  TrendingDown,
  Building2,
  ArrowUpRight,
  CircleDollarSign,
  Gauge,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

import "./VendorProposalLab.css";

const initialProposals = [
  {
    id: 1,
    name: "Vendor A",
    rate: 0.10,
    discount: 20,
    fixedFee: 0,
    commitment: 0,
    overageRate: 0.10
  },
  {
    id: 2,
    name: "Vendor B",
    rate: 0.10,
    discount: 40,
    fixedFee: 10,
    commitment: 100,
    overageRate: 0.10
  }
];

function calculateCost(proposal, usage) {
  const committedUsage = Math.min(
    usage,
    Math.max(0, Number(proposal.commitment))
  );

  const overageUsage = Math.max(
    0,
    usage - committedUsage
  );

  const committedCost =
    committedUsage *
    Number(proposal.rate) *
    (1 - Number(proposal.discount) / 100);

  const overageCost =
    overageUsage * Number(proposal.overageRate);

  return (
    Number(proposal.fixedFee) +
    committedCost +
    overageCost
  );
}

function money(value) {
  return "$" + Number(value).toFixed(2);
}

export default function VendorProposalLab() {
  const [monthlyUsage, setMonthlyUsage] = useState(639.34);
  const [proposals, setProposals] = useState(initialProposals);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rate: 0.10,
    discount: 20,
    fixedFee: 0,
    commitment: 0,
    overageRate: 0.10
  });

  const results = useMemo(() => {
    const usage = Math.max(0, Number(monthlyUsage) || 0);

    return proposals.map((proposal) => {
      const cost = calculateCost(proposal, usage);
      const payAsYouGo = usage * Number(proposal.rate);
      
      return {
        ...proposal,
        cost,
        payAsYouGo,
        savings: payAsYouGo - cost
      };
    });
  }, [proposals, monthlyUsage]);

  const cheapest = results.length
    ? results.reduce((best, current) =>
        current.cost < best.cost ? current : best
      )
    : null;

  const handleChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const addProposal = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    setProposals((previous) => [
      ...previous,
      {
        ...form,
        id: Date.now(),
        name: form.name.trim()
      }
    ]);

    setForm({
      name: "",
      rate: 0.10,
      discount: 20,
      fixedFee: 0,
      commitment: 0,
      overageRate: 0.10
    });

    setShowForm(false);
  };

  const removeProposal = (id) => {
    setProposals((previous) =>
      previous.filter((proposal) => proposal.id !== id)
    );
  };

  const resetProposals = () => {
    setProposals(initialProposals);
    setMonthlyUsage(639.34);
  };

  return (
    <div className="proposal-lab">

      <div className="proposal-header">
        <div>
          <div className="proposal-eyebrow">
            COMMERCIAL INTELLIGENCE / 2026
          </div>

          <h1>Vendor Proposal Lab</h1>

          <p>
            Compare vendor contracts. Discover better pricing.
            Negotiate with evidence.
          </p>
        </div>

        <button
          className="proposal-add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={17} />
          Add Proposal
        </button>
      </div>

      <div className="proposal-input-panel">
        <div className="panel-heading">
          <div className="panel-icon">
            <Gauge size={20} />
          </div>

          <div>
            <h3>Demand Configuration</h3>
            <p>Set the expected monthly resource consumption.</p>
          </div>
        </div>

        <div className="usage-input">
          <label>Expected monthly CPU hours</label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyUsage}
            onChange={(e) =>
              setMonthlyUsage(e.target.value)
            }
          />

          <span>
            Current starting estimate: 21.31 daily CPU hours
            × 30 days. Editable scenario assumption.
          </span>
        </div>
      </div>

      {showForm && (
        <form
          className="proposal-form"
          onSubmit={addProposal}
        >
          <div className="form-heading">
            <div>
              <h3>Add Vendor Proposal</h3>
              <p>Enter the commercial terms from the vendor.</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-field">
              <label>Vendor / Proposal Name</label>
              <input
                required
                placeholder="e.g. Vendor C"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>Base rate per CPU hour ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={form.rate}
                onChange={(e) =>
                  handleChange("rate", e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>Committed usage discount (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={form.discount}
                onChange={(e) =>
                  handleChange("discount", e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>Fixed monthly fee ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={form.fixedFee}
                onChange={(e) =>
                  handleChange("fixedFee", e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>Committed CPU hours</label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={form.commitment}
                onChange={(e) =>
                  handleChange("commitment", e.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label>Overage rate per CPU hour ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={form.overageRate}
                onChange={(e) =>
                  handleChange("overageRate", e.target.value)
                }
              />
            </div>

          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="proposal-add-btn"
            >
              <Plus size={16} />
              Save Proposal
            </button>
          </div>
        </form>
      )}

      <div className="proposal-section-heading">
        <div>
          <h2>Proposal Comparison</h2>
          <p>
            Financial comparison based on the selected demand scenario.
          </p>
        </div>

        <button
          className="reset-btn"
          onClick={resetProposals}
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="proposal-metrics">

        <div className="proposal-metric">
          <div className="metric-top">
            <span>Proposals Evaluated</span>
            <Building2 size={19} />
          </div>
          <strong>{results.length}</strong>
          <small>Available pricing options</small>
        </div>

        <div className="proposal-metric">
          <div className="metric-top">
            <span>Lowest Monthly Cost</span>
            <CircleDollarSign size={19} />
          </div>
          <strong>
            {cheapest ? money(cheapest.cost) : "—"}
          </strong>
          <small>Best tested proposal</small>
        </div>

        <div className="proposal-metric">
          <div className="metric-top">
            <span>Best Proposal</span>
            <ShieldCheck size={19} />
          </div>
          <strong className="best-name">
            {cheapest ? cheapest.name : "—"}
          </strong>
          <small>Lowest modeled expenditure</small>
        </div>

      </div>

      <div className="proposal-table-panel">
        <div className="table-heading">
          <div>
            <h3>Commercial Comparison</h3>
            <p>Monthly modeled expenditure by proposal</p>
          </div>

          <span className="live-indicator">
            <span />
            LIVE CALCULATION
          </span>
        </div>

        <div className="table-scroll">
          <table className="proposal-table">
            <thead>
              <tr>
                <th>PROPOSAL</th>
                <th>BASE RATE</th>
                <th>DISCOUNT</th>
                <th>FIXED FEE</th>
                <th>COMMITMENT</th>
                <th>MONTHLY COST</th>
                <th>SAVINGS VS PAYG</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {results.map((proposal) => (
                <tr
                  key={proposal.id}
                  className={
                    cheapest?.id === proposal.id
                      ? "best-proposal-row"
                      : ""
                  }
                >
                  <td>
                    <div className="vendor-name">
                      <Building2 size={16} />
                      {proposal.name}
                    </div>

                    {cheapest?.id === proposal.id && (
                      <span className="recommended-label">
                        LOWEST COST
                      </span>
                    )}
                  </td>

                  <td>{money(proposal.rate)}</td>
                  <td>{proposal.discount}%</td>
                  <td>{money(proposal.fixedFee)}</td>
                  <td>
                    {Number(proposal.commitment).toLocaleString()}
                  </td>
                  <td className="cost-cell">
                    {money(proposal.cost)}
                  </td>
                  <td
                    className={
                      proposal.savings >= 0
                        ? "positive-cell"
                        : "negative-cell"
                    }
                  >
                    {money(proposal.savings)}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      title="Remove proposal"
                      onClick={() =>
                        removeProposal(proposal.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {results.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No proposals available. Add a vendor proposal
                    to begin comparing contracts.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {cheapest && (
        <div className="proposal-recommendation">
          <div className="recommendation-icon">
            <TrendingDown size={22} />
          </div>

          <div className="recommendation-content">
            <span>OPTIMIZATION INSIGHT</span>

            <h3>
              {cheapest.name} has the lowest modeled cost.
            </h3>

            <p>
              At the selected monthly demand of{" "}
              {Number(monthlyUsage).toFixed(2)} CPU hours,
              its estimated monthly expenditure is{" "}
              <strong>{money(cheapest.cost)}</strong>.
            </p>

            <small>
              {cheapest.savings >= 0
                ? `Modeled savings against this proposal's pay-as-you-go baseline: ${money(cheapest.savings)}.`
                : `This proposal costs ${money(Math.abs(cheapest.savings))} more than its pay-as-you-go baseline.`}
            </small>
          </div>

          <ArrowUpRight size={20} />
        </div>
      )}

      <div className="proposal-disclaimer">
        <Calculator size={15} />
        Pricing calculations are illustrative. Results depend on
        entered vendor terms and the selected usage scenario.
        They are not verified vendor invoices or quotations.
      </div>

    </div>
  );
}
