<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let color: string;
  export let key: number;
  let hexItem: Node;
  function onDelete() {
    dispatch("delete", hexItem);
  }
</script>

<li class="hex-theme-item" data-key={key} bind:this={hexItem}>
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
  <div class="col-right">
    <button
      class="hex-theme-item__btn hex-theme-item__btn--delete"
      on:click={onDelete}
    >
      <i class="icon">
        <svg viewBox="0 0 24 24">
          <title lang="ko">삭제 아이콘</title>
          <use href="#trash-icon" />
        </svg>
      </i>
    </button>
  </div>
</li>

<style lang="scss">
  .hex-theme-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    background-color: var(--top-item);
    box-shadow: 0 1px 4px var(--depth-100);
    border-radius: 0.75rem;

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
    &__btn {
      width: 3.6rem;
      height: 3.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 150ms ease-out;
      border-radius: 50%;

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
        outline: none;
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
