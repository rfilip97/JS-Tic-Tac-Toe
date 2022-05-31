/**
 * Get the id string representing the given square
 * @param {number} square_number the number of the square, ranging between 1 and 9
 * @return resulted square id
 */
function get_square_id (square_number) {
    let square_id = "";
    switch (square_number) {
        case 1: square_id = "1"; break;
        case 2: square_id = "2"; break;
        case 3: square_id = "3"; break;
        case 4: square_id = "4"; break;
        case 5: square_id = "5"; break;
        case 6: square_id = "6"; break;
        case 7: square_id = "7"; break;
        case 8: square_id = "8"; break;
        case 9: square_id = "9"; break;
        default: square_id = "0";
    }

    return "pos" + square_id;
}

/**
 * Get the id string representing the given symbol
 * @param {string} symbol desired symbol. Can be 'X', 'O' or 'blank'
 * @return the id of the symbol
 */
function get_symbol_id (symbol) {
    switch (symbol) {
        case 'X': return "img/x.png";
        case 'O': return "img/0.png";
        default: return "img/blank.png";
    }
}
