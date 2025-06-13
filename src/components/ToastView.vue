<template>
  <div id="ToastView" v-if="visible" :class="toastClass" @click="closeToast">
    {{ message }}
  </div>
</template>

  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        toastClass: '',
      };
    },
    methods: {
      showToast(message, type = 'info') {
        this.message = message;
        this.toastClass = type;
        this.visible = true;

        setTimeout(() => {
          this.visible = false;
        }, 3000); // 3초 후에 토스트 숨기기
      },
      closeToast() {
        this.visible = false;
      },
    },
  };
</script>
  
<style lang="scss" scoped>

#ToastView {
  z-index: 9999;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  transition: opacity 0.5s;

  &.info {
    background-color: #2196F3;
  }

  &.success {
    background-color: #4CAF50;
  }

  &.error {
    background-color: #F44336;
  }
}
</style>
  