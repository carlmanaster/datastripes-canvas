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
let ctx

const props = {
  type: 'numeric',
  width: 100
}

const NUMERIC = document.createElement('h1')
root.appendChild(NUMERIC)
NUMERIC.innerText = 'Numeric Charts'

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

root.appendChild(document.createElement('hr'))
