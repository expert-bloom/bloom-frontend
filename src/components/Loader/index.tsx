import React from 'react';

import s from './loader.module.scss';

export const Loader = (props: any) => (
  <div className={s.loader} {...props}>
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#7963f0" />
        </filter>
      </defs>
      <circle
        id="spinner"
        cx="50"
        cy="50"
        r="45"
        filter="url(#shadow)"
        style={{
          fill: 'transparent',
          stroke: '#7963f0',
          strokeWidth: '7px',
          strokeLinecap: 'round', // filter: 'url(#shadow)',
        }}
      />
    </svg>
  </div>
);
