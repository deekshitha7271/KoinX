import React, { useState, useMemo } from 'react';
import { formatCurrency, formatCurrencyWithCents, formatCompactCurrency } from '../utils/formatters';
import { ChevronUp, ChevronDown } from 'lucide-react';

const TooltipValue = ({ compactValue, fullValue, isLoss }) => {
  return (
    <div className={`ui-tooltip-container ${isLoss ? 'loss-text' : 'profit-text'}`}>
      {compactValue}
      <div className="ui-tooltip">{fullValue}</div>
    </div>
  );
};

const TooltipPlainValue = ({ compactValue, fullValue }) => {
  return (
    <div className="ui-tooltip-container" style={{ fontWeight: 600 }}>
      {compactValue}
      <div className="ui-tooltip">{fullValue}</div>
    </div>
  );
};

const HoldingsTable = ({ holdings, selectedAssetIds, onToggleAsset, onSelectAll }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'desc', 'asc'

  const allSelected = holdings.length > 0 && selectedAssetIds.size === holdings.length;

  const handleSortClick = () => {
    if (sortOrder === 'none') setSortOrder('desc');
    else if (sortOrder === 'desc') setSortOrder('asc');
    else setSortOrder('none');
  };

  const processedHoldings = useMemo(() => {
    let result = [...holdings];
    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        if (sortOrder === 'asc') return a.stcg.gain - b.stcg.gain;
        return b.stcg.gain - a.stcg.gain;
      });
    }
    return showAll ? result : result.slice(0, 4);
  }, [holdings, sortOrder, showAll]);

  return (
    <div className="holdings-container">
      <h2 className="holdings-title">Holdings</h2>
      
      <table className="holdings-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>
            <th>Asset</th>
            <th>
              Holdings
              <div className="sub-text">Avg Buy Price</div>
            </th>
            <th>Current Price</th>
            <th>
              <div className="sortable-header" onClick={handleSortClick}>
                {sortOrder === 'desc' && <ChevronDown size={14} />}
                {sortOrder === 'asc' && <ChevronUp size={14} />}
                Short-Term
              </div>
            </th>
            <th>Long-Term</th>
            <th>Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {processedHoldings.map((asset, index) => {
            const isSelected = selectedAssetIds.has(asset.id);
            
            return (
              <tr key={`${asset.id}-${index}`} className={isSelected ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={isSelected}
                    onChange={() => onToggleAsset(asset.id)}
                  />
                </td>
                <td>
                  <div className="asset-cell">
                    <img src={asset.logo} alt={asset.coin} className="asset-logo" />
                    <div className="asset-info">
                      <span className="asset-name">{asset.coinName}</span>
                      <span className="asset-symbol">{asset.coin}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>
                    {formatCurrency(asset.totalHolding)} {asset.coin}
                  </div>
                  <div className="sub-text">
                    {formatCurrencyWithCents(asset.averageBuyPrice)}/{asset.coin}
                  </div>
                </td>
                <td>
                  <TooltipPlainValue 
                    compactValue={formatCompactCurrency(asset.currentPrice)} 
                    fullValue={formatCurrencyWithCents(asset.currentPrice)} 
                  />
                </td>
                <td>
                  <TooltipValue 
                    compactValue={formatCompactCurrency(asset.stcg.gain)}
                    fullValue={formatCurrencyWithCents(asset.stcg.gain)}
                    isLoss={asset.stcg.gain < 0}
                  />
                  <div className="sub-text">
                    {formatCurrency(asset.stcg.balance)} {asset.coin}
                  </div>
                </td>
                <td>
                  <TooltipValue 
                    compactValue={formatCompactCurrency(asset.ltcg.gain)}
                    fullValue={formatCurrencyWithCents(asset.ltcg.gain)}
                    isLoss={asset.ltcg.gain < 0}
                  />
                  <div className="sub-text">
                    {formatCurrency(asset.ltcg.balance)} {asset.coin}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>
                    {isSelected ? `${formatCurrency(asset.totalHolding)} ${asset.coin}` : '-'}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {!showAll && holdings.length > 4 && (
        <div className="view-all" onClick={() => setShowAll(true)}>
          View all
        </div>
      )}
      {showAll && (
        <div className="view-all" onClick={() => setShowAll(false)}>
          Show less
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
