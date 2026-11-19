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
    title: 'Kessler — Home',
    url: 'kessler.co/',
    original: 70411,
    distilled: 6140,
    html: `<h1>Kessler — Advanced materials</h1>

<p>Advanced materials for a stronger
tomorrow. Ceramic-matrix alloys made
with desert sand and solar heat.</p>

<h2>At a glance</h2>
<ul>
  <li>Strength: 200x steel by weight</li>
  <li>Emissions: 87% lower</li>
  <li>Plants: Nevada, Atacama, Oman</li>
  <li>Founded: 2019</li>
</ul>

<h2>Products</h2>
<ul>
  <li>K-Alloy 7 — structural</li>
  <li>Basalt fibre — tensile</li>
  <li>Ceramic matrix — thermal</li>
</ul>

<a href="/demo">Book a demo</a>`,
    meta: `<!-- distilled: 6,140 tokens -->
<!-- original: 70,411 tokens -->
<!-- kessler.co/ -->`,
  },
  {
    id: 'price',
    title: 'Kessler — Pricing',
    url: 'kessler.co/pricing',
    original: 41208,
    distilled: 4960,
    html: `<h1>Kessler — Pricing</h1>

<p>Three plans for every scale of
production. Start small, scale to
full foundry output.</p>

<h2>Pilot — $299 / mo</h2>
<ul>
  <li>Sample batches: 4 / mo</li>
  <li>Alloy grades: 2</li>
  <li>Support: email</li>
</ul>

<h2>Industrial — $2,400 / mo</h2>
<ul>
  <li>Tonnage: up to 40 t / mo</li>
  <li>Alloy grades: all</li>
  <li>Certification: ISO 9001</li>
  <li>Support: dedicated engineer</li>
</ul>`,
    meta: `<!-- distilled: 4,960 tokens -->
<!-- original: 41,208 tokens -->
<!-- kessler.co/pricing -->`,
  },
  {
    id: 'case',
    title: 'Case study: Atlas Rail',
    url: 'kessler.co/cases/atlas-rail',
    original: 98432,
    distilled: 6300,
    html: `<h1>Case study: Atlas Rail</h1>

<p>How Atlas Rail cut track weight by
a third in eighteen months.</p>

<h2>The challenge</h2>
<p>1,200 km of desert line, rails
warping above 50 °C every summer.</p>

<h2>The result</h2>
<ul>
  <li>34% lighter track sections</li>
  <li>3.4x longer service life</li>
  <li>0 unplanned closures in 2025</li>
</ul>

<p>We stopped losing summers.
— Head of Infrastructure</p>`,
    meta: `<!-- distilled: 6,300 tokens -->
<!-- original: 98,432 tokens -->
<!-- kessler.co/cases/atlas-rail -->`,
  },
  {
    id: 'vision',
    title: 'The Kessler vision',
    url: 'kessler.co/vision',
    original: 55870,
    distilled: 8215,
    html: `<article>
  <h1>The Kessler vision</h1>

  <p>Materials that outlast the people
  who made them.</p>

  <p>We build where the sun is
  strongest and the sand is free:
  three plants, one closed loop.</p>

  <h2>Principles</h2>
  <ol>
    <li>Heat from the sun, not gas</li>
    <li>Sand in, scrap back in</li>
    <li>Publish every number</li>
  </ol>
</article>`,
    meta: `<!-- distilled: 8,215 tokens -->
<!-- original: 55,870 tokens -->
<!-- kessler.co/vision -->`,
  },
  {
    id: 'alloy',
    title: 'K-Alloy 7',
    url: 'kessler.co/products/k-alloy-7',
    original: 63904,
    distilled: 5512,
    html: `<h1>K-Alloy 7</h1>

<p>The carbon-negative alloy.</p>

<h2>Specification</h2>
<ul>
  <li>Tensile strength: 1,940 MPa</li>
  <li>Density: 2.9 g/cm³</li>
  <li>Max service temp: 1,150 °C</li>
  <li>CO₂: −0.4 kg per kg made</li>
</ul>

<h2>Uses</h2>
<ul>
  <li>Rail, bridges, turbine housings</li>
</ul>

<a href="/k-alloy-7.pdf">Datasheet</a>`,
    meta: `<!-- distilled: 5,512 tokens -->
<!-- original: 63,904 tokens -->
<!-- kessler.co/products/k-alloy-7 -->`,
  },
  {
    id: 'journal',
    title: 'Kessler Journal',
    url: 'kessler.co/journal',
    original: 47316,
    distilled: 7602,
    html: `<h1>Kessler Journal</h1>

<p>Field notes from the flats.</p>

<article>
  <h2>Mining nothing but light</h2>
  <time>2026-03-14</time>
</article>

<article>
  <h2>Atacama, year one</h2>
  <time>2026-02-02</time>
</article>

<article>
  <h2>Why we melt sand at noon</h2>
  <time>2026-01-09</time>
</article>`,
    meta: `<!-- distilled: 7,602 tokens -->
<!-- original: 47,316 tokens -->
<!-- kessler.co/journal -->`,
  },
];
