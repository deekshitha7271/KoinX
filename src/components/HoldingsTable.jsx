import React, { useState, useMemo } from 'react';
import { formatCurrency, formatCurrencyWithCents, formatCompactCurrency } from '../utils/formatters';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SortableHeader = ({ title, sortKey, currentSort, onSort, subText }) => (
  <th>
    <div className="sortable-header" onClick={() => onSort(sortKey)}>
      {currentSort.key === sortKey && currentSort.direction === 'desc' && <ChevronDown size={14} />}
      {currentSort.key === sortKey && currentSort.direction === 'asc' && <ChevronUp size={14} />}
      {title}
    </div>
    {subText && <div className="sub-text">{subText}</div>}
  </th>
);

const TooltipValue = ({ compactValue, fullValue, isLoss, isProfit }) => {
  const displayValue = isProfit && !compactValue.startsWith('+') ? `+${compactValue}` : compactValue;
  const fullDisplayValue = isProfit && !fullValue.startsWith('+') ? `+${fullValue}` : fullValue;

  return (
    <div className={`ui-tooltip-container ${isLoss ? 'loss-text' : 'profit-text'}`}>
      {displayValue}
      <div className="ui-tooltip">{fullDisplayValue}</div>
    </div>
  );
};

const TooltipPlainValue = ({ compactValue, fullValue, className = '' }) => {
  return (
    <div className={`ui-tooltip-container ${className}`}>
      {compactValue}
      <div className="ui-tooltip">{fullValue}</div>
    </div>
  );
};

const HoldingsTable = ({ holdings, selectedAssetIds, onToggleAsset, onSelectAll }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const allSelected = holdings.length > 0 && selectedAssetIds.size === holdings.length;

  const handleSortClick = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    } else if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'none';
      key = null;
    }
    setSortConfig({ key, direction });
  };

  const processedHoldings = useMemo(() => {
    let result = [...holdings];
    if (sortConfig.key && sortConfig.direction !== 'none') {
      result.sort((a, b) => {
        let valA, valB;
        switch (sortConfig.key) {
          case 'asset': valA = a.coinName; valB = b.coinName; break;
          case 'holdings': valA = a.totalHolding; valB = b.totalHolding; break;
          case 'price': valA = a.currentPrice; valB = b.currentPrice; break;
          case 'stcg': valA = a.stcg.gain; valB = b.stcg.gain; break;
          case 'ltcg': valA = a.ltcg.gain; valB = b.ltcg.gain; break;
          default: return 0;
        }
        
        if (sortConfig.key === 'asset') {
          return sortConfig.direction === 'asc' 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        }
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      });
    }
    return showAll ? result : result.slice(0, 4);
  }, [holdings, sortConfig, showAll]);

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
            <SortableHeader title="Asset" sortKey="asset" currentSort={sortConfig} onSort={handleSortClick} />
            <SortableHeader title="Holdings" sortKey="holdings" currentSort={sortConfig} onSort={handleSortClick} subText="Avg Buy Price" />
            <SortableHeader title="Current Price" sortKey="price" currentSort={sortConfig} onSort={handleSortClick} />
            <SortableHeader title="Short-Term" sortKey="stcg" currentSort={sortConfig} onSort={handleSortClick} />
            <SortableHeader title="Long-Term" sortKey="ltcg" currentSort={sortConfig} onSort={handleSortClick} />
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
                  <TooltipPlainValue 
                    className="font-medium"
                    compactValue={`${formatCurrency(asset.totalHolding)} ${asset.coin}`}
                    fullValue={`${asset.totalHolding} ${asset.coin}`}
                  />
                  <div className="sub-text">
                    <TooltipPlainValue 
                      compactValue={`${formatCurrencyWithCents(asset.averageBuyPrice)}/${asset.coin}`}
                      fullValue={`${asset.averageBuyPrice}/${asset.coin}`}
                    />
                  </div>
                </td>
                <td>
                  <TooltipPlainValue 
                    className="font-semibold"
                    compactValue={formatCompactCurrency(asset.currentPrice)}
                    fullValue={formatCurrencyWithCents(asset.currentPrice)}
                  />
                </td>
                <td>
                  <TooltipValue 
                    compactValue={formatCompactCurrency(asset.stcg.gain)}
                    fullValue={formatCurrencyWithCents(asset.stcg.gain)}
                    isLoss={asset.stcg.gain < 0}
                    isProfit={asset.stcg.gain > 0}
                  />
                  <div className="sub-text">
                    <TooltipPlainValue 
                      compactValue={`${formatCurrency(asset.stcg.balance)} ${asset.coin}`}
                      fullValue={`${asset.stcg.balance} ${asset.coin}`}
                    />
                  </div>
                </td>
                <td>
                  <TooltipValue 
                    compactValue={formatCompactCurrency(asset.ltcg.gain)}
                    fullValue={formatCurrencyWithCents(asset.ltcg.gain)}
                    isLoss={asset.ltcg.gain < 0}
                    isProfit={asset.ltcg.gain > 0}
                  />
                  <div className="sub-text">
                    <TooltipPlainValue 
                      compactValue={`${formatCurrency(asset.ltcg.balance)} ${asset.coin}`}
                      fullValue={`${asset.ltcg.balance} ${asset.coin}`}
                    />
                  </div>
                </td>
                <td>
                  {isSelected ? (
                    <TooltipPlainValue 
                      className="font-medium"
                      compactValue={`${formatCurrency(asset.totalHolding)} ${asset.coin}`}
                      fullValue={`${asset.totalHolding} ${asset.coin}`}
                    />
                  ) : (
                    <div className="font-medium">-</div>
                  )}
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
