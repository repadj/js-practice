<script setup lang="ts">
</script>

<template>
  <div id="box">
    <router-view />
  </div>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    background: rgb(65,184,131);
    background: linear-gradient(90deg, rgba(65,184,131,1) 0%, rgba(255,255,255,1) 50%, rgba(65,184,131,1) 100%);
  }
</style>

<style scoped>
  #box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 700px;
    box-shadow: lightslategray 0 0 10px;
    background-color: #41B883;
    border-radius: 15px;
    border: 3px solid #34495E;
  }
</style>
