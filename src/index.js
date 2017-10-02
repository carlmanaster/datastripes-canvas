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

let chartData = []

const root = document.getElementById('root')
const picker = document.getElementById('file-picker')
const spacing = width + 3
const labelHeight = 20

const makeCanvas = (root, height = 800) => {
  const canvas = document.createElement('canvas')
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  setSize({ width: 400, height }, ctx)
  return { ctx, canvas }
}

const h1 = document.createElement('h1')

const { canvas, ctx } = makeCanvas(root)

const offsetChart = (index, name, props, values, ctx) => {
  const dx = index * spacing
  const dy = labelHeight
  ctx.save()
  ctx.translate(dx, dy)

  let label = name
  if (label.length > 10) label = label.slice(0, 8) + '...'

  ctx.fillText(label, 0, -labelHeight / 2)

  chart(props, values, ctx)
  ctx.restore()
}

const refresh = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < chartData.length; i++) {
    const data = chartData[i]
    offsetChart(i, data.name, data.props, data.values, ctx)
  }
}

refresh()

let x
let y
let logString

let interval

const f = () => {
  const i = Math.floor(x / spacing)
  const j = y - labelHeight
  if (j < 0) return
  const d = chartData[i]
  if (!d) return
  const s = `${d.name}: ${d.values[j]}`
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
      setSize({ width: columns * spacing, height: rows + labelHeight }, ctx)
  		refresh()
  	}
  })
})

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  startBrushing(e)
})

canvas.addEventListener('mouseup', stopBrushing)

canvas.addEventListener('mouseover', e => (interval = setInterval(f, 1000)))

canvas.addEventListener('mouseleave', e => {
  clearInterval(interval)
  stopBrushing()
})

canvas.addEventListener('mousemove', e => {
  if (brushing) {
    selectBetween(yStart, e.layerY)
    refresh()
  }
  x = e.layerX
  y = e.layerY

  canvas.style.cursor = y < labelHeight ? 'pointer' : 'crosshair'
})

canvas.addEventListener('click', e => {
  const y = e.layerY
  const dragged = y !== yStart
  if (dragged) return
  if (y > labelHeight) return
  const index = Math.floor(x / spacing)
  const t = getTransformation(chartData, index)
  chartData = reorderData(t, chartData)
  setSelection(applyTransformation(t)(selection))
  refresh()
})

root.appendChild(document.createElement('hr'))
