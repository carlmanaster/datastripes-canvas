const dataHeight = data => Object.values(data)[0].length

const width = 50

const numericProps = {
  isSelected,
  type: 'numeric',
  width
}
const ordinalProps = {
  isSelected,
  type: 'ordinal',
  width,
  keys: R.split('', 'abcde')
}
const booleanProps = {
  isSelected,
  type: 'boolean',
  width
}

const root = document.getElementById('root')
const picker = document.getElementById('file-picker')
const spacing = width + 3
const labelHeight = 20
const overviewHeight = 20
const labelStartY = labelHeight / 2
const totalOverviewStartY = labelHeight
const selectionOverviewStartY = labelHeight + overviewHeight
const dataStartY = labelHeight + 2 * overviewHeight

let chartData = []

const makeCanvas = (root, height = 100) => {
  const canvas = document.createElement('canvas')
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  setSize({ width: 400, height }, ctx)
  return { ctx, canvas }
}

const { canvas, ctx } = makeCanvas(root)

const abbreviate = s => s. length < 10 ? s : s.slice(0, 8) + '...'

const drawChart = (index, props, values, ctx) => {
  const dx = index * spacing
  const dy = dataStartY
  ctx.save()
  ctx.translate(dx, dy)

  chart(props, values, ctx)

  ctx.restore()
}

const drawTotalSummary = (index, props, values, ctx) => {
  const totalProps = Object.assign({}, props, {isSelected: () => true})
  const dx = index * spacing
  const dy = totalOverviewStartY
  ctx.save()
  ctx.translate(dx, dy)

  overviewChart(totalProps, values, ctx)

  ctx.restore()
}

const drawSelectionSummary = (index, props, values, ctx) => {
  const dx = index * spacing
  const dy = selectionOverviewStartY
  ctx.save()
  ctx.translate(dx, dy)

  overviewChart(props, values, ctx)

  ctx.restore()
}

const drawLabel = (index, name, ctx) => {
  const dx = index * spacing
  const dy = labelStartY
  ctx.save()
  ctx.translate(dx, dy)

  const label = abbreviate(name)
  ctx.fillText(label, 0, 0)

  ctx.restore()
}

const refresh = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < chartData.length; i++) {
    const { name, props, values } = chartData[i]
    drawLabel(i, name, ctx)
    drawTotalSummary(i, props, values, ctx)
    drawSelectionSummary(i, props, values, ctx)
    drawChart(i, props, values, ctx)
  }
}

refresh()

let x
let y
let logString
let interval

const logHoveredValue = () => {
  const i = Math.floor(x / spacing)
  const column = chartData[i]
  if (!column) return
  const j = y - dataStartY
  if (j < 0) return
  const s = `${column.name}: ${column.values[j]}`
  if (s === logString) return
  logString = s
  console.log(logString)
}

let brushing = false
let yStart

const startBrushing = e => {
  yStart = e.layerY
  brushing = true
  refresh()
}

const stopBrushing = () => {
  if (!brushing) return
  brushing = false
  refresh()
}

const toBool = s => {
  if (s === null || s === 'null') return null
  const b = s.toString().toLowerCase()
  if (s === 'true') return true
  if (s === 'false') return false
  if (s === '1') return true
  if (s === '0') return false
  return null
}

const toString = s => {
  if (s === null || s === 'null') return null
  return s
}

const toNumber = s => {
  if (s === null || s === 'null') return null
  return parseFloat(s)
}

const makeDataset = d => {
  const columnNames = d[0]
  const data = R.transpose(d.slice(1))
  let dataset = []
  for (var i = 0; i < columnNames.length; i++) {
    const name = columnNames[i]
    const strings = data[i]
    const type = classify(strings)
    const { values, keys } = convert(type, strings)
    const props = { type, isSelected, width, keys }
    dataset.push({ name, props, values })
  }
  return dataset
}

picker.addEventListener('change', e => {
  const file = e.target.files[0]
  if (!file) return
  Papa.parse(file, {
  	download: true,
    skipEmptyLines: true,
  	complete: function(results) {
      const { data } = results
      chartData = makeDataset(data)
      const rows = data.length - 1
      const columns = data[0].length
      setSelection(R.repeat(false, rows))
      setSize({ width: columns * spacing, height: rows + dataStartY }, ctx)
  		refresh()
  	}
  })
})

picker.addEventListener('click', e => {
  picker.value = ''
})

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  startBrushing(e)
})

canvas.addEventListener('mouseup', stopBrushing)

canvas.addEventListener('mouseover', e => (interval = setInterval(logHoveredValue, 1000)))

canvas.addEventListener('mouseleave', e => {
  clearInterval(interval)
  stopBrushing()
})

canvas.addEventListener('mousemove', e => {
  const inLabel = y < labelHeight
  canvas.style.cursor = inLabel ? 'pointer' : 'crosshair'
  if (brushing && !inLabel) {
    selectBetween(yStart - dataStartY, e.layerY - dataStartY)
    refresh()
  }
  x = e.layerX
  y = e.layerY
})

canvas.addEventListener('click', e => {
  const y = e.layerY
  const dragged = y !== yStart
  if (dragged) return
  if (y > dataStartY) {
    clearSelection()
    refresh()
    return
  }
  const index = Math.floor(x / spacing)
  const t = getTransformation(chartData, index)
  chartData = reorderData(t, chartData)
  setSelection(applyTransformation(t)(selection))
  refresh()
})
