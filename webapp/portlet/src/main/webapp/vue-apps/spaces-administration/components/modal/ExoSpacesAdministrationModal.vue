<template>
  <div class="modal-mask uiPopupWrapper">
    <div :class="modalClass" class="uiPopup modal-content">
      <div class="popupHeader">
        <span class="PopupTitle popupTitle">{{ title }}</span>
        <a
          v-if="displayClose"
          class="uiIconClose pull-right"
          @click="closeModal"></a>
        <v-btn
          v-else
          icon
          class="closeBindingModal"
          @click="closeModal">
          <v-icon
            large
            color="#5f708a"
            class="closeIcon">
            close
          </v-icon>
        </v-btn>
      </div>
      <div class="PopupContent popupContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    modalClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeModal() {
      // Emit the click event of close icon
      this.$emit('modal-closed');
    }
  }
};
</script>


