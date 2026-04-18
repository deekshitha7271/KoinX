import React from 'react';
import { formatCurrencyWithCents, formatCompactCurrency } from '../utils/formatters';

const CardValue = ({ value, isLossStyle, isProfitStyle }) => {
  const isLarge = Math.abs(value) >= 1000000;
  const displayValue = isLarge ? formatCompactCurrency(value) : formatCurrencyWithCents(value);
  const fullValue = formatCurrencyWithCents(value);

  let className = "gains-value";
  if (isLossStyle) className += " loss-text";
  if (isProfitStyle) className += " profit-text";

  return (
    <div className={`ui-tooltip-container ${className}`} style={{ textAlign: 'right' }}>
      {displayValue}
      <div className="ui-tooltip">{fullValue}</div>
    </div>
  );
};

const CardNetValue = ({ value }) => {
  const isLarge = Math.abs(value) >= 1000000;
  const displayValue = isLarge ? formatCompactCurrency(value) : formatCurrencyWithCents(value);
  const fullValue = formatCurrencyWithCents(value);

  return (
    <div className="ui-tooltip-container gains-value net-gains" style={{ textAlign: 'right' }}>
      {displayValue}
      <div className="ui-tooltip">{fullValue}</div>
    </div>
  );
};

const GainsComparison = ({ preHarvesting, postHarvesting, savings }) => {
  if (!preHarvesting || !postHarvesting) return null;

  return (
    <div className="gains-container">
      {/* Pre Harvesting Card */}
      <div className="gain-card pre-harvesting">
        <h2 className="gain-card-title">Pre Harvesting</h2>

        <div className="gains-grid">
          <div></div>
          <div className="gains-col-header">Short-term</div>
          <div className="gains-col-header">Long-term</div>

          <div className="gains-label">Profits</div>
          <CardValue value={preHarvesting.stcg.profits} isProfitStyle={true} />
          <CardValue value={preHarvesting.ltcg.profits} isProfitStyle={true} />

          <div className="gains-label">Losses</div>
          <CardValue value={preHarvesting.stcg.losses} isLossStyle={true} />
          <CardValue value={preHarvesting.ltcg.losses} isLossStyle={true} />

          <div className="gains-label net-gains">Net Capital Gains</div>
          <CardNetValue value={preHarvesting.stcg.profits - preHarvesting.stcg.losses} />
          <CardNetValue value={preHarvesting.ltcg.profits - preHarvesting.ltcg.losses} />
        </div>

        <div className="realised-gains">
          <span>Realised Capital Gains:</span>
          <span className="realised-value ui-tooltip-container">
            {Math.abs(
              (preHarvesting.stcg.profits - preHarvesting.stcg.losses) +
              (preHarvesting.ltcg.profits - preHarvesting.ltcg.losses)
            ) >= 1000000 
              ? formatCompactCurrency((preHarvesting.stcg.profits - preHarvesting.stcg.losses) + (preHarvesting.ltcg.profits - preHarvesting.ltcg.losses))
              : formatCurrencyWithCents((preHarvesting.stcg.profits - preHarvesting.stcg.losses) + (preHarvesting.ltcg.profits - preHarvesting.ltcg.losses))}
            <div className="ui-tooltip">
              {formatCurrencyWithCents((preHarvesting.stcg.profits - preHarvesting.stcg.losses) + (preHarvesting.ltcg.profits - preHarvesting.ltcg.losses))}
            </div>
          </span>
        </div>
      </div>

      {/* After Harvesting Card */}
      <div className="gain-card after-harvesting">
        <h2 className="gain-card-title">After Harvesting</h2>

        <div className="gains-grid">
          <div></div>
          <div className="gains-col-header">Short-term</div>
          <div className="gains-col-header">Long-term</div>

          <div className="gains-label">Profits</div>
          <CardValue value={postHarvesting.stcg.profits} />
          <CardValue value={postHarvesting.ltcg.profits} />

          <div className="gains-label">Losses</div>
          <CardValue value={postHarvesting.stcg.losses} />
          <CardValue value={postHarvesting.ltcg.losses} />

          <div className="gains-label net-gains">Net Capital Gains</div>
          <CardNetValue value={postHarvesting.stcg.net} />
          <CardNetValue value={postHarvesting.ltcg.net} />
        </div>

        <div className="realised-gains">
          <span>Effective Capital Gains:</span>
          <span className="realised-value ui-tooltip-container">
            {Math.abs(postHarvesting.effective) >= 1000000 
              ? formatCompactCurrency(postHarvesting.effective)
              : formatCurrencyWithCents(postHarvesting.effective)}
            <div className="ui-tooltip">
              {formatCurrencyWithCents(postHarvesting.effective)}
            </div>
          </span>
        </div>

        {savings > 0 && (
          <div className="savings-banner">
            <span>🎉</span>
            <span>You're going to save</span>
            <span style={{ fontWeight: 700, marginLeft: '8px' }} className="ui-tooltip-container">
              {Math.abs(savings) >= 1000000 ? formatCompactCurrency(savings) : formatCurrencyWithCents(savings)}
              <div className="ui-tooltip">{formatCurrencyWithCents(savings)}</div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GainsComparison;
