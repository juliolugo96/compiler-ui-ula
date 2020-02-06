<template>
  <div>
    <h1 class="subtitle">Salida</h1>
    <div class="card">
      <div class="card custom-card limit-block">
        <pre v-show="output">{{ output }}</pre>
        <div v-show="output === ''" class="has-text-centered is-italic">
          <h1 class="subtitle">El resultado se mostrara en esta sección!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "run-shell",
  props: {
    output: {
      required: false,
      default: ""
    }
  }
};
</script>

<style>
.custom-card {
  background: hsl(0, 0%, 96%);
}

.limit-block {
  height: 300px;
  overflow-y: scroll;
}
</style>