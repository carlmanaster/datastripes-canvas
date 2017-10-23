const dateOverviewChart = (props, values, ctx) => {
  const HEIGHT = 14
  const BINS = 10
  const COLOR = COLOR_BAR_DATE
  const { width, isSelected } = props

  const min = D.min(values)
  const max = D.max(values)

  let bins = R.repeat(0, BINS)
  R.forEach(d => {
    if (d === null) return
    const n = d.getTime()
    const i = Math.floor((BINS - 1) * (n - min) / (max - min))
    bins[i]++
  }, values)

  let selectedValues = []
  for (var i = 0; i < values.length; i++) {
    if (isSelected(i)) selectedValues.push(values[i])
  }

  let selectedBins = R.repeat(0, BINS)
  for (var i = 0; i < selectedValues.length; i++) {
    const d = selectedValues[i]
    if (d === null) continue
    const n = d.getTime()
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
