const numericOverviewChart = (props, values, ctx) => {
  const HEIGHT = 14
  const BINS = 10
  const COLOR = COLOR_BAR_NUMERIC_POSITIVE
  const { width, isSelected } = props

  const min = N.min(values)
  const max = N.max(values)

  let bins = R.repeat(0, BINS)
  R.forEach(n => {
    if (n === null) return
    const i = Math.floor((BINS - 1) * (n - min) / (max - min))
    bins[i]++
  }, values)

  let selectedBins = R.repeat(0, BINS)
  for (var i = 0; i < values.length; i++) {
    if (!isSelected(i)) continue
    const n = values[i]
    if (n === null) continue
    const b = Math.floor((BINS - 1) * (n - min) / (max - min))
    selectedBins[b]++
  }

  const nMax = N.max(bins)
  const scale = v => v * HEIGHT / nMax

  let b = 0

  const drawValue = v => {
    const x = b * width / BINS
    const y = HEIGHT - scale(v)
    const w = width / BINS
    const height = HEIGHT - y
    G.rect(COLOR, x, y, w, height, ctx)
  }

  const drawBin = v => {
    drawValue(v)
    b++
  }

  R.forEach(drawBin, selectedBins)
}
