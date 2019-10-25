# Nuxt Chuck

## Info

This module simply adds a component to NuxtJS for displaying a random Chuck Norris joke.  The package has it's own database so no API calls are made, relying on VueX for fetching and rendering the data from a JSON file.

## Installation

Simply run:

```
npm install --save @codetheorist/nuxt-chuck
```

This will install the module and save it as a dependency.  Once this is done you need to add the module to `nuxt.config.js`. It should look like the following:

```
modules: [
  // With options
  ['@codetheorist/nuxt-chuck',
    {
      namespace: 'norris'
    }
  ],
  // Without options, namespace is 'chuck' by default.
  '@codetheorist/nuxt-chuck'
]
```

This will give you access to the chuck joke component globally.

```
<chuck-joke />
```