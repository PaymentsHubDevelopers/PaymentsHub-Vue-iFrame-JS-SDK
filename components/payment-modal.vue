<template>
  <div class="container" :class="opened ? '' : 'hidden'">
    <div class="overlay" @click="$emit('closeModal')"></div>
    <div class="modal">
      <h2 style="display: flex; justify-content: center; align-items: center">
        <span style="flex: 1">Payment</span
        ><span class="price">${{ amount }} USD</span>
      </h2>
      <form id="pay">
        <label>Full Name:</label>
        <div id="full-name" class="form-field">
          <input name="fullName" />
        </div>
        <div class="horizontal" style="width: 100%">
          <div class="vertical" style="flex: 3">
            <label>Card Number:</label>
            <div id="card-number" class="form-field"></div>
          </div>
          <div class="vertical" style="flex: 1">
            <label>CVV:</label>
            <div id="card-cvv" class="form-field"></div>
          </div>
        </div>
        <div class="vertical">
          <label>Street:</label>
          <div id="address" class="form-field"></div>
        </div>
        <div class="horizontal">
          <div class="vertical">
            <label>Zip:</label>
            <div id="zipFirst5" class="form-field"></div>
          </div>
        </div>
        <input type="hidden" id="card-token" />
        <input
          type="button"
          @click="submitPayment"
          name="tokenize_and_pay"
          class="submit-button"
          value="Submit Payment"
        />
      </form>
      <div class="centered"><span id="alert_message"></span></div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  opened: Boolean,
  amount: Number,
});
const emit = defineEmits(["closeModal"]);
const submitPayment = async () => {
  const response = await getToken(props.amount);

  if (response?.response_code === "APR") {
    emit("closeModal");
  }
};

onMounted(() => {
  initializeSDK(config.public.mid, config.public.gatewayPublicKey);
});
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}
.price {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.8;
  line-height: 1.1;
}
.horizontal {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
}
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vertical {
  display: flex;
  flex-direction: column;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}
.container.hidden {
  opacity: 0;
  pointer-events: none;
}
.modal {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  width: calc(100% - 6rem);
  max-width: 20rem;
  flex-direction: column;
  position: absolute;
}
.modal h2 {
  margin-top: 0px;
}
.form-field {
  height: 3rem;
  width: 100%;
}
.form-field input {
  border: 0;
  background: #f1f5f9;
  border-radius: 8px;
  color: #000000;
  width: calc(100% - 1rem);
  height: 1rem;
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
}
.form-field input:focus {
  outline: none;
}
.submit-button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6rem 1.2rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background-color: #3fb883;
  color: #ffffff;
  cursor: pointer;
  transition: border-color 0.25s;
  width: 100%;
}
.submit-button:hover {
  background-color: #329368;
}
#alert_message {
  text-align: center;
  max-width: 14rem;
  font-size: 0.8rem;
  margin-top: 1rem;
}
</style>
