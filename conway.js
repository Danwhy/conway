var conway = {
  initCell: function(x, y) {
    this.cells[x + ',' + y] = {
      x: x,
      y: y,
      neighbours: getNeighbours(x, y),
      alive: true
    };
    addEmptyCells(x, y);
  },
  addCell: function(x, y, alive) {
    this.cells[x + ',' + y] = {
      x: x,
      y: y,
      neighbours: getNeighbours(x, y),
      alive: alive
    };
  },
  cells: {},
  nextTurn: function() {
    for (var key in this.cells) {
      this.cells[key].neighbours = getNeighbours(this.cells[key].x, this.cells[key].y);
      addEmptyCells(this.cells[key].x, this.cells[key].y);
      determineLife(this.cells[key]);
    }
  }
};

function getNeighbours(x, y) {
  var neighbours = [];
  for (var key in conway.cells) {
    neighbours.push(key);
  }
  neighbours = neighbours.filter(function(element) {
    var coordinates = element.split(',');
    xRange = [x - 1, x, x + 1];
    yRange = [y - 1, y, y + 1];
    return conway.cells[element].alive && xRange.indexOf(+coordinates[0]) >= 0 && yRange.indexOf(+coordinates[1]) >= 0 && !(+coordinates[0] === x && +coordinates[1] === y);
  });
  return neighbours.length;
}

function range(start, end) {
  var res = [];
  for (var i = start; i <= end; i++) {
    res.push(i);
  }
  return res;
}

function addEmptyCells(x, y) {
  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (!conway.cells[i + ',' + j]){
        conway.addCell(i, j, false);
      }
    }
  }
}

function determineLife(cell) {
  if (cell.neighbours === 3 || cell.neighbours === 2) {
    cell.alive = true;
  } else {
    cell.alive = false;
  }
}

module.exports = conway;
