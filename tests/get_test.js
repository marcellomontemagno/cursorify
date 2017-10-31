import {createCursors, getByCursor} from '../src/index';

let cursors;
let val;

beforeEach(() => {
  cursors = createCursors();
  val = {some: 1};
})

it(`getByCursor, object, root`, () => {

  const obj = {
    a: cursors.push('c1',
      val
    ),
    b: {}
  };

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, object, middle`, () => {

  const obj = {
    a: {
      b: cursors.push('c1',
        val
      ),
      c: {}
    }
  };

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, object, middle with null`, () => {

  const obj = {
    a: {
      b: null,
      c: cursors.push('c1',
        val
      ),
      d: {}
    }
  };

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, object, tip`, () => {

  const obj = {
    a: {
      b: cursors.push('c1',
        val
      )
    }
  };

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, object, not found`, () => {

  cursors.push('c1', {some: 1})

  const obj = {a: {b: {}}};

  expect(getByCursor(obj, cursors['c1'])).toBe(undefined);

});

it(`getByCursor, array, root`, () => {

  const obj = [
    cursors.push('c1',
      val
    ),
    {}
  ];

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, array, middle`, () => {

  const obj = [
    {},
    cursors.push('c1',
      val
    ),
    {}
  ];

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, array, middle with null`, () => {

  const obj = [
    {},
    null,
    cursors.push('c1',
      val
    ),
    {}
  ];

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, array, tip`, () => {

  const obj = [
    {},
    {},
    cursors.push('c1',
      val
    )
  ];

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, array, not found`, () => {

  cursors.push('c1', val);

  const obj2 = [{}, {}];

  expect(getByCursor(obj2, cursors['c1'])).toBe(undefined);

});

it(`getByCursor, mixed, found`, () => {

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

  expect(getByCursor(obj, cursors['c1'])).toBe(val);

});

it(`getByCursor, mixed, not found`, () => {

  cursors.push('c1', val);

  const obj = {
    a: {
      b: [{}, {}],
      c: {}
    }
  };

  expect(getByCursor(obj, cursors['c1'])).toBe(undefined);

});

it(`getByCursor, nested, found`, () => {

  const obj = {
    a: cursors.push('c1', {
      b: cursors.push('c11', {
        c: [{}, cursors.push('c111', {some: 1})],
        d: {}
      })
    })
  };

  expect(getByCursor(obj, cursors['c1'])).toEqual({
    b: {
      c: [{}, {some: 1}],
      d: {}
    }
  });

  expect(getByCursor(obj, cursors['c11'])).toEqual({
    c: [{}, {some: 1}],
    d: {}
  });

  expect(getByCursor(obj, cursors['c111'])).toEqual({some: 1});

});

it(`getByCursor, nested, not found`, () => {

  const obj = cursors.push('c1', {
    a: cursors.push('c11', {
      b: [{}, cursors.push('c111', {some: 1})],
      c: {}
    })
  });

  cursors.push('c2', {some: 2});

  expect(getByCursor(obj, cursors['c2'])).toEqual(undefined);

});

it(`getByCursor, function value`, () => {

  const val = function () {
  };

  const obj = cursors.push('c1', {
    a: cursors.push('c11', {
      b: [{}, cursors.push('c111', val)],
      c: {}
    })
  });

  getByCursor(obj, cursors['c111']);

  expect(getByCursor(obj, cursors['c111'])).toEqual(val);

});
