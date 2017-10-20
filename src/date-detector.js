const detectDateFormat = A => {
  if (A.length === 0) return undefined
  let formats = {
    'MM/DD/YYYY': true,
    'DD/MM/YYYY': true
  }
  A.filter(a => a.toLowerCase() !== 'null').forEach(d => {
    const t = d.split('/')
    if (t.length !== 3) {
      formats['MM/DD/YYYY'] = false
      formats['DD/MM/YYYY'] = false
    }
    if (t[0] > 12) formats['MM/DD/YYYY'] = false
    if (t[1] > 12) formats['DD/MM/YYYY'] = false
  })
  if (formats['MM/DD/YYYY']) return 'MM/DD/YYYY'
  if (formats['DD/MM/YYYY']) return 'DD/MM/YYYY'
}
