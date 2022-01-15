<script lang="ts">
  import HexGround from "./lib/HexGround.svelte";
  import HexNow from "./lib/HexNow.svelte";
  import Toast from "./lib/Toast.svelte";
  import { hex, toast } from "./store/stores";
</script>

<h1 class="blind">컬러타임!</h1>
<main style="background-color:{`#${$hex.hour}${$hex.min}${$hex.sec}`};">
  <HexNow />
  <HexGround />
  <Toast show={$toast.show}>
    <span slot="text">
      {$toast.text}
    </span>
  </Toast>
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
