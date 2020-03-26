<template>
  <div id="app">
    <ul class="nav-bar">
      <li>
        <router-link to="/">
          Hello World
        </router-link>
      </li>
      <li>
        <router-link to="/buy-socks">
          Buy socks
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>
