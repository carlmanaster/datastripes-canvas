const fns = {
  numeric: numericChart,
  boolean: booleanChart,
  ordinal: ordinalChart,
  date: dateChart
}

const overviewFns = {
  numeric: numericOverviewChart,
  ordinal: ordinalOverviewChart,
  boolean: booleanOverviewChart,
  date: dateOverviewChart
}

const chart = (props, values, ctx) => fns[props.type](props, values, ctx)
const overviewChart = (props, values, ctx) => overviewFns[props.type](props, values, ctx)
