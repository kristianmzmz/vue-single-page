<template>
  <div id="app">
    <ul class="nav-bar">
      <li>
        <router-link :to="{ name: 'home' }">
          Hello World
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'product-details' }">
          Check our socks
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>
