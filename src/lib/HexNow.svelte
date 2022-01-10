<script lang="ts">
  import { onDestroy } from "svelte";

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

  function colorAppend() {
    colorData.update((data) => [$hex, ...data]);
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
    <strong class="hex-now__time" aria-live="polite"> {$hex} </strong>
  </div>
  <button class="hex-now__append" on:click={colorAppend}>
    이 컬러 기억하기
  </button>
</div>

<style lang="scss">
  .hex-now {
    display: flex;
    position: fixed;
    width: calc(100% - 4rem);
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
</style>
