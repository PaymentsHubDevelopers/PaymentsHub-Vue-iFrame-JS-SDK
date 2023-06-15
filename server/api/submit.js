export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const data = await readBody(event);
  
  const authBody = JSON.stringify({
    mid: config.public.mid,
    developerKey: config.developerKey,
    password: config.password,
  }); 
  const submitPaymentBody = JSON.stringify({
    token: data.cardToken,
    amount: data.amount,
    gateway_public_key: config.public.gatewayPublicKey,
    transaction_source: "PA-JS-SDK",
  });
  const authResponse = await $fetch("https://proxy.payanywhere.com/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": `${authBody.length}`,
      "x-nabwss-appsource": config.xNabwssAppsource,
    },
    body: authBody,
  });

  return $fetch(
    `https://proxy.payanywhere.com/mids/${config.public.mid}/gateways/payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": `${submitPaymentBody.length}`,
        Authorization: `Bearer ${authResponse.token}`,
        "x-nabwss-appsource": config.xNabwssAppsource,
      },
      body: submitPaymentBody,
    }
  );
});
