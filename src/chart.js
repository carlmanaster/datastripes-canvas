const fns = {
  numeric: numericChart,
  boolean: booleanChart,
  ordinal: ordinalChart
}

const chart = (props, values, ctx) => fns[props.type](props, values, ctx)
