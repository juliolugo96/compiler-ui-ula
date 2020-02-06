<template>
  <div>
    <h1 class="subtitle">Entrada</h1>
    <div class="card">
      <div class="items-container">
        <div v-for="(item, index) in items" :key="index">
          <div class="columns is-vcentered">
            <div class="column">
              <b-tag>{{ index + 1 }}</b-tag>
            </div>
            <div class="column is-four-fifths">
              <vue-code-highlight>{{ item }}</vue-code-highlight>
            </div>
            <div class="column">
              <b-button @click="removeItem(index)" size="is-small" type="is-danger" outlined>X</b-button>
            </div>
          </div>
        </div>
        <div v-show="items.length === 0" class="has-text-centered is-italic">
          <h1 class="subtitle">Su codigo magico aperecera justo aquí!</h1>
        </div>
      </div>
      <hr />
      <b-field>
        <b-input
          v-model="code"
          @keyup.native.enter="add"
          expanded
          placeholder="Ingrese el codigo"
          type="search"
        ></b-input>
        <p class="control">
          <b-button outlined @click="add" class="button is-primary">Agregar</b-button>
        </p>
      </b-field>
    </div>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";

Array.prototype.customToString = function() {
  let text = "";
  this.forEach(item => (text = `${text}${item}\n`));
  return text;
};

export default {
  name: "editor",
  components: {
    VueCodeHighlight
  },
  props: {
    value: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      items: [],
      code: ""
    };
  },
  watch: {
    value(newVal) {
      if (newVal === "") this.items = [];
    }
  },
  methods: {
    scrollToBottom() {
      const items = document.querySelector(".items-container");
      items.scrollTop = items.scrollHeight;
    },
    add() {
      if (this.code === "") return;
      this.items.push(this.code.trim());
      this.emitCodes();
      this.scrollToBottom();
      this.code = "";
    },
    emitCodes() {
      this.$emit("input", this.items.customToString());
    },
    addItems() {
      if (!this.value) return;
      this.items = this.value.split("\n");
    },
    removeItem(index) {
      this.items.splice(index, 1);
      this.emitCodes();
    }
  },
  created() {
    this.addItems();
  }
};
</script>

<style scoped>
pre[class*="language-"] {
  margin: 0;
  border-radius: 10px;
}

.items-container {
  height: 215px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>