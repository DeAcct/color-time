import { readable, writable } from "svelte/store";

const formatter = (origin: number, digits: number) => {
  let result = `${origin}`;
  for (let i = digits; i >= 10; i /= 10) {
    if (origin < i) {
      result = `0${result}`;
    } else {
      return result;
    }
  }
  return result;
};

export const hex = readable({ hour: "00", min: "00", sec: "00" }, (set) => {
  const update = () => {
    const now = new Date();
    const hour = formatter(now.getHours(), 10);
    const min = formatter(now.getMinutes(), 10);
    const sec = formatter(now.getSeconds(), 10);
    return {
      hour: hour,
      min: min,
      sec: sec,
    };
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

export const toast = writable({ show: false, text: "" });
