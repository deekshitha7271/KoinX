import { useState, useMemo } from 'react';

export const useTaxHarvesting = (initialGains, holdings) => {
  const [selectedAssetIds, setSelectedAssetIds] = useState(new Set());

  const toggleAssetSelection = (id) => {
    setSelectedAssetIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedAssetIds.size === holdings.length) {
      setSelectedAssetIds(new Set());
    } else {
      setSelectedAssetIds(new Set(holdings.map(h => h.id)));
    }
  };

  const postHarvestingGains = useMemo(() => {
    if (!initialGains) return null;

    let stcgProfits = initialGains.stcg.profits;
    let stcgLosses = initialGains.stcg.losses;
    let ltcgProfits = initialGains.ltcg.profits;
    let ltcgLosses = initialGains.ltcg.losses;

    selectedAssetIds.forEach(id => {
      const asset = holdings.find(h => h.id === id);
      if (asset) {
        // Short term logic
        if (asset.stcg.gain > 0) {
          stcgProfits += asset.stcg.gain;
        } else if (asset.stcg.gain < 0) {
          stcgLosses += Math.abs(asset.stcg.gain); // Accumulate losses as positive numbers for easier math
        }

        // Long term logic
        if (asset.ltcg.gain > 0) {
          ltcgProfits += asset.ltcg.gain;
        } else if (asset.ltcg.gain < 0) {
          ltcgLosses += Math.abs(asset.ltcg.gain);
        }
      }
    });

    const netStcg = stcgProfits - stcgLosses; // Note: losses should be subtracted
    const netLtcg = ltcgProfits - ltcgLosses;
    const effectiveCapitalGains = netStcg + netLtcg;

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses, net: netStcg },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses, net: netLtcg },
      effective: effectiveCapitalGains
    };
  }, [initialGains, holdings, selectedAssetIds]);

  const preHarvestingRealised = useMemo(() => {
     if (!initialGains) return 0;
     const netStcg = initialGains.stcg.profits - initialGains.stcg.losses;
     const netLtcg = initialGains.ltcg.profits - initialGains.ltcg.losses;
     return netStcg + netLtcg;
  }, [initialGains]);

  const savings = useMemo(() => {
    if (!postHarvestingGains) return 0;
    if (preHarvestingRealised > postHarvestingGains.effective) {
       return preHarvestingRealised - postHarvestingGains.effective;
    }
    return 0;
  }, [preHarvestingRealised, postHarvestingGains]);

  return {
    selectedAssetIds,
    toggleAssetSelection,
    selectAll,
    postHarvestingGains,
    preHarvestingRealised,
    savings
  };
};
