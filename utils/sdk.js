const initializeSDK = (mid, gateway_public_key) => {
  const PayNowSdk = PayNow.default;
  const options = {
    cardFieldId: "card-number",
    cvvFieldId: "card-cvv",
    addressFieldId: "address",
    zipFieldId: "zipFirst5",
  };

  PayNowSdk().on("ready", () => {
    const fieldStyling =
      "border:0;background:#f1f5f9;border-radius:8px;width:calc(100% - 1rem);height:100%;padding:0.75rem 0.5rem;";
    const numberStyling = fieldStyling;
    const cvvStyling = fieldStyling;
    const streetStyling = fieldStyling;
    const zipStyling = fieldStyling;

    PayNowSdk().setStyle("number", numberStyling);
    PayNowSdk().setStyle("cvv", cvvStyling);
    PayNowSdk().setStyle("address", streetStyling);
    PayNowSdk().setStyle("zip", zipStyling);
    PayNowSdk().setNumberFormat("prettyFormat");
  });
  PayNowSdk().init(gateway_public_key, mid, options);
};
const getToken = async (amount) => {
  const PayNowSdk = PayNow.default;
  console.log('PayNowSdk =', PayNowSdk);

  document.getElementById("card-token").value = "";
  document.getElementById("alert_message").innerHTML = "Verifying...";

  await PayNowSdk().addCard({
    month: '03',
    year: '2028',    
  }); 
  
  const cardToken = PayNowSdk().getCardToken();

  console.log('cardToken =', cardToken);

  if (cardToken == null) {
    document.getElementById("alert_message").innerHTML =
      "Please verify the card information or use a different card.";
  } else {
    document.getElementById("card-token").value = cardToken;
    document.getElementById("alert_message").innerHTML = "Processing...";

    const formData = new FormData(document.getElementById("pay"));
    const avsFields = PayNowSdk().getAVSFields();

    return $fetch("/api/submit", {
      method: "POST",
      body: {
        cardToken,
        amount,
        ...Object.fromEntries(formData.entries()),
        ...avsFields,
      },
    });
  }

  return null;
};

export { initializeSDK, getToken };
