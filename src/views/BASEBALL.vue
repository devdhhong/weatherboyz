<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="LUCKYView">
          <HeaderView :title="title" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";

let title = "숫자 야구";
</script>

<style lang="scss" scoped></style>
