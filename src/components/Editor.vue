<template>
  <div>
    <h1 class="subtitle">
      Entrada
      <b-field id="lang">
        <b-select v-model="lang" @change.native="$emit('lang')" placeholder="Seleccione">
          <option v-for="lang in langs" :value="lang.code" :key="lang.code">{{ lang.name }}</option>
        </b-select>
      </b-field>
    </h1>
    <div class="card">
      <div class="items-container">
        <transition-group name="fade" tag="div" v-for="(item, i) in items" :key="i">
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
        </transition-group>
        <transition>
          <div v-show="items.length === 0" class="has-text-centered is-italic">
            <h1 class="subtitle">Su codigo magico aperecera justo aquí!</h1>
          </div>
        </transition>
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
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      langs: [
        {
          name: "Python",
          code: "python"
        },
        {
          name: "C++",
          code: "cplusplus"
        },
        {
          name: "ULA",
          code: "ula"
        },
        {
          name: "Javascript/node",
          code: "node"
        }
      ],
      lang: "ula",
      items: [],
      code: ""
    };
  },
  watch: {
    value(newVal) {
      if (!newVal.codes) this.items = [];
    }
  },
  methods: {
    add() {
      if (this.code === "") return;
      this.items.push(this.code.trim());
      this.emitCodes();
      this.code = "";
    },
    emitCodes() {
      this.$emit("input", {
        codes: this.items.customToString(),
        lang: this.lang
      });
    },
    addItems() {
      if (!this.value.codes) return;
      this.items = this.value.codes.split("\n");
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#lang {
  float: right;
}
</style>