<template lang="html">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    :viewBox="viewbox"
    :id="baseId">
      <path :id="pathId" />
  </svg>
</template>

<script>
export default {
  props: ['viewbox', 'baseId'],
  computed: {
    pathId () {
      return `${this.baseId}-path`
    }
  }
}
</script>
