import React from 'react';
import './Skeleton.css';

// Skeleton = grey placeholder cards shown while images are loading
// Looks like cards but animated — better UX than a spinner

interface SkeletonProps {
  count?: number; // how many skeleton cards to show
}

function Skeleton({ count = 8 }: SkeletonProps) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton-info">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--date" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
