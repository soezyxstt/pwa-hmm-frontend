if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let c = {};
    const r = (e) => a(e, t),
      p = { module: { uri: t }, exports: c, require: r };
    s[t] = Promise.all(i.map((e) => p[e] || r(e))).then((e) => (n(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '70d6919f0afa4e3163e3ee04895b10bc',
        },
        {
          url: '/_next/static/MYQ30z8IQbBl77hDpC00O/_buildManifest.js',
          revision: '1a67675fa8ed72fb36fcab19351e77f8',
        },
        {
          url: '/_next/static/MYQ30z8IQbBl77hDpC00O/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/0e5ce63c-189180ba8135004c.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/1349-baadcfffa2e76f0a.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/231-2d76799671e0bb16.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/2676-d88b8ff90a780a5f.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/2931-750ad10c6d1f8ecf.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/3022-256bf8f4f8ef6f9f.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/30a37ab2-d30f7545d6af518a.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/3186-c25ad5ad06856f7e.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/3347-6205bb14da738517.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/4149-05bdc8b84b3dd077.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/4294-08a263a37c35e526.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/4677-2222ca5259c875bc.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/4733-3c78b914fcd509e1.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/4868-ef6e598948ef4790.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/5510-e3c19c1deb1b5def.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/5951-ae3cebe9cee7d818.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/59650de3-ec6b2f5b7a441354.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/6176-1f70196872f4d85e.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/7023-d77297883fe69999.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/7067-4adcc111e32c07aa.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/7071-0ecb69d3acdfad30.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/7656-f7a7195da4f69fef.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/795d4814-232e57521f566e0a.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/8173-6ee4187b6e27e83d.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/8275-19a2c1a4af20cbbd.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/9195-5856d32ee66e6192.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/9371-146882a05602fbce.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/94730671-41d3b42d2b7d5be8.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/9692-c33cb33fff2133f3.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/assignments/page-007fda9a7ebf19e7.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/courses/%5Bid%5D/page-5dfb50055e96776d.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/courses/page-3273484316fc6a6b.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/dashboard/page-ed167e187e47f044.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/hmm-store/page-248acf9ff5222c1f.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/layout-ed9378ce109d3efa.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/mycareer/page-14d4fc6057efeb2a.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/myhmm/page-abaa82aaf9e88779.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/profile/@modal/%5B...catchAll%5D/page-28b6386d4b4d1c6d.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/profile/@modal/(.)edit/page-49caee4056a3be16.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/profile/@modal/default-eb564ab63789769d.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/profile/edit/page-4a3671ebada62506.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/profile/layout-a23273e6e8489ea3.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/profile/page-d158c3df52f328e6.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/scholarships/%5Bid%5D/page-d879d82f1892bfc7.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/scholarships/page-17e6cfb9ddbdfd53.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/(with-aside)/template-0bac7e69c39ceb7b.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-a4e0be920454af37.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/error-a52ada0d8ee0380f.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/layout-cafee6627feb09cf.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/loading-a416a97b1142cd6d.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/not-found-7819a72d17b87aeb.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/page-e11661ea338578ea.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/assignments/add/page-d1fc9012d6a3d118.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/assignments/edit/%5BcourseId%5D/%5BclassId%5D/%5Bid%5D/page-97cd873c3d7e3f26.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/assignments/page-92e8daf5c12df138.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/courses/add/page-181db51cab5d8c79.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/courses/page-e87559c6af17e605.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/hmm-store/page-bc86dd7d63604b95.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/layout-542cfb0f171db97e.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/scholarships/add/page-a275ef6714e086ea.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/scholarships/page-1a12cf089db19207.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/(with-aside)/template-e6a7d3c12c3ba2f3.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/portal/admin/page-3ccf99dc1ba59864.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/sign-in/page-4d9825b6f5e13d63.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/sign-out/page-de0afa9eadf16c19.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/app/sign-up/page-a73e92dad9ab6471.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/e34aaff9-d2ca039085ffed52.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/ee560e2c-915f6d2adf35b365.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/f25cdb8d-345edcf08c26fb90.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/fd9d1056-33e17457fc1d0d57.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/framework-8e0e0f4a6b83a956.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/main-42f9f7d981d22c41.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/main-app-5986595d36ebec9b.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/pages/_app-f870474a17b7f2fd.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-be66f4e976aacb22.js',
          revision: 'MYQ30z8IQbBl77hDpC00O',
        },
        {
          url: '/_next/static/css/a8e00de60fec569f.css',
          revision: 'a8e00de60fec569f',
        },
        {
          url: '/_next/static/media/0484562807a97172-s.p.woff2',
          revision: 'b550bca8934bd86812d1f5e28c9cc1de',
        },
        {
          url: '/_next/static/media/0a03a6d30c07af2e-s.woff2',
          revision: '79da53ebaf3308c806394df4882b343d',
        },
        {
          url: '/_next/static/media/30cd8f99d32fa6e8-s.woff2',
          revision: 'e5c1b944d9e3380a062bf911e26728a3',
        },
        {
          url: '/_next/static/media/46c21389e888bf13-s.woff2',
          revision: '272930c09ba14c81bb294be1fe18b049',
        },
        {
          url: '/_next/static/media/8888a3826f4a3af4-s.p.woff2',
          revision: '792477d09826b11d1e5a611162c9797a',
        },
        {
          url: '/_next/static/media/b957ea75a84b6ea7-s.p.woff2',
          revision: '0bd523f6049956faaf43c254a719d06a',
        },
        {
          url: '/_next/static/media/eafabf029ad39a43-s.p.woff2',
          revision: '43751174b6b810eb169101a20d8c26f8',
        },
        {
          url: '/_next/static/media/f5767adec246cdc1-s.woff2',
          revision: '7a1c6501aa2b3327c1cf556362a851cb',
        },
        { url: '/beasiswa.jpg', revision: '532e6489693b52b2b94a6fb3aeee7b49' },
        { url: '/blur.jpg', revision: '1ff4236622b27fb1242c128432834ce6' },
        {
          url: '/hmm-vstock/bp-black-transparent.png',
          revision: '6b40212b2d8aeeaa98c12d7dbe473701',
        },
        {
          url: '/hmm-vstock/bp-nonstransparent.png',
          revision: 'a833fcaaf669d458ee0916be9f28d8c9',
        },
        {
          url: '/hmm-vstock/bp-pi-nontransparent.png',
          revision: 'e328d7064675b190aa8b0f2a561e3613',
        },
        {
          url: '/hmm-vstock/bp-white-transparent.png',
          revision: '6b0db0a7b916a7e5d0cc1e848660e306',
        },
        {
          url: '/hmm-vstock/bp.ai',
          revision: '99ba17e3b2b7eb2a6123f7235703eeaa',
        },
        {
          url: '/hmm-vstock/hmm-new.png',
          revision: 'b22e6b8fc696fbbf8cf7f881742e7b46',
        },
        {
          url: '/hmm-vstock/itb.png',
          revision: 'ebfc4c9bd551e275820e00ffc3ecc7f9',
        },
        {
          url: '/hmm-vstock/m-hmm-landscpae.jpg',
          revision: 'd2d40a77f2665baa6fa07f66186e9823',
        },
        {
          url: '/hmm-vstock/m-hmm-potrait.jpg',
          revision: '6d6c9f9f6cfe32233dd790fad2e8d3bc',
        },
        {
          url: '/hmm-vstock/m.png',
          revision: '35c0d0ab08231429aedfac984cff82c7',
        },
        {
          url: '/hmm-vstock/radio-mesin-black.png',
          revision: '3bd4984c38d7f9b75dd68e9416e553b0',
        },
        {
          url: '/hmm-vstock/radio-mesin-red-black.png',
          revision: '278ab98b1c451077e79f8d423042ce3a',
        },
        {
          url: '/hmm-vstock/radio-mesin-white-red.png',
          revision: '6780c941ce616c31f8f4f6160f217b28',
        },
        {
          url: '/hmm-vstock/radio-mesin-white.png',
          revision: 'b1a59ff9d9a36433456e21a04e3b333f',
        },
        {
          url: '/icons/icon-192x192.png',
          revision: 'e3def96968bb5953a58149eb3d869fde',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: '1f8ba8e975f16075a9d061f6d69493b3',
        },
        {
          url: '/icons/logo.png',
          revision: 'b22e6b8fc696fbbf8cf7f881742e7b46',
        },
        {
          url: '/images/berita.png',
          revision: '4d47a6fbabf78152b3acc9ee5715ef48',
        },
        {
          url: '/images/circle-user.svg',
          revision: 'c132a14d73ac4e2e533fd0aa898294bd',
        },
        {
          url: '/images/logo.png',
          revision: 'b22e6b8fc696fbbf8cf7f881742e7b46',
        },
        {
          url: '/images/mesin.png',
          revision: '7098e333465f79c3e8837c7c3cb71aaa',
        },
        {
          url: '/images/pengukuran.png',
          revision: 'e709f5f89ac82271773de9433ab5fe56',
        },
        {
          url: '/images/pipe_system.png',
          revision: 'a32283917158d6a55a0ffbab36919c7e',
        },
        {
          url: '/images/printer.png',
          revision: 'dd7658d58dc096815598b7eff02a255f',
        },
        {
          url: '/images/store.png',
          revision: '1b993cc9ccbf3849dcb7e2dc678cd517',
        },
        { url: '/manifest.json', revision: '3587df54ebfc689fca32db7b70ab77c9' },
        { url: '/offline.html', revision: '4c3e08634587ff688b7f45e12f6a1eb9' },
        {
          url: '/screenshots/desktop.png',
          revision: 'bc39a01796330ad8c92c7ec856de5e80',
        },
        {
          url: '/screenshots/mobile.png',
          revision: '700d04a6b53e034dbe01f65f1951db18',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
