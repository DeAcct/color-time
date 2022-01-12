<script lang="ts">
  import { onDestroy } from "svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import { hex, colorData, isHexGroundOpen } from "../store/stores";
  let now = new Date();

  const getWhatDay = (origin: number): string => {
    switch (origin) {
      case 0:
        return "일";
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
    }
  };
  $: year = now.getFullYear();
  $: month = now.getMonth() + 1;
  $: date = now.getDate();
  $: day = getWhatDay(now.getDay());
  $: yymmddDay = `${year}년 ${month}월 ${date}일 ${day}요일`;

  let hexID = 0;
  function colorAppend() {
    colorData.update((data) => [{ hexID: hexID++, color: $hex }, ...data]);
    localStorage.setItem("groundColorItem", JSON.stringify($colorData));
  }

  let isSmallize: boolean;
  const unsubisHexGroundOpen = isHexGroundOpen.subscribe((value) => {
    isSmallize = value;
  });

  onDestroy(() => {
    unsubisHexGroundOpen;
  });
</script>

<div class="hex-now {isSmallize ? 'hex-now--reduced' : ''}">
  <h2 class="blind">시간</h2>
  <div class="row-top">
    <p class="hex-now__date">
      {yymmddDay}
    </p>
    {#key $hex}
      <strong
        class="hex-now__time"
        aria-live="polite"
        transition:slide={{ duration: 300, easing: quintOut }}
      >
        {$hex}
      </strong>
    {/key}
  </div>
  <button class="hex-now__append" on:click={colorAppend}>
    이 컬러 기억하기
  </button>
</div>

<style lang="scss">
  .hex-now {
    display: flex;
    position: fixed;
    width: 100%;
    height: 8rem;
    overflow: hidden;
    padding: 0 2rem;
    justify-content: space-between;
    transition: 500ms ease-out;

    &__date {
      font-size: 1.3rem;
      font-weight: 500;
      color: #fff;
    }
    &__time {
      font-weight: 100;
      font-size: 4rem;
      display: flex;
      flex-direction: column;
    }
    &__append {
      align-self: center;
      padding: 1rem 1.5rem;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 4rem;
    }

    &--reduced {
      transform: translateY(calc(-50vh + 8rem));
    }
  }
  @media screen and (min-width: 1080px) {
    .hex-now {
      position: static;
      max-width: 600px;
      margin-bottom: 3rem;
    }
  }
</style>
