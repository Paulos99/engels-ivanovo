let locks = 0;
let saved = { overflow: "", paddingRight: "" };
export function lockScroll() {
  if (locks++ === 0) {
    saved = { overflow: document.body.style.overflow, paddingRight: document.body.style.paddingRight };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${padding + gap}px`;
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) Object.assign(document.body.style, saved);
  };
}
