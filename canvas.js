const setSize = (size, ctx) => {
  const { width, height } = size
  ctx.canvas.width = width
  ctx.canvas.height = height
}

const fillWindow = ctx => {
  const width = window.innerWidth
  const height = window.innerHeight
  setSize({ width, height }, ctx)
}
