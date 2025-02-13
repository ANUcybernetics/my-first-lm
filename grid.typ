#let grid(cols) = {
  set page(
    width: 11in,
    height: 8.5in,
    margin: 0pt
  )

  let page_width = 11in
  let page_height = 8.5in
  let cell_width = page_width / cols
  let cell_height = page_height / cols

  block(
    width: page_width,
    height: page_height,
    {
      // Vertical lines
      for i in range(cols + 1) {
        let x = cell_width * i
        let line_weight = if calc.rem(i, 4) == 0 { 1pt } else { 0.5pt }
        place(
          dx: x,
          line(
            length: page_height,
            angle: 90deg,
            stroke: line_weight + gray
          )
        )
      }

      // Horizontal lines
      for i in range(cols + 1) {
        let y = cell_height * i
        let line_weight = if calc.rem(i, 4) == 0 { 1pt } else { 0.5pt }
        place(
          dy: y,
          line(
            length: page_width,
            stroke: line_weight + gray
          )
        )
      }
    }
  )
}

#grid(10)
