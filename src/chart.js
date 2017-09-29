const fns = {
  numeric: numericChart,
  boolean: booleanChart,
  ordinal: ordinalChart
}

const overviewFns = {
  numeric: numericOverviewChart,
  ordinal: ordinalOverviewChart,
  // boolean: booleanOverviewChart,
}

const chart = (props, values, ctx) => fns[props.type](props, values, ctx)
const overviewChart = (props, values, ctx) => overviewFns[props.type](props, values, ctx)
