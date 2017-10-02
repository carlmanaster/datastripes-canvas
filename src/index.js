const dataHeight = data => Object.values(data)[0].length

const width = 40

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

let chartData = [
  { name: 'one', props: ordinalProps, values: testData.ordinal },
  { name: 'two', props: ordinalProps, values: testData.sortedOrdinal },
  { name: 'three', props: booleanProps, values: testData.boolean },
  { name: 'four', props: numericProps, values: testData.mixed },
  { name: 'five', props: numericProps, values: testData.highnegative },
  { name: 'six', props: numericProps, values: testData.nonpositive },
  { name: 'seven', props: numericProps, values: testData.nonnegative },
  { name: 'eight', props: numericProps, values: testData.highpositive },
]

const root = document.getElementById('root')
const picker = document.getElementById('file-picker')
const spacing = width + 3

const makeCanvas = (root, height = 800) => {
  const canvas = document.createElement('canvas')
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  setSize({ width: 400, height }, ctx)
  return { ctx, canvas }
}

const h1 = document.createElement('h1')

const { canvas, ctx } = makeCanvas(root, dataHeight(testData))
setSelection(R.repeat(false, dataHeight(testData)))

const offsetChart = (index, props, values, ctx) => {
  const dx = index * spacing
  ctx.save()
  ctx.translate(dx, 0)
  chart(props, values, ctx)
  ctx.restore()
}

const refresh = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < chartData.length; i++) {
    const data = chartData[i]
    offsetChart(i, data.props, data.values, ctx)
  }
}

canvas.style.cursor = 'crosshair'

refresh()

let x
let y
let logString

let interval

const f = () => {
  const i = Math.floor(x / spacing)
  const j = y
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
      setSize({ width: columns * spacing, height: rows }, ctx)
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
})

canvas.addEventListener('click', e => {
  const dragged = e.layerY !== yStart
  if (!dragged) {
    const index = Math.floor(x / spacing)
    const t = getTransformation(chartData, index)
    chartData = reorderData(t, chartData)
    setSelection(applyTransformation(t)(selection))
    refresh()
  }
})

root.appendChild(document.createElement('hr'))
