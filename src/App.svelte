<script lang="ts">
  import HexNow from "./lib/HexNow.svelte";

  let hexColor: string;

  function onHexChanged(e: CustomEvent) {
    hexColor = e.detail;
  }
</script>

<!--템플릿 작성-->
<main style="background-color: {hexColor}">
  <HexNow on:hexChanged={onHexChanged} />
</main>

<style>
  main {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
