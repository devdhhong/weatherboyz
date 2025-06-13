<template>
  
    <div id="ModalView" v-show="!isHideModal">
      <!-- <div class="modal-wrap" v-show="!isHideModal">
        <div class="modal-container">
          sdfsdfdsf
          <div class="modal-btn">
            <button @click="btnClose">닫기</button>
            <button @click="modalOpen">확인</button>
          </div>
        </div>
      </div> -->
    <div class="modalWrap"></div>


    <!-- </div> -->


    <div class="modalContents">
      <div class="modalHeader">
        <div class="btnClose" @click="btnClose" style="visibility: hidden;">
          <i class="fa-solid fa-xmark fa-xl"></i>
        </div>
        <div class="title">
          <!-- <p>일주일간 보지않기</p> -->
        </div>
        <div class="btnClose" @click="btnClose">
          <i class="fa-solid fa-xmark fa-xl"></i>
        </div>
      </div>

      <br><br><br>
      <br><br><br>
      <br><br><br>
      <br><br><br>
      <br><br><br>
      <br><br><br>

      <div class="modalBtn">
        <button @click="btnClose">닫기</button>
        <!-- <button @click="btnConfirm">확인</button> -->
      </div>
      <!-- <img :src="imgPath" alt=""> -->
    </div>
  </div>
</template>

<script>

export default {
  mounted() {

  },
  data() {
    return {
      isHideModal: false,
      // imgPath: "",
      // temperature: "",
    }
  },
  methods: {
    btnClose: function () {
      setLocalStorageItem("isHideModal", true);
      this.isHideModal = true;
      // this.$router.back();
    },
  },
}

</script>

<style lang="scss" scoped>
@import "../scss/common.scss";
// @import "../scss/reset.scss";
// @import "../scss/theme.scss";

#ModalView {
  width: 80%;
  height: 60%;
  position: fixed;
  top: 15%;
  left: 10%;

  /* dimmed */
  .modalWrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
  }

  .modalHeader {
    @include center-sb;
    padding: 5%;

    div {
      // @include center-sb;
      div {
        padding: 5%;
      }

      .title {
        p {
          @include text-style-1;
          color: var(--text-color-2);
        }
      }
    }
  }

  .modalContents {
    background: white;
    border-radius: 15px;
  }

  .modalBtn {
    display: flex;
    width: 100%;
    padding: 10px;
    gap: 10px; /* 버튼 간의 간격 */

    button {
      @include center;
      // @include left;
      @include text-style-3;
      color: var(--text-color-2);
      width: 100%;
      height: 40px;
      background-color: var(--background-color-1);
      border-radius: 10px;
      flex: 1; /* 각 버튼이 동일한 공간을 차지하도록 설정 */
    }
  }
}

</style>
