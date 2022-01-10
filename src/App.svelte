<script lang="ts">
  import HexGround from "./lib/HexGround.svelte";
  import HexNow from "./lib/HexNow.svelte";
  import { hex } from "./store/stores";
</script>

<h1 class="blind">컬러타임!</h1>
<main style="background-color:{$hex};">
  <HexNow />
  <HexGround />
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    transition: background-color 100ms ease-out;
  }
</style>
