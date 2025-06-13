<template>
    <ion-page>  
        <ion-content :fullscreen="true">
            <div id="container">
                <div id="SettingView">
                    <HeaderView :title="title"/>             
                    <OptionView/>             
                </div>
            </div>
        </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderView from "../components/HeaderView.vue";
import OptionView from "../components/OptionView.vue";

let title = "SETTING";

</script>

<style lang="scss" scoped></style>