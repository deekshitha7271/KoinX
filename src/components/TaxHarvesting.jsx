import React, { useEffect, useState } from 'react';
import { Info, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { fetchCapitalGains, fetchHoldings } from '../services/mockApi';
import { useTaxHarvesting } from '../hooks/useTaxHarvesting';
import GainsComparison from './GainsComparison';
import HoldingsTable from './HoldingsTable';
import SkeletonLoader from './SkeletonLoader';

const TaxHarvesting = () => {
  const [initialGains, setInitialGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  const {
    selectedAssetIds,
    toggleAssetSelection,
    selectAll,
    postHarvestingGains,
    savings
  } = useTaxHarvesting(initialGains, holdings);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [gainsData, holdingsData] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings()
        ]);
        setInitialGains(gainsData);
        setHoldings(holdingsData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="error-state">
        <AlertCircle size={48} className="error-icon" />
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-message">{error}</p>
        <button
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-title-section">
        <div className="page-title">
          <span>Tax Harvesting</span>
          <div className="how-it-works-container">
            <span className="how-it-works" onClick={() => setHowItWorksOpen(!howItWorksOpen)}>
              How it works?
            </span>
            {howItWorksOpen && (
              <div className="how-it-works-popup">
                <ul>
                  <li>See your capital gains for FY 2024-25 in the left card</li>
                  <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                  <li>Instantly see your updated tax liability in the right card</li>
                </ul>
                <div className="pro-tip-text">
                  Pro tip: <span className="pro-tip-body">Experiment with different combinations of your holdings to optimize your tax liability</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="disclaimer-box">
          <div
            className="disclaimer-header"
            onClick={() => setDisclaimerOpen(!disclaimerOpen)}
          >
            <div className="disclaimer-header-left">
              <Info size={16} />
              <span>Important Notes &amp; Disclaimers</span>
            </div>
            {disclaimerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {disclaimerOpen && (
            <ul className="disclaimer-content">
              <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
              <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
              <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
              <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
              <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
            </ul>
          )}
        </div>
      </div>

      <GainsComparison
        preHarvesting={initialGains}
        postHarvesting={postHarvestingGains}
        savings={savings}
      />

      <HoldingsTable
        holdings={holdings}
        selectedAssetIds={selectedAssetIds}
        onToggleAsset={toggleAssetSelection}
        onSelectAll={selectAll}
      />
    </div>
  );
};

export default TaxHarvesting;
