<template><NuxtPage /></template>
<style>
@font-face {
  font-family: "Figtree";
  src: url("./assets/Figtree-VariableFont_wght.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}
:root {
  font-family: "Figtree";
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  color: #9a9fa2;
  background-color: #222529;
}
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
h1 {
  font-size: 3.5rem;
  line-height: 1.1;
}
h2 {
  font-size: 1.5rem;
  font-weight: 600;
  opacity: 0.8;
  line-height: 1.1;
  margin-top: 1rem;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6rem 1.2rem;
  margin-top: 3rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background-color: #16a092;
  color: #ffffff;
  cursor: pointer;
}
button:hover {
  outline: none;
  background-color: #000000;
}
</style>
