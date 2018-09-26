<template>
    <div class="footersection bg-primary text-white">
       &copy; <span v-text="$ml.with('VueJS').get('footer')" ></span>
    </div>
</template>
<script>
export default {
  name: "FooterSection",
  data() {
    return {};
  }
};
</script>

