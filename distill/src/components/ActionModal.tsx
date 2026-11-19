import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { KESSLER_CARDS } from '../data/kesslerCards';

export type ModalKind =
  | null
  | 'explore'
  | 'demo'
  | 'trial'
  | 'signin'
  | 'product'
  | 'usecases'
  | 'resources'
  | 'pricing';

interface ActionModalProps {
  modal: ModalKind;
  onClose: () => void;
  onJumpToCard: (index: number) => void;
}

export function ActionModal({ modal, onClose, onJumpToCard }: ActionModalProps) {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);

  if (!modal) return null;

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    setEmail('');
    setDomain('');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid work email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const activeCard = KESSLER_CARDS[selectedCardIdx];
  const saved = activeCard.original - activeCard.distilled;
  const pct = Math.round((saved / activeCard.original) * 100);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="modal-panel">
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 p-1.5 rounded-full text-[#8B9098] hover:text-[#0F1115] hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {(modal === 'explore' || modal === 'product') && (
          <div>
            <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#8B9098] mb-2">
              Edge Agent Routing
            </p>
            <h2
              className="text-[28px] leading-[1.1] tracking-[-0.02em] text-[#0F1115] mb-3"
              style={{ fontFamily: 'var(--serif)' }}
            >
              Inspect distilled payloads
            </h2>
            <p className="text-[13.5px] leading-[1.55] text-[#2A2E35] mb-4">
              Select any Kessler page to inspect the exact semantic HTML Distill
              serves to AI crawlers and agents at the CDN edge.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {KESSLER_CARDS.map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    setSelectedCardIdx(idx);
                    onJumpToCard(idx);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                    idx === selectedCardIdx
                      ? 'bg-[#FF5A1F] text-white'
                      : 'bg-white/80 text-[#2A2E35] border border-black/10 hover:bg-white'
                  }`}
                >
                  {card.url}
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-[#EEF0F2] border border-black/10 p-4">
              <div className="flex items-center justify-between text-[12px] font-mono mb-3 pb-2 border-b border-black/10">
                <span className="text-[#2A2E35]">
                  {activeCard.original.toLocaleString('en-US')} →{' '}
                  <strong className="text-[#0F1115]">
                    {activeCard.distilled.toLocaleString('en-US')} tokens
                  </strong>
                </span>
                <span className="text-[#D9430F] font-medium">
                  −{saved.toLocaleString('en-US')} ({pct}% less)
                </span>
              </div>
              <pre className="font-mono text-[11.5px] leading-[1.45] text-[#4C515A] overflow-x-auto max-h-[210px] m-0">
                {`${activeCard.meta}\n\n${activeCard.html}`}
              </pre>
            </div>
          </div>
        )}

        {(modal === 'usecases' || modal === 'resources') && (
          <div>
            <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#8B9098] mb-2">
              {modal === 'usecases' ? 'Use Cases' : 'Resources'}
            </p>
            <h2
              className="text-[28px] leading-[1.1] tracking-[-0.02em] text-[#0F1115] mb-4"
              style={{ fontFamily: 'var(--serif)' }}
            >
              {modal === 'usecases'
                ? 'Built for high-density web surfaces'
                : 'Documentation & benchmarks'}
            </h2>
            <div className="space-y-3 text-[13.5px] text-[#2A2E35]">
              {modal === 'usecases' ? (
                <>
                  <div className="p-3.5 rounded-xl bg-white/80 border border-black/8">
                    <div className="font-medium text-[#0F1115] mb-0.5">
                      Documentation & developer portals
                    </div>
                    <div className="text-[12.5px] text-[#5C626D]">
                      Strip client-side navigation shells and hydration scripts so
                      coding agents read pure API references in one pass.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/80 border border-black/8">
                    <div className="font-medium text-[#0F1115] mb-0.5">
                      Industrial & B2B catalogs
                    </div>
                    <div className="text-[12.5px] text-[#5C626D]">
                      Expose structured specifications, pricing tables, and datasheets
                      with up to 94% token reduction.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/80 border border-black/8">
                    <div className="font-medium text-[#0F1115] mb-0.5">
                      Editorial & research journals
                    </div>
                    <div className="text-[12.5px] text-[#5C626D]">
                      Deliver clean article semantics and timestamps while preserving
                      your visual brand for human visitors.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-white/80 border border-black/8">
                    <div className="font-medium text-[#0F1115] mb-0.5">
                      Edge Worker Integration Guide
                    </div>
                    <div className="text-[12.5px] text-[#5C626D]">
                      Deploy Distill in under five minutes on Cloudflare Workers,
                      Fastly Compute, or Vercel Edge Middleware.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/80 border border-black/8">
                    <div className="font-medium text-[#0F1115] mb-0.5">
                      2026 Agent Token Benchmark
                    </div>
                    <div className="text-[12.5px] text-[#5C626D]">
                      Measured across 10,000 production sites: average 89% reduction in
                      input tokens and 3.1x faster agent retrieval.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {modal === 'pricing' && (
          <div>
            <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#8B9098] mb-2">
              Pricing
            </p>
            <h2
              className="text-[28px] leading-[1.1] tracking-[-0.02em] text-[#0F1115] mb-4"
              style={{ fontFamily: 'var(--serif)' }}
            >
              Predictable edge pricing
            </h2>
            <div className="space-y-2.5 text-[13.5px]">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/80 border border-black/8">
                <div>
                  <div className="font-medium text-[#0F1115]">Starter</div>
                  <div className="text-[12px] text-[#5C626D]">
                    Up to 100k distilled agent requests / mo
                  </div>
                </div>
                <div className="font-mono font-medium text-[#0F1115]">Free</div>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#FF5A1F]/40">
                <div>
                  <div className="font-medium text-[#0F1115]">Growth</div>
                  <div className="text-[12px] text-[#5C626D]">
                    Up to 5M agent requests · Custom rules
                  </div>
                </div>
                <div className="font-mono font-medium text-[#FF5A1F]">$290/mo</div>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/80 border border-black/8">
                <div>
                  <div className="font-medium text-[#0F1115]">Enterprise</div>
                  <div className="text-[12px] text-[#5C626D]">
                    Dedicated edge POPs & SLA
                  </div>
                </div>
                <div className="font-mono font-medium text-[#0F1115]">Custom</div>
              </div>
            </div>
          </div>
        )}

        {(modal === 'demo' || modal === 'trial' || modal === 'signin') && (
          <div>
            <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#8B9098] mb-2">
              {modal === 'demo'
                ? 'Schedule Walkthrough'
                : modal === 'trial'
                ? '14-Day Free Trial'
                : 'Account Access'}
            </p>
            <h2
              className="text-[28px] leading-[1.1] tracking-[-0.02em] text-[#0F1115] mb-2"
              style={{ fontFamily: 'var(--serif)' }}
            >
              {modal === 'demo'
                ? 'Book a live Distill demo'
                : modal === 'trial'
                ? 'Start distilling at the edge'
                : 'Sign in to Distill'}
            </h2>
            <p className="text-[13.5px] leading-[1.55] text-[#2A2E35] mb-5">
              {modal === 'demo'
                ? 'See how much token overhead Distill removes from your production site.'
                : modal === 'trial'
                ? 'Connect your domain to preview edge-distilled HTML with zero layout changes.'
                : 'Enter your work email to receive a one-time sign-in link.'}
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-white border border-black/10 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <div className="text-[14px] font-medium text-[#0F1115]">
                    {modal === 'signin' ? 'Sign-in link sent' : 'Request received'}
                  </div>
                  <div className="text-[13px] text-[#5C626D] mt-0.5">
                    We sent details to <span className="font-mono">{email}</span>.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div>
                  <label className="block text-[12px] font-medium text-[#2A2E35] mb-1">
                    Work email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full h-10 px-3.5 rounded-lg bg-white border border-black/15 text-[13.5px] text-[#0F1115] focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>
                {modal !== 'signin' && (
                  <div>
                    <label className="block text-[12px] font-medium text-[#2A2E35] mb-1">
                      Site domain
                    </label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="kessler.co"
                      className="w-full h-10 px-3.5 rounded-lg bg-white border border-black/15 text-[13.5px] text-[#0F1115] focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                )}
                {error && <p className="text-[12px] text-[#D9430F] m-0">{error}</p>}
                <button
                  type="submit"
                  className="w-full h-10 rounded-full bg-[#FF5A1F] text-white font-medium text-[13px] inline-flex items-center justify-center gap-2 hover:brightness-105 transition cursor-pointer mt-2"
                >
                  <span>
                    {modal === 'demo'
                      ? 'Book a demo'
                      : modal === 'trial'
                      ? 'Create workspace'
                      : 'Send sign-in link'}
                  </span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
