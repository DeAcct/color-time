import { readable, writable } from "svelte/store";

export const hex = readable("#000000", (set) => {
  const formatter = (origin: number, notation: number): string =>
    origin >= notation ? `${origin}` : `0${origin}`;

  const update = () => {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    return `#${formatter(hour, 10)}${formatter(min, 10)}${formatter(sec, 10)}`;
  };

  update();
  set(update());

  const interval = setInterval(() => {
    set(update());
  }, 1000);

  return () => clearInterval(interval);
});

export const colorData = writable([]);

export const isHexGroundOpen = writable(false);
