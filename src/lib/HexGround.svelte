<script lang="ts">
  import HexItem from "./HexItem.svelte";
  import { colorData, isHexGroundOpen } from "../store/stores";
  import { onDestroy, onMount } from "svelte";

  let colorThemes: any[];
  const unsubColorThemes = colorData.subscribe((value) => {
    colorThemes = value;
  });
  onMount(() => {
    if (localStorage.getItem("groundColorItem")) {
      const localColorItem = JSON.parse(
        localStorage.getItem("groundColorItem")
      );
      colorData.update(() => [...localColorItem]);
    }
  });

  let oldTouch: number;
  let isOpen: boolean;
  const unsubisHexGroundOpen = isHexGroundOpen.subscribe((value) => {
    isOpen = value;
  });
  function touchStart(e: TouchEvent) {
    console.log(e);
    oldTouch = e.touches[0].clientY;
    document.body.style.overflowY = "hidden";
  }
  function touchMove(e: TouchEvent) {
    console.log(e.touches[0].clientY, oldTouch, isOpen);
    if (oldTouch > e.touches[0].clientY) {
      console.log("ddd");
      isHexGroundOpen.update(() => true);
    } else if (oldTouch <= e.touches[0].clientY) {
      console.log("ddd");
      isHexGroundOpen.update(() => false);
      document.body.style.overflowY = "scroll";
    }
  }

  function resize() {}

  onDestroy(() => {
    document.body.style.overflowY = "scroll";
    unsubColorThemes;
    unsubisHexGroundOpen;
  });
</script>

<svelte:window on:resize={resize} />

<div class="hex-gallery {isOpen ? 'hex-gallery--opened' : ''}">
  <div class="title" on:touchstart={touchStart} on:touchmove={touchMove}>
    <h2>컬러그라운드</h2>
  </div>
  {#if colorThemes.length !== 0}
    <ul class="hex-list">
      {#each colorThemes as color}
        <HexItem {color} />
      {/each}
    </ul>
  {:else}
    <p class="hex-gallery__alert">아직 추가된 색상이 없어요</p>
  {/if}
</div>

<style lang="scss">
  .hex-gallery {
    position: fixed;
    top: 0;
    transform: translateY(calc(100vh - 13rem));
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: var(--depth-900);
    height: calc(100vh - 15rem);
    border-radius: 1.5rem 1.5rem 0 0;
    transition: transform 500ms ease-out;
    &--opened {
      transform: translateY(15rem);
    }

    &::before {
      content: "";
      position: absolute;
      top: 1rem;
      width: 20vw;
      height: 0.6rem;
      border-radius: 0.3rem;
      background-color: var(--depth-600);
    }
    .title {
      width: 100%;
      height: 15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      h2 {
        color: var(--text-900);
        transform: translateY(0.5rem);
        font-size: 1.7rem;
      }
    }
    .hex-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: calc(100vh - 21rem);
      overflow-y: scroll;
      padding: 1rem 2rem 3rem;
    }
    &__alert {
      color: #000;
    }
  }
</style>
