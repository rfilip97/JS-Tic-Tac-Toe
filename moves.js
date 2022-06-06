///**************************************************************************************
/// GLOBALS
///**************************************************************************************

/* Flag to mark if we can still place symbols on the board */
let running = true;

/* Player currently moving. Can be "X" or "O" */
let side_to_move = "X";

/* Current board state */
let board = [
  "-1",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
  "blank",
];

const winning_positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
///**************************************************************************************
/// FUNCTIONS
///**************************************************************************************

/**
 * Get the id string representing the given square
 * @param {number} square_number the number of the square, ranging between 1 and 9
 * @return resulted square id
 */
function get_square_id(square_number) {
  let square_id = "";
  switch (square_number) {
    case 1:
      square_id = "1";
      break;
    case 2:
      square_id = "2";
      break;
    case 3:
      square_id = "3";
      break;
    case 4:
      square_id = "4";
      break;
    case 5:
      square_id = "5";
      break;
    case 6:
      square_id = "6";
      break;
    case 7:
      square_id = "7";
      break;
    case 8:
      square_id = "8";
      break;
    case 9:
      square_id = "9";
      break;
    default:
      square_id = "0";
  }

  return "pos" + square_id;
}

/**
 * Get the id string representing the given symbol
 * @param {string} symbol desired symbol. Can be 'X', 'O' or 'blank'
 * @return the id of the symbol
 */
function get_symbol_id(symbol) {
  switch (symbol) {
    case "X":
      return "img/x.png";
    case "O":
      return "img/0.png";
    default:
      return "img/blank.png";
  }
}

/**
 * Resets the entire board.
 * After this function is called, another game can be started
 */
function reset_board() {
  // Reset status image
  document.getElementById("status_img").src = "img/x.png";

  // Clear all squares
  for (let i = 1; i <= 9; i++) {
    set_square(i, "blank");
  }

  // Reset side-to-move
  side_to_move = "X";

  // Make the game playable again
  running = true;
}

/**
 * Draw the symbol on the square
 * @param {number} square the id nr of the square, ranging between 1 and 9
 * @param {string} symbol the symbol to be set on the square. Can be 'X', 'O', or 'blank'
 */
function draw_square(square, symbol) {
  const square_id = get_square_id(square);
  const symbol_id = get_symbol_id(symbol);
  const sq = document.getElementById(square_id);
  sq.src = symbol_id;
  sq.classList.remove("preview_square");
  sq.classList.add("placed_square");
}

/**
 * Draw the symbol on the square and update internal board state
 * @param {number} square the id nr of the square, ranging between 1 and 9
 * @param {string} symbol the symbol to be set on the square. Can be 'X', 'O', or 'blank'
 */
function set_square(square, symbol) {
  draw_square(square, symbol);
  board[square] = symbol;
}

/**
 * Draw the symbols inside the squares, based on the board array
 */
function render() {
  for (let i = 1; i <= 9; i++) {
    set_square(i, board[i]);
  }
}

/**
 * Lowers the opacity of the given square
 * @param {number} square_number the number of the square, ranging between 1 and 9
 */
function lower_opacity(square_number) {
  const square_id = get_square_id(square_number);
  const sq = document.getElementById(square_id);
  sq.classList.remove("placed_square");
  sq.classList.add("preview_square");
}

/**
 * Lower the opacity of the entire board, excepting the specified squares
 * @param {array[number]} excepted_squares Squares which will be ignored
 */
function lower_opacity_except(excepted_squares) {
  for (let i = 1; i <= 9; i++) {
    if (!excepted_squares.includes(i)) {
      lower_opacity(i);
    }
  }
}

/**
 * Preview the side_to_move image on selected square
 * @param {number} square_number the number of the square, ranging between 1 and 9
 */
function on_hover(square_number) {
  if (!running) {
    return;
  }

  if (board[square_number] === "blank") {
    draw_square(square_number, side_to_move);
    lower_opacity(square_number);
  }
}

/**
 * Revert the effects of the on_hover function
 */
function off_hover() {
  if (running) {
    render();
  }
}

/**
 * Switch the symbol stored inside the internal side_to_move variable
 */
function switch_side_to_move() {
  side_to_move = side_to_move === "O" ? "X" : "O";
  document.getElementById("status_img").src = get_symbol_id(side_to_move);
}

/**
 * Check if current board is a winning board for the given symbol
 * @param {string} symbol The symbol for which winnin condition will be checked. Can be 'X' or 'O'
 */
function is_winning(symbol) {
  for (let i = 0; i < winning_positions.length; i++) {
    let is_winning = true;
    for (let j = 0; j < winning_positions[i].length; j++) {
      if (board[winning_positions[i][j]] != symbol) {
        is_winning = false;
        break;
      }
    }

    if (is_winning) {
      lower_opacity_except(winning_positions[i]);
      return true;
    }
  }
  return false;
}

/**
 * Try to place the side_to_move symbol on giver square. Ignored if a symbol is already present
 * @param {number} square_number the number of the square, ranging between 1 and 9
 */
function move(square_number) {
  if (!running) {
    return;
  }

  if (board[square_number] === "blank") {
    set_square(square_number, side_to_move);
    if (is_winning(side_to_move)) {
      running = false;
      return;
    }
    switch_side_to_move();
  }
}

/**
 * Initialize the board square
 * @param {number} square_number the number of the square, ranging between 1 and 9
 */
function init_square(square_number) {
  const square_id = get_square_id(square_number);
  const sq = document.getElementById(square_id);
  sq.classList.add("pos_img");
  sq.src = "img/blank.png";
  sq.alt = "status-image";
  sq.setAttribute("onmouseover", `on_hover(${square_number});`);
  sq.setAttribute("onclick", `move(${square_number});`);
  sq.setAttribute("onmouseout", "off_hover();");
}

/**
 * Add the table borders
 */
function add_borders() {
  // Constants
  const square = "square";
  const border_right = "border_right";
  const border_bottom = "border_bottom";

  // Helper functions to access the square divs
  const get_div_id = (id) => "square" + id;
  const get_div_element = (id) => document.getElementById(get_div_id(id));

  // Place the borders
  get_div_element(1).classList.add(square, border_right, border_bottom);
  get_div_element(2).classList.add(square, border_right, border_bottom);
  get_div_element(3).classList.add(square, border_bottom);
  get_div_element(4).classList.add(square, border_right, border_bottom);
  get_div_element(5).classList.add(square, border_right, border_bottom);
  get_div_element(6).classList.add(square, border_bottom);
  get_div_element(7).classList.add(square, border_right);
  get_div_element(8).classList.add(square, border_right);
  get_div_element(9).classList.add(square);
}

/**
 * Initialize the entire board
 */
function init() {
  // Init status image
  const status_sq = document.getElementById("status_img");
  status_sq.classList.add("status_img");
  status_sq.src = "img/x.png";
  status_sq.alt = "status-image";

  // Add the board borders
  add_borders();

  // Init board squares
  for (let i = 1; i <= 9; i++) {
    init_square(i);
  }
}
