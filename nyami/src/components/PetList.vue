<template>
  <div class="row">
    <div
      class="col-sm-6 col-md-4 col-lg-3"
      v-for="petCard in pets"
      v-bind:key="petCard.id"
    >
      <PetCard v-bind:petCard="petCard"></PetCard>
    </div>
  </div>
</template>

<script>
import PetCard from "@/components/PetCard.vue";

export default {
  name: "PetList",
  components: {
    PetCard,
  },
  props: {
    pets: Array,
  },
};
</script>

<style scoped lang="scss">
.page-home .block-list [class*="col-"] {
  padding-bottom: 15px;
}
</style>
