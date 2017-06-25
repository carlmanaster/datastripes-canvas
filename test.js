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

ctx = makeTestCtx(root, 'numeric chart - positive')
chart(props, testData.nonnegative, ctx)

ctx = makeTestCtx(root, 'numeric chart - high positive')
chart(props, testData.highpositive, ctx)

ctx = makeTestCtx(root, 'numeric chart - mixed')
chart(props, testData.mixed, ctx)

ctx = makeTestCtx(root, 'numeric chart - sorted')
chart(props, testData.sorted, ctx)

ctx = makeTestCtx(root, 'numeric chart - negative')
chart(props, testData.nonpositive, ctx)

ctx = makeTestCtx(root, 'numeric chart - high negative')
chart(props, testData.highnegative, ctx)
