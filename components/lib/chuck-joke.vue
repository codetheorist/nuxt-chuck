<template lang="html">
  <div class="chuck-joke">
    <!-- Basic html to render the current count and provide adjustment buttons -->
    <h1>{{ joke.joke ? joke.joke : '' }}</h1>
    <button class="chuck-joke--button" @click="random()">Get Joke</button>
  </div>
</template>

<script>
// components/lib/counterAdjuster.vue
export default {
  name: 'chuck-joke',
  computed: {
    pluginOptions() {
      // _chuckOptions will be added as a prop on component registration.
      // it will be the plugin's options object
      return this._chuckOptions || {}
    },
    // helper to get the name of our injected plugin using the namespace option
    injectedPluginName() {
      const { pluginOptions } = this
      return pluginOptions.namespace ? '$' + pluginOptions.namespace : undefined
    },
    // helper to return the current value of the counter using our injected plugin function
    joke() {
      const { injectedPluginName } = this
      return injectedPluginName
        ? this[injectedPluginName].value() // same as this.$count.value()
        : undefined
    }
  },
  methods: {
    // Method to fetch a random Chuck Norris joke using our injected plugin function
    random() {
      const { injectedPluginName } = this
      this[injectedPluginName].random()
    }
  }
}
</script>
