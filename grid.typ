#let grid(cols, ratio: 4) = {
  set page(
    width: 11in,
    height: 11in,
    margin: 0pt
  )

  let page_width = 11in
  let page_height = 11in

  // Adjust remaining width/height after accounting for double-width first row/column
  let first_cell_width = page_width / (cols * (1/ratio))
  let first_cell_height = page_height / (cols * (1/ratio))
  let remaining_width = page_width - first_cell_width
  let remaining_height = page_height - first_cell_height
  let cell_width = remaining_width / (cols - 1)
  let cell_height = remaining_height / (cols - 1)

  block(
    width: page_width,
    height: page_height,
    {
      // Vertical lines
      for i in range(cols + 1) {
        let x = if i == 0 { 0in }
               else if i == 1 { first_cell_width }
               else { first_cell_width + cell_width * (i - 1) }
        let line_weight = if calc.rem(i - 1, 4) == 0 { 1pt } else { 0.5pt }
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
        let y = if i == 0 { 0in }
               else if i == 1 { first_cell_height }
               else { first_cell_height + cell_height * (i - 1) }
        let line_weight = if calc.rem(i - 1, 4) == 0 { 1pt } else { 0.5pt }
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

#grid(33)
