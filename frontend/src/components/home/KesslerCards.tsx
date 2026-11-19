import React from 'react';
import { KESSLER_ASSETS, KESSLER_CARDS, type KesslerCardData } from '@/data/kesslerCards';

function KesslerNav({
  items,
  active,
}: {
  items: [string, string, string];
  active?: string;
}) {
  return (
    <div className="k-nav">
      <div className="k-brand">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0 H300 L400 100 V300 L300 400 H100 V300 H0 V0 Z M100 100 H300 V200 L200 300 H100 V100 Z"
            fill="currentColor"
          />
        </svg>
        <span>DataScope</span>
      </div>
      <div className="k-menu">
        {items.map((item) =>
          item === active ? (
            <span key={item} className="k-pill">
              {item}
            </span>
          ) : (
            <span key={item}>{item}</span>
          )
        )}
      </div>
    </div>
  );
}

export function renderKesslerCardBody(card: KesslerCardData): React.ReactNode {
  switch (card.id) {
    case 'home':
      return (
        <>
          <div
            className="k-bg"
            style={{ backgroundImage: `url(${KESSLER_ASSETS.dunes})` }}
          />
          <div className="k-home-veil" />
          <KesslerNav items={['CONTRACTS', 'EXPLORER', 'ABOUT']} />
          <div className="k-home-bottom">
            <div className="k-home-stats">
              <div>
                <div className="k-home-num">100k+</div>
                <div className="k-home-lbl">contracts ready</div>
              </div>
              <div className="k-home-stat-divider" />
              <div>
                <div className="k-home-num">14ms</div>
                <div className="k-home-lbl">P99 lookup</div>
              </div>
            </div>
            <div className="k-home-tagline">
              Instant data discovery across enterprise contracts.
            </div>
          </div>
        </>
      );

    case 'price':
      return (
        <>
          <KesslerNav items={['STARTER', 'PRICING', 'ENTERPRISE']} active="PRICING" />
          <div className="k-price-amount">
            <span className="k-price-dollar">$</span>2,400
          </div>
          <div className="k-price-sub">PER MONTH · ENTERPRISE SCALE</div>
          <div className="k-price-plans">
            <div className="k-price-row">
              <span>Starter (10k rows)</span>
              <span>$299</span>
            </div>
            <div className="k-price-row">
              <span>Scale (100k rows)</span>
              <span>$2,400</span>
            </div>
            <div className="k-price-row">
              <span>Custom Foundry</span>
              <span>Custom</span>
            </div>
          </div>
          <div className="k-price-cta">Start free trial</div>
        </>
      );

    case 'case':
      return (
        <>
          <div
            className="k-case-bg"
            style={{ backgroundImage: `url(${KESSLER_ASSETS.mineral})` }}
          />
          <div className="k-case-veil" />
          <KesslerNav items={['FINTECH', 'CASE STUDY', 'AUDIT']} />
          <div className="k-case-kicker">CASE STUDY · VERTEX CAPITAL</div>
          <h3 className="k-case-title">
            How Vertex Capital indexed 140,000 contracts with zero spreadsheet crashes
          </h3>
          <div className="k-case-stats">
            <div className="k-case-stat">
              <div className="k-case-num">94%</div>
              <div className="k-case-lbl">faster query</div>
            </div>
            <div className="k-case-stat">
              <div className="k-case-num">14ms</div>
              <div className="k-case-lbl">search latency</div>
            </div>
            <div className="k-case-stat">
              <div className="k-case-num">0</div>
              <div className="k-case-lbl">crashes</div>
            </div>
          </div>
        </>
      );

    case 'vision':
      return (
        <>
          <KesslerNav items={['INDEXING', 'ARCHITECTURE', 'SPEED']} active="ARCHITECTURE" />
          <div className="k-vision-row">
            <div
              className="k-vision-tile"
              style={{ backgroundImage: `url(${KESSLER_ASSETS.server})` }}
            />
            <div
              className="k-vision-tile"
              style={{ backgroundImage: `url(${KESSLER_ASSETS.network})` }}
            />
            <blockquote className="k-vision-quote">
              The DataScope standard:{' '}
              <em>query 100,000 contracts as fast as typing.</em>
            </blockquote>
          </div>
          <div className="k-vision-footer">
            <div>
              Inverted GIN Trigram index
              <br />
              and real-time AST execution pipeline
            </div>
            <div>Architecture · 5 min</div>
          </div>
        </>
      );

    case 'alloy':
      return (
        <>
          <div
            className="k-alloy-bg"
            style={{ backgroundImage: `url(${KESSLER_ASSETS.fire})` }}
          />
          <div className="k-alloy-veil" />
          <KesslerNav items={['ENGINE', 'BENCHMARK', 'DOCS']} />
          <div className="k-alloy-bottom">
            <h3 className="k-alloy-title">
              The sub&#8209;20ms
              <em>query engine.</em>
            </h3>
            <div className="k-alloy-specs">
              <div className="k-alloy-row">
                <span>Throughput</span>
                <span>60,000 req/s</span>
              </div>
              <div className="k-alloy-row">
                <span>P99 Latency</span>
                <span>14.2 ms</span>
              </div>
              <div className="k-alloy-row">
                <span>Index Type</span>
                <span>Inverted GIN</span>
              </div>
            </div>
          </div>
        </>
      );

    case 'journal':
      return (
        <>
          <KesslerNav items={['EXPLORER', 'BENCHMARK', 'SECURITY']} active="BENCHMARK" />
          <div className="k-journal-posts">
            <div>
              <div
                className="k-journal-thumb"
                style={{ backgroundImage: `url(${KESSLER_ASSETS.cables})` }}
              />
              <div className="k-journal-kicker">INDEXING</div>
              <div className="k-journal-headline">
                Inverted GIN trigram scan across 100,000 rows
              </div>
            </div>
            <div>
              <div
                className="k-journal-thumb"
                style={{ backgroundImage: `url(${KESSLER_ASSETS.circuit})` }}
              />
              <div className="k-journal-kicker">MEMORY</div>
              <div className="k-journal-headline">Zero memory spill on cold partitions</div>
            </div>
            <div>
              <div
                className="k-journal-thumb"
                style={{ backgroundImage: `url(${KESSLER_ASSETS.analytics})` }}
              />
              <div className="k-journal-kicker">PERFORMANCE</div>
              <div className="k-journal-headline">Why sub-20ms lookups outperform legacy SQL</div>
            </div>
          </div>
        </>
      );
  }
}

export { KESSLER_CARDS };
