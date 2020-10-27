<template>
  <div>
    {{ item.first_name }} {{ item.last_name }}
    <br>
    <small>{{ item.email }}</small>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
