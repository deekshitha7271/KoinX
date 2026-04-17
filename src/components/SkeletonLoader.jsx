import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-wrapper">
      {/* Title section skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-row">
          <div className="skeleton-block" style={{ width: '180px', height: '28px' }}></div>
          <div className="skeleton-block" style={{ width: '100px', height: '20px' }}></div>
        </div>
        <div className="skeleton-block" style={{ width: '100%', height: '48px', marginTop: '16px' }}></div>
      </div>

      {/* Gains comparison skeleton */}
      <div className="skeleton-gains-grid">
        {[1, 2].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-block" style={{ width: '140px', height: '20px', marginBottom: '24px' }}></div>
            <div className="skeleton-row" style={{ marginBottom: '12px' }}>
              <div className="skeleton-block" style={{ width: '100px', height: '14px' }}></div>
              <div className="skeleton-block" style={{ width: '80px', height: '14px' }}></div>
              <div className="skeleton-block" style={{ width: '80px', height: '14px' }}></div>
            </div>
            <div className="skeleton-row" style={{ marginBottom: '12px' }}>
              <div className="skeleton-block" style={{ width: '60px', height: '14px' }}></div>
              <div className="skeleton-block" style={{ width: '80px', height: '14px' }}></div>
              <div className="skeleton-block" style={{ width: '80px', height: '14px' }}></div>
            </div>
            <div className="skeleton-row" style={{ marginBottom: '12px' }}>
              <div className="skeleton-block" style={{ width: '60px', height: '14px' }}></div>
              <div className="skeleton-block" style={{ width: '80px', height: '14px' }}></div>
              <div className="skeleton-block" style={{ width: '80px', height: '14px' }}></div>
            </div>
            <div className="skeleton-row" style={{ marginTop: '24px' }}>
              <div className="skeleton-block" style={{ width: '160px', height: '16px' }}></div>
              <div className="skeleton-block" style={{ width: '120px', height: '28px' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Holdings table skeleton */}
      <div className="skeleton-card">
        <div className="skeleton-block" style={{ width: '100px', height: '20px', marginBottom: '20px' }}></div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-row skeleton-table-row">
            <div className="skeleton-block" style={{ width: '20px', height: '20px', borderRadius: '4px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 2 }}>
              <div className="skeleton-block skeleton-circle"></div>
              <div>
                <div className="skeleton-block" style={{ width: '100px', height: '14px', marginBottom: '6px' }}></div>
                <div className="skeleton-block" style={{ width: '60px', height: '12px' }}></div>
              </div>
            </div>
            <div className="skeleton-block" style={{ width: '80px', height: '14px', flex: 1 }}></div>
            <div className="skeleton-block" style={{ width: '60px', height: '14px', flex: 1 }}></div>
            <div className="skeleton-block" style={{ width: '80px', height: '14px', flex: 1 }}></div>
            <div className="skeleton-block" style={{ width: '60px', height: '14px', flex: 1 }}></div>
            <div className="skeleton-block" style={{ width: '40px', height: '14px', flex: 1 }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
