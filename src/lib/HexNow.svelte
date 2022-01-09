<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  let now = new Date();

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
      dispatch("hexChanged", hex);
    }, 1000);
  });

  //$는 watch와 비슷하다
  const timeFormatter = (origin: number): string =>
    origin >= 10 ? `${origin}` : `0${origin}`;
  $: hour = timeFormatter(now.getHours());
  $: min = timeFormatter(now.getMinutes());
  $: sec = timeFormatter(now.getSeconds());
  $: hex = `#${hour}${min}${sec}`;

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

  let success: string = "";

  async function share() {
    try {
      await navigator.share({
        title: document.title,
        text: `${hex}... I like it!`,
        url: "https://colortime.hyse.kr",
      });
      success = "성공!";
    } catch {
      success = "공유 창을 열지 못했어요ㅠㅠ";
    }
  }
</script>

<div class="hex-now" aria-live="polite">
  <div class="col-top">
    <p class="hex-now__date">{yymmddDay}</p>
    <strong class="hex-now__time"> {hex} </strong>
  </div>
  <button on:click={share} class="hex-now__share-btn"
    >색상 공유 {success}</button
  >
</div>

<style lang="scss">
  .hex-now {
    &__date {
      font-size: 1.3rem;
      font-weight: 500;
    }
    &__time {
      color: #fff;
      font-weight: 100;
      font-size: 6rem;
    }
    &__share-btn {
      font-size: 1.1rem;
    }
  }
</style>
