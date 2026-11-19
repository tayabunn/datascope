import React from 'react';
import { KESSLER_ASSETS, KESSLER_CARDS, type KesslerCardData } from '../data/kesslerCards';

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
          viewBox="0 0 54 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 37L19 7L35 37" />
          <path d="M19 37L35 7L51 37" />
        </svg>
        <span>Kessler</span>
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
          <KesslerNav items={['PRODUCTS', 'IMPACT', 'ABOUT']} />
          <div className="k-home-bottom">
            <div className="k-home-stats">
              <div>
                <div className="k-home-num">200x</div>
                <div className="k-home-lbl">stronger</div>
              </div>
              <div className="k-home-stat-divider" />
              <div>
                <div className="k-home-num">87%</div>
                <div className="k-home-lbl">lower emissions</div>
              </div>
            </div>
            <div className="k-home-tagline">
              Advanced materials for a stronger tomorrow.
            </div>
          </div>
        </>
      );

    case 'price':
      return (
        <>
          <KesslerNav items={['PRODUCTS', 'PRICING', 'CONTACT']} active="PRICING" />
          <div className="k-price-amount">
            <span className="k-price-dollar">$</span>2,400
          </div>
          <div className="k-price-sub">PER MONTH · INDUSTRIAL</div>
          <div className="k-price-plans">
            <div className="k-price-row">
              <span>Pilot</span>
              <span>$299</span>
            </div>
            <div className="k-price-row">
              <span>Industrial</span>
              <span>$2,400</span>
            </div>
            <div className="k-price-row">
              <span>Foundry</span>
              <span>Custom</span>
            </div>
          </div>
          <div className="k-price-cta">Start a pilot</div>
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
          <KesslerNav items={['PRODUCTS', 'IMPACT', 'ABOUT']} />
          <div className="k-case-kicker">CASE STUDY · ATLAS RAIL</div>
          <h3 className="k-case-title">
            How Atlas Rail cut track weight by a third in eighteen months
          </h3>
          <div className="k-case-stats">
            <div className="k-case-stat">
              <div className="k-case-num">34%</div>
              <div className="k-case-lbl">lighter track</div>
            </div>
            <div className="k-case-stat">
              <div className="k-case-num">3.4x</div>
              <div className="k-case-lbl">service life</div>
            </div>
            <div className="k-case-stat">
              <div className="k-case-num">0</div>
              <div className="k-case-lbl">unplanned closures</div>
            </div>
          </div>
        </>
      );

    case 'vision':
      return (
        <>
          <KesslerNav items={['PRODUCTS', 'VISION', 'ABOUT']} active="VISION" />
          <div className="k-vision-row">
            <div
              className="k-vision-tile"
              style={{ backgroundImage: `url(${KESSLER_ASSETS.foundry})` }}
            />
            <div
              className="k-vision-tile"
              style={{ backgroundImage: `url(${KESSLER_ASSETS.mesa})` }}
            />
            <blockquote className="k-vision-quote">
              The Kessler vision:{' '}
              <em>materials that outlast the people who made them.</em>
            </blockquote>
          </div>
          <div className="k-vision-footer">
            <div>
              How Kessler pours alloy
              <br />
              at the edge of the desert
            </div>
            <div>Manifesto · 6 min</div>
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
          <KesslerNav items={['PRODUCTS', 'IMPACT', 'ABOUT']} />
          <div className="k-alloy-bottom">
            <h3 className="k-alloy-title">
              The carbon&#8209;negative
              <em>alloy.</em>
            </h3>
            <div className="k-alloy-specs">
              <div className="k-alloy-row">
                <span>Product</span>
                <span>K-Alloy 7</span>
              </div>
              <div className="k-alloy-row">
                <span>Tensile</span>
                <span>1,940 MPa</span>
              </div>
              <div className="k-alloy-row">
                <span>Datasheet</span>
                <span>PDF ↗</span>
              </div>
            </div>
          </div>
        </>
      );

    case 'journal':
      return (
        <>
          <KesslerNav items={['PRODUCTS', 'JOURNAL', 'ABOUT']} active="JOURNAL" />
          <h3 className="k-journal-title">
            Journal
            <em>field notes from the flats</em>
          </h3>
          <div className="k-journal-posts">
            <div>
              <div
                className="k-journal-thumb"
                style={{ backgroundImage: `url(${KESSLER_ASSETS.saltflat})` }}
              />
              <div className="k-journal-kicker">FIELD NOTES</div>
              <div className="k-journal-headline">
                Mining nothing but light on the salt flats
              </div>
            </div>
            <div>
              <div
                className="k-journal-thumb"
                style={{ backgroundImage: `url(${KESSLER_ASSETS.mesa})` }}
              />
              <div className="k-journal-kicker">PLANTS</div>
              <div className="k-journal-headline">Atacama, year one</div>
            </div>
            <div>
              <div
                className="k-journal-thumb"
                style={{ backgroundImage: `url(${KESSLER_ASSETS.dunes})` }}
              />
              <div className="k-journal-kicker">PROCESS</div>
              <div className="k-journal-headline">Why we melt sand at noon</div>
            </div>
          </div>
        </>
      );
  }
}

export { KESSLER_CARDS };
