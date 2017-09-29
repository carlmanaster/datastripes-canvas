const makeTestCanvas = (root, text, height = 60) => {
  const label = document.createElement('div')
  root.appendChild(label)
  label.innerText = text

  const canvas = document.createElement('canvas')
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  setSize({ width: 400, height }, ctx)
  return { ctx, canvas }
}

const root = document.getElementById('root')

let selection = testData.selection.slice()

const isSelected = j => selection[j]

const selectBetween = (y0, y1) => {
  const yMin = R.min(y0, y1)
  const yMax = R.max(y0, y1)
  for (let i = 0; i < selection.length; i++) {
    selection[i] = yMin < i && i <= yMax
  }
}

const clearSelection = () => {
  selection = R.repeat(false, selection.length)
}

const makeOverviewSection = () => {
  const numericPropsAll = {
    isSelected: () => true,
    type: 'numeric',
    width: 100
  }
  const numericPropsSome = {
    isSelected: i => i % 2 === 0,
    type: 'numeric',
    width: 100
  }
  const ordinalPropsAll = {
    isSelected: () => true,
    type: 'ordinal',
    width: 100,
    keys: R.split('', 'abcde')
  }
  const ordinalPropsSome = {
    isSelected: i => i % 2 === 0,
    type: 'ordinal',
    width: 100,
    keys: R.split('', 'abcde')
  }
  let ctx

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Overview Charts'

  ctx = makeTestCanvas(root, 'numeric-all', 30).ctx
  overviewChart(numericPropsAll, testData.mixed, ctx)

  ctx = makeTestCanvas(root, 'numeric-selected', 30).ctx
  overviewChart(numericPropsSome, testData.mixed, ctx)

  ctx = makeTestCanvas(root, 'ordinal-all', 30).ctx
  overviewChart(ordinalPropsAll, testData.ordinal, ctx)

  ctx = makeTestCanvas(root, 'ordinal-selected', 30).ctx
  overviewChart(ordinalPropsSome, testData.ordinal, ctx)

  root.appendChild(document.createElement('hr'))
}

const makeNumericSection = () => {
  const props = {
    isSelected,
    type: 'numeric',
    width: 100
  }
  let ctx

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Numeric Charts'

  ctx = makeTestCanvas(root, 'positive').ctx
  chart(props, testData.nonnegative, ctx)

  ctx = makeTestCanvas(root, 'high positive').ctx
  chart(props, testData.highpositive, ctx)

  ctx = makeTestCanvas(root, 'mixed').ctx
  chart(props, testData.mixed, ctx)

  ctx = makeTestCanvas(root, 'sorted').ctx
  chart(props, testData.sorted, ctx)

  ctx = makeTestCanvas(root, 'negative').ctx
  chart(props, testData.nonpositive, ctx)

  ctx = makeTestCanvas(root, 'high negative').ctx
  chart(props, testData.highnegative, ctx)

  ctx = makeTestCanvas(root, 'offset').ctx
  ctx.translate(100, 0)
  chart(props, testData.sorted, ctx)

  root.appendChild(document.createElement('hr'))
}

const makeBooleanSection = () => {
  const props = {
    isSelected,
    type: 'boolean',
    width: 100
  }
  let ctx

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Boolean Charts'

  ctx = makeTestCanvas(root, 'boolean').ctx
  chart(props, testData.boolean, ctx)

  ctx = makeTestCanvas(root, 'sorted').ctx
  chart(props, testData.sortedBoolean, ctx)

  root.appendChild(document.createElement('hr'))
}

const makeOrdinalSection = () => {
  const props = {
    isSelected,
    type: 'ordinal',
    width: 100,
    keys: R.split('', 'abcde')
  }
  let ctx

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Ordinal Charts'

  ctx = makeTestCanvas(root, 'ordinal').ctx
  chart(props, testData.ordinal, ctx)

  ctx = makeTestCanvas(root, 'sorted').ctx
  chart(props, testData.sortedOrdinal, ctx)

  root.appendChild(document.createElement('hr'))
}

const makeMultipleSection = () => {
  const width = 40
  const spacing = width + 3
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

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Multiple Charts'

  const { canvas, ctx } = makeTestCanvas(root, 'multiple')

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
      selection = applyTransformation(t)(selection)
      refresh()
    }
  })

  root.appendChild(document.createElement('hr'))
}

makeOverviewSection()
makeMultipleSection()
makeNumericSection()
makeOrdinalSection()
makeBooleanSection()
