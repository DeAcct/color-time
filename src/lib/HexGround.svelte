<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { colorData, isHexGroundOpen } from "../store/stores";
  import HexItem from "./HexItem.svelte";
  import ShareIcon from "./ShareIcon.svelte";
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
  function onDelete(e: CustomEvent<HTMLElement>) {
    colorItems = colorItems.filter(
      (colorItem) => colorItem.hexID !== Number(e.detail.dataset.key)
    );
    colorData.update(() => [...colorItems]);
    localStorage.setItem("groundColorItem", JSON.stringify(colorItems));
  }

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

  let isMultiSelectMode: boolean;
  let multiSelectedItems: number;
  function onHexItemSelect(e: CustomEvent<HTMLElement>) {
    colorItems.forEach((colorItem) => {
      if (colorItem.hexID === Number(e.detail.dataset.key)) {
        colorItem.isSelected = !colorItem.isSelected;
      }
    });
    multiSelectedItems = colorItems.filter(
      (colorItem) => colorItem.isSelected
    ).length;
    if (!isMultiSelectMode) {
      isMultiSelectMode = true;
    } else if (multiSelectedItems === 0) {
      isMultiSelectMode = false;
    }
    colorData.update(() => colorItems);
  }
  function multiDelete() {
    colorItems = colorItems.filter((colorItem) => !colorItem.isSelected);
    colorData.update(() => colorItems);
    localStorage.setItem("groundColorItem", JSON.stringify(colorItems));
    isMultiSelectMode = false;
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
    {#if isMultiSelectMode}
      <button class="delete-btn" on:click={multiDelete}>
        선택한 색 삭제하기
      </button>
    {/if}
  </div>
  {#if colorItems.length !== 0}
    <TrashIcon />
    <ShareIcon />
    <!--svg <use> 재활용 용도-->
    <ul class="hex-list">
      {#each colorItems as color}
        <HexItem
          color={`#${color.color.hour}${color.color.min}${color.color.sec}`}
          key={color.hexID}
          isSelected={color.isSelected}
          {isMultiSelectMode}
          on:delete={onDelete}
          on:hexItemSelect={onHexItemSelect}
        />
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
      padding: 4.5rem 0;
      min-height: 17rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h2 {
        color: var(--text-900);
        transform: translateY(0.5rem);
        font-size: 1.7rem;
      }
      .delete-btn {
        margin-top: 1.5rem;
        padding: 1rem 1.5rem;
        border-radius: 5rem;
        background-color: var(--selected-700);
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
