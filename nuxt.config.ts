export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mid: "MID",
      gatewayPublicKey: "GATEWAY_PUBLIC_KEY",
    },
    xNabwssAppsource: "XNABWSSAPPSOURCE",
    developerKey: "DEVELOPERKEY",
    password: "PASSWORD",
    head: {
      title: "Payments Hub Developers | iFrame JS SDK",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg', href: './assets/favicon.svg' }],
      icon: { source: './assets/favicon.svg' }
    },
  },
});
