const ordinalOverviewChart = (props, values, ctx) => {
  const HEIGHT = 14
  const BINS = 10
  const COLOR = COLOR_BAR_ORDINAL
  const { width, isSelected, keys } = props
  console.log(`keys`, keys)

  const min = N.min(values)
  const max = N.max(values)

  let bins = R.repeat(0, keys.length)
  R.forEach(n => {
    if (n === null) return
    const i = keys.indexOf(n)
    bins[i]++
  }, values)

  let selectedBins = R.repeat(0, keys.length)
  for (var i = 0; i < values.length; i++) {
    if (!isSelected(i)) continue
    const n = values[i]
    if (n === null) continue
    const b = keys.indexOf(n)
    selectedBins[b]++
  }

  const nMax = N.max(bins)
  const scale = v => v * HEIGHT / nMax

  let b = 0

  const drawValue = v => {
    const x = b * width / keys.length
    const y = HEIGHT - scale(v)
    const w = (width / keys.length) - 1
    const height = HEIGHT - y
    G.rect(COLOR, x, y, w, height, ctx)
  }

  const drawBin = v => {
    drawValue(v)
    b++
  }

  R.forEach(drawBin, selectedBins)
}
