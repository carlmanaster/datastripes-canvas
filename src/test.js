const makeTestCanvas = (root, text) => {
  const label = document.createElement('div')
  root.appendChild(label)
  label.innerText = text

  const canvas = document.createElement('canvas')
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  setSize({ width: 400, height: 60 }, ctx)
  return { ctx, canvas }
}

const root = document.getElementById('root')

const isSelected = j => j > 3 && j < 12

const makeNumericSection = () => {
  const props = {
    isSelected,
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

  canvas.style.cursor = 'crosshair'

  const offsetChart = (index, props, values, ctx) => {
    const dx = index * spacing
    ctx.save()
    ctx.translate(dx, 0)
    chart(props, values, ctx)
    ctx.restore()
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

  for (let i = 0; i < chartData.length; i++) {
    const data = chartData[i]
    offsetChart(i, data.props, data.values, ctx)
  }

  let x
  let y
  let logString

  let interval

  const f = () => {
    const i = Math.floor(x / spacing)
    const j = y
    const d = chartData[i]
    const s = `${d.name}: ${d.values[j]}`
    if (s === logString) return
    logString = s
    console.log(logString)
  }

  canvas.addEventListener('click', console.log)

  canvas.addEventListener('mouseover', e => (interval = setInterval(f, 1000)))

  canvas.addEventListener('mouseleave', e => clearInterval(interval))

  canvas.addEventListener('mousemove', e => {
    x = e.layerX
    y = e.layerY
  })

  root.appendChild(document.createElement('hr'))
}

makeMultipleSection()
makeOrdinalSection()
makeBooleanSection()
makeNumericSection()
