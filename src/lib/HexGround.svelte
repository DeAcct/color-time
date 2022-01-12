<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { colorData, isHexGroundOpen } from "../store/stores";
  import HexItem from "./HexItem.svelte";
  import TrashIcon from "./TrashIcon.svelte";

  let colorItems: any[];
  const unsubColorItem = colorData.subscribe((value) => {
    colorItems = value;
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
    oldTouch = e.touches[0].clientY;
    document.body.style.overflowY = "hidden";
  }
  function touchMove(e: TouchEvent) {
    if (oldTouch > e.touches[0].clientY) {
      isHexGroundOpen.update(() => true);
    } else if (oldTouch <= e.touches[0].clientY) {
      isHexGroundOpen.update(() => false);
      document.body.style.overflowY = "scroll";
    }
  }

  // function hexItemRootFinder(node: Node){
  //   for (let result = node; node === )
  // }

  function onDelete(e: CustomEvent) {
    console.log(e.detail.dataset.key, colorItems[0].hexID);
    colorItems = colorItems.filter(
      (colorItem) => colorItem.hexID !== Number(e.detail.dataset.key)
    );
    colorData.update(() => [...colorItems]);
    localStorage.setItem("groundColorItem", JSON.stringify(colorItems));
  }

  onDestroy(() => {
    document.body.style.overflowY = "scroll";
    unsubColorItem;
    unsubisHexGroundOpen;
  });
</script>

<div class="hex-gallery {isOpen ? 'hex-gallery--opened' : ''}">
  <div
    class="hex-gallery__title"
    on:touchstart={touchStart}
    on:touchmove={touchMove}
  >
    <h2>컬러그라운드</h2>
  </div>
  {#if colorItems.length !== 0}
    <TrashIcon />
    <ul class="hex-list">
      {#each colorItems as color}
        <HexItem color={color.color} key={color.hexID} on:delete={onDelete} />
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
      width: 10rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      background-color: var(--depth-600);
    }
    &__title {
      width: 100%;
      padding: 5rem 0;
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
      overflow-x: hidden;
      padding: 1rem 2rem 3rem;
    }
    &__alert {
      color: var(--text-900);
    }
  }
  @media screen and (min-width: 1080px) {
    .hex-gallery {
      position: static;
      max-width: 600px;
      height: 50vh;
      transform: none;
      border-radius: 1.5rem;
      &::before {
        content: none;
      }
      &__title h2 {
        font-size: 2rem;
      }
      &__alert {
        font-size: 1.5rem;
      }
    }
  }
</style>
