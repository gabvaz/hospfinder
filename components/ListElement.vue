<template>
    <div class="listDetails">
        <p class="elTitle">{{name}}</p>
        <p class="elPlace">{{location}}</p>
    </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: false
    }
  },
};
</script>

<style>
.elTitle {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: .5rem;
}
.elPlace {
    font-size: 14px;
    font-weight: 400;
}
</style>