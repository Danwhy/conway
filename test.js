var test = require('tape');
var conway = require('./conway');

test("Initialising a cell adds it to the cells object", function(t) {
  conway.initCell(0,0);
  t.ok(conway.cells['0,0']);
  conway.cells = [];
  t.end();
});

test("Initialising a cell gets a count of its live neighbours", function(t) {
  conway.initCell(0,0);
  conway.initCell(0,1);
  t.equal(conway.cells['0,1'].neighbours, 1);
  conway.initCell(1,0);
  t.equal(conway.cells['1,0'].neighbours, 2);
  conway.cells = [];
  t.end();
});

test("Each turn, a cell's live neighbour count is updated", function(t) {
  conway.initCell(0,0);
  t.equal(conway.cells['0,0'].neighbours, 0);
  conway.initCell(0,1);
  conway.nextTurn();
  t.equal(conway.cells['0,0'].neighbours, 1);
  conway.cells = [];
  t.end();
});

test("Each turn, all empty cells with live neighbours are added to the cells " +
"object", function(t) {
  conway.initCell(0,0);
  conway.nextTurn();
  t.ok(conway.cells['0,1']);
  t.ok(conway.cells['1,0']);
  t.ok(conway.cells['1,1']);
  t.equal(conway.cells['0,1'].alive, false);
  conway.cells = [];
  t.end();
});

test("Each turn, any cell with less than two neighbours dies", function(t) {
  conway.initCell(0,0);
  t.equal(conway.cells['0,0'].alive, true);
  conway.nextTurn();
  t.equal(conway.cells['0,0'].alive, false);
  conway.cells = [];
  t.end();
});

test("Any live cell with two or three live neighbours lives on to the next " +
"turn", function(t) {
  conway.initCell(0,0);
  conway.initCell(0,1);
  conway.initCell(1,1);
  conway.nextTurn();
  t.equal(conway.cells['0,0'].alive, true);
  conway.cells = [];
  t.end();
});

test("Any live cell with more than three live neighbours dies", function(t) {
  conway.initCell(0,0);
  conway.initCell(0,1);
  conway.initCell(0,2);
  conway.initCell(1,0);
  conway.initCell(1,1);
  conway.nextTurn();
  t.equal(conway.cells['0,1'].alive, false);
  conway.cells = [];
  t.end();
});

test("Any dead cell with exactly three live neighbours becomes a live " +
"cell", function(t) {
  conway.initCell(0,0);
  conway.initCell(0,2);
  conway.initCell(1,0);
  conway.nextTurn();
  t.equal(conway.cells['0,1'].alive, true);
  t.equal(conway.cells['-1,0'].alive, false);
  conway.cells = [];
  t.end();
});
