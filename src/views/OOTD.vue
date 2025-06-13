<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="OOTDView">
          <HeaderView :title="title" />
          <FashionView></FashionView>
          <LuckyView></LuckyView>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import LuckyView from "@/components/LuckyView.vue";
import FashionView from "@/components/FashionView.vue";

let title = "OOTBZ";
</script>

<style lang="scss" scoped></style>
