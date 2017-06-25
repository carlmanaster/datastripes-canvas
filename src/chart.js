const fns = {
  numeric: numericChart,
  boolean: booleanChart
}

const chart = (props, values, ctx) => {
  fns[props.type](props, values, ctx)
}
