import {createCursors, deleteByCursor} from '../src/index';

let cursors;
let val;

beforeEach(() => {
  cursors = createCursors();
  val = {some: 1};
})

it(`deleteByCursor, object, root`, () => {

  const obj = {
    a: cursors.push('c1',
      val
    ),
    b: {}
  };

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual({b: {}});

});

it(`deleteByCursor, object, middle`, () => {

  const obj = {
    a: {
      b: cursors.push('c1',
        val
      ),
      c: {}
    }
  };

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual({
    a: {
      c: {}
    }
  });

});

it(`deleteByCursor, object, tip`, () => {

  const obj = {
    a: {
      b: cursors.push('c1',
        val
      )
    }
  };

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual({a: {}});

});

it(`deleteByCursor, object, not found`, () => {

  cursors.push('c1', {some: 1});

  const obj = {a: {b: {}}};

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual({a: {b: {}}});

});

it(`deleteByCursor, array, root`, () => {

  const obj = [
    cursors.push('c1',
      val
    ),
    {}
  ];

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual([{}]);

});

it(`deleteByCursor, array, middle`, () => {

  const obj = [
    {a: 1},
    cursors.push('c1',
      val
    ),
    {c: 2}
  ];

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual([{a: 1}, {c: 2}]);

});

it(`deleteByCursor, array, tip`, () => {

  const obj = [
    {a: 1},
    {b: 2},
    cursors.push('c1',
      val
    )
  ];

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual([{a: 1}, {b: 2}]);

});

it(`deleteByCursor, array, not found`, () => {

  cursors.push('c1', val);

  const obj = [{}, {}];

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual([{}, {}]);

});

it(`deleteByCursor, mixed, found`, () => {

  const obj = {
    a: {
      b: [
        {},
        cursors.push('c1',
          val
        ),
        {}
      ],
      c: {}
    }
  };

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual({
    a: {
      b: [
        {},
        {}
      ],
      c: {}
    }
  });

});

it(`deleteByCursor, mixed, not found`, () => {

  cursors.push('c1', val);

  const obj = {
    a: {
      b: [{}, {}],
      c: {}
    }
  };

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual({
    a: {
      b: [{}, {}],
      c: {}
    }
  });

});


it(`deleteByCursor, nested, found`, () => {

  const obj = {
    a: cursors.push('c1', {
      b: cursors.push('c11', {
        c: [{}, cursors.push('c111', {some: 1})],
        d: {}
      })
    })
  };

  deleteByCursor(obj, cursors['c111']);

  expect(obj).toEqual({
    a: {
      b: {
        c: [{}],
        d: {}
      }
    }
  });

  deleteByCursor(obj, cursors['c1']);

  expect(obj).toEqual({});

});

it(`deleteByCursor, nested, not found`, () => {

  const obj = cursors.push('c1', {
    a: cursors.push('c11', {
      b: [{}, cursors.push('c111', {some: 1})],
      c: {}
    })
  });

  cursors.push('c2', {some: 2});

  deleteByCursor(obj, cursors['c2']);

  expect(obj).toEqual({
    a: {
      b: [{}, {some: 1}],
      c: {},
    }
  });

});
