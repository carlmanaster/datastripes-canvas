const makeTestCtx = (root, text) => {
  const label = document.createElement('div')
  root.appendChild(label)
  label.innerText = text

  const canvas = document.createElement('canvas')
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  setSize({ width: 400, height: 60 }, ctx)
  return ctx
}

const root = document.getElementById('root')

const makeNumericSection = () => {
  const props = {
    type: 'numeric',
    width: 100
  }
  let ctx

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Numeric Charts'

  ctx = makeTestCtx(root, 'positive')
  chart(props, testData.nonnegative, ctx)

  ctx = makeTestCtx(root, 'high positive')
  chart(props, testData.highpositive, ctx)

  ctx = makeTestCtx(root, 'mixed')
  chart(props, testData.mixed, ctx)

  ctx = makeTestCtx(root, 'sorted')
  chart(props, testData.sorted, ctx)

  ctx = makeTestCtx(root, 'negative')
  chart(props, testData.nonpositive, ctx)

  ctx = makeTestCtx(root, 'high negative')
  chart(props, testData.highnegative, ctx)

  ctx = makeTestCtx(root, 'offset')
  ctx.translate(100, 0)
  chart(props, testData.sorted, ctx)

  root.appendChild(document.createElement('hr'))
}

const makeBooleanSection = () => {
  const props = {
    type: 'boolean',
    width: 100
  }
  let ctx

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Boolean Charts'

  ctx = makeTestCtx(root, 'boolean')
  chart(props, testData.boolean, ctx)

  ctx = makeTestCtx(root, 'sorted')
  chart(props, testData.sortedBoolean, ctx)

  root.appendChild(document.createElement('hr'))
}

const makeOrdinalSection = () => {
  const props = {
    type: 'ordinal',
    width: 100,
    keys: R.split('', 'abcde')
  }
  let ctx

  const h1 = document.createElement('h1')
  root.appendChild(h1)
  h1.innerText = 'Ordinal Charts'

  ctx = makeTestCtx(root, 'ordinal')
  chart(props, testData.ordinal, ctx)

  ctx = makeTestCtx(root, 'sorted')
  chart(props, testData.sortedOrdinal, ctx)

  root.appendChild(document.createElement('hr'))
}

makeOrdinalSection()
makeBooleanSection()
makeNumericSection()
