#let grid(cols) = {
  set page(
    width: 11in,
    height: 8.5in,
    margin: 0pt
  )
  table(
    columns: (1fr,) * cols,
    rows: (1fr,) * cols,
    inset: 0pt,
    fill: none,
    stroke: 0.5pt + gray,
    ..range(0, cols * cols).map(_ => [])
  )
}

#grid(10)
