<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { toast } from "../store/stores";

  const dispatch = createEventDispatcher();

  export let color: string;
  export let key: number;
  let hexItem: Node;
  function onDelete() {
    dispatch("delete", hexItem);
  }

  export let isSelected: boolean;
  export let isMultiSelectMode: boolean;

  function hexItemSelect() {
    dispatch("hexItemSelect", hexItem);
  }

  const delay = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  async function onShare() {
    try {
      await navigator.clipboard.writeText(color);
      toast.update(() => ({ show: true, text: "공유 성공!" }));
      await delay(1000);
      toast.update((data) => ({ ...data, show: false }));
      await delay(100);
      toast.update((data) => ({ ...data, text: "" }));
    } catch {
      console.error("공유실패");
    }
  }
</script>

<li
  class="hex-theme-item {isSelected ? 'hex-theme-item--selected' : ''}"
  data-key={key}
  bind:this={hexItem}
  on:contextmenu|preventDefault
  on:click={hexItemSelect}
>
  <div class="col-left">
    <i
      class="hex-theme-item__thumb"
      style="background-color:{color}"
      role="presentation"
    />
    <span class="hex-theme-item__value">
      {color}
    </span>
  </div>
  {#if !isMultiSelectMode}
    <div class="col-right">
      <button
        class="hex-theme-item__btn hex-theme-item__btn--share"
        on:click|stopPropagation={onShare}
      >
        <i class="icon">
          <svg viewBox="0 0 24 24">
            <title lang="ko">공유</title>
            <use href="#share-icon" />
          </svg>
        </i>
      </button>
      <button
        class="hex-theme-item__btn hex-theme-item__btn--delete"
        on:click|stopPropagation={onDelete}
      >
        <i class="icon">
          <svg viewBox="0 0 24 24">
            <title lang="ko">삭제</title>
            <use href="#trash-icon" />
          </svg>
        </i>
      </button>
    </div>
  {/if}
</li>

<style lang="scss">
  .hex-theme-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    background-color: var(--top-item);
    box-shadow: 0 1px 4px var(--depth-100);
    border: 3px solid transparent;
    border-radius: 0.75rem;
    transition: 150ms ease-out;

    &--selected {
      background-color: var(--selected-500);
      .hex-theme-item__value {
        color: #fff;
      }
    }

    .col-left {
      display: flex;
      align-items: center;
    }
    &__thumb {
      display: flex;
      width: 5rem;
      height: 5rem;
      border-radius: 0.375rem;
    }
    &__value {
      color: var(--text-900);
      font-size: 2rem;
      margin-left: 1rem;
    }

    .col-right {
      display: flex;
    }
    &__btn {
      width: 3.6rem;
      height: 3.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 150ms ease-out;
      border-radius: 50%;
      outline: none;

      .icon {
        width: 2.4rem;
        height: 2.4rem;
        fill: var(--text-900);
      }
      &:active {
        background-color: var(--depth-800);
      }
      &:focus,
      &:hover {
        background-color: var(--depth-900);
        border: 1px solid var(--depth-100);
      }
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
  @media screen and (min-width: 1080px) {
    .hex-theme-item {
      &__thumb {
        width: 7rem;
        height: 7rem;
      }
    }
  }
</style>
