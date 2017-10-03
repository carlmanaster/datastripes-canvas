let selection = []

const setSelection = s => selection = s

const isSelected = j => selection[j]

const selectBetween = (y0, y1) => {
  const yMin = R.min(y0, y1)
  const yMax = R.max(y0, y1)
  for (let i = 0; i < selection.length; i++) {
    selection[i] = yMin < i && i <= yMax
  }
}

const emptySelection = () => R.repeat(false, selection.length)
const clearSelection = () => { setSelection(emptySelection()) }
