export const KESSLER_ASSETS = {
  dunes:
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp',
  foundry:
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp',
  mineral:
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp',
  mesa:
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp',
  fire:
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp',
  saltflat:
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7b6ad638-89ec-4dec-be74-d36fbff3ea53.webp',
  server:
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  network:
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  cables:
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  circuit:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  analytics:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
} as const;

export type KesslerCardId = 'home' | 'price' | 'case' | 'vision' | 'alloy' | 'journal';

export interface KesslerCardData {
  id: KesslerCardId;
  title: string;
  url: string;
  original: number;
  distilled: number;
  html: string;
  meta: string;
}

export const KESSLER_CARDS: KesslerCardData[] = [
  {
    id: 'home',
    title: 'DataScope — Contract Discovery',
    url: 'datascope.io/platform',
    original: 70411,
    distilled: 6140,
    html: `<h1>DataScope — Contract Discovery</h1>

<p>Instant search and analysis across
100,000+ enterprise agreements.
Inverted GIN trigram indexing with
sub-20ms query execution.</p>

<h2>Architecture</h2>
<ul>
  <li>Throughput: 60,000 req/sec</li>
  <li>P99 Latency: 14.2ms</li>
  <li>Capacity: 100,000+ contracts</li>
  <li>Security: SOC2 Type II</li>
</ul>

<h2>Key Capabilities</h2>
<ul>
  <li>Sub-second fuzzy contract search</li>
  <li>Zero spreadsheet crashes</li>
  <li>Immutable deal audit ledger</li>
</ul>

<a href="/explorer">Explore DataScope</a>`,
    meta: `<!-- query_latency: 14.2ms -->
<!-- indexed_rows: 100,000 -->
<!-- datascope.io/platform -->`,
  },
  {
    id: 'price',
    title: 'DataScope — Pricing & Plans',
    url: 'datascope.io/pricing',
    original: 41208,
    distilled: 4960,
    html: `<h1>DataScope — Pricing & Plans</h1>

<p>Predictable pricing for high-velocity
contract intelligence and instant
multi-variable data discovery.</p>

<h2>Starter — $299 / mo</h2>
<ul>
  <li>Records: up to 10,000 deals</li>
  <li>Seats: 5 users</li>
  <li>Support: standard email</li>
</ul>

<h2>Enterprise — $2,400 / mo</h2>
<ul>
  <li>Records: 100,000+ contracts</li>
  <li>Seats: unlimited team access</li>
  <li>GIN Trigram Index: dedicated</li>
  <li>Support: dedicated engineer</li>
</ul>`,
    meta: `<!-- p99_latency: 12.8ms -->
<!-- audit_verified: 100% -->
<!-- datascope.io/pricing -->`,
  },
  {
    id: 'case',
    title: 'Case Study: Vertex Capital',
    url: 'datascope.io/cases/vertex',
    original: 98432,
    distilled: 6300,
    html: `<h1>Case Study: Vertex Capital</h1>

<p>How Vertex Capital eliminated query
bottlenecks across 140,000 contracts.</p>

<h2>The challenge</h2>
<p>Spreadsheet crashes and 45-minute
reporting delays during quarterly audit.</p>

<h2>The result</h2>
<ul>
  <li>94% reduction in query latency</li>
  <li>0 query timeout errors</li>
  <li>Instant sub-20ms lookups</li>
</ul>

<p>Zero spreadsheet crashes since day one.
— VP of Analytics</p>`,
    meta: `<!-- speedup: 94.8% faster -->
<!-- memory_spill: 0.00ms -->
<!-- datascope.io/cases/vertex -->`,
  },
  {
    id: 'vision',
    title: 'The DataScope Standard',
    url: 'datascope.io/architecture',
    original: 55870,
    distilled: 8215,
    html: `<article>
  <h1>The DataScope Standard</h1>

  <p>Query 100,000 contracts as fast
  as typing on your keyboard.</p>

  <p>Eliminate data silos, fragile scripts,
  and crashed sheets with modern
  high-performance indexing.</p>

  <h2>Core Principles</h2>
  <ol>
    <li>Sub-20ms speed for every query</li>
    <li>Zero SQL needed for business teams</li>
    <li>Immutable audit logs for compliance</li>
  </ol>
</article>`,
    meta: `<!-- partition_scan: active -->
<!-- execution_time: 14.2ms -->
<!-- datascope.io/architecture -->`,
  },
  {
    id: 'alloy',
    title: 'DataScope High-Speed Engine',
    url: 'datascope.io/engine',
    original: 63904,
    distilled: 5512,
    html: `<h1>DataScope High-Speed Engine</h1>

<p>Sub-20ms real-time contract discovery.</p>

<h2>Specification</h2>
<ul>
  <li>Index: Inverted GIN Trigram</li>
  <li>Max capacity: 500,000 rows</li>
  <li>Connection pool: PGBouncer 0.4ms</li>
  <li>Query throughput: 60,000 req/s</li>
</ul>

<h2>Capabilities</h2>
<ul>
  <li>Audit ledger, compliance, real-time export</li>
</ul>

<a href="/features">Architecture Blueprint</a>`,
    meta: `<!-- gin_hit_rate: 99.8% -->
<!-- pool_latency: 0.4ms -->
<!-- datascope.io/engine -->`,
  },
  {
    id: 'journal',
    title: 'DataScope Field Notes',
    url: 'datascope.io/notes',
    original: 47316,
    distilled: 7602,
    html: `<h1>DataScope Field Notes</h1>

<p>Live benchmarks and architecture logs.</p>

<article>
  <h2>Inverted GIN trigram indexing</h2>
  <time>2026-03-14</time>
</article>

<article>
  <h2>Zero memory spill on cold partitions</h2>
  <time>2026-02-02</time>
</article>

<article>
  <h2>Sub-20ms search pipeline</h2>
  <time>2026-01-09</time>
</article>`,
    meta: `<!-- latency_p99: 14.2ms -->
<!-- live_status: 60fps locked -->
<!-- datascope.io/notes -->`,
  },
];
