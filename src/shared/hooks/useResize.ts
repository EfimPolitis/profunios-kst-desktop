export const useResize = (width: number, height: number) => {
  let x = (window.screen.width - width) / 2
  let y = (window.screen.height - height) / 2 - 20
  window.api.setWindowSize(width, height, x, y)
}
