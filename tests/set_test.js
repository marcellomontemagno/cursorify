import {createCursors, setByCursor} from '../src/index';

let cursors;
let val;

beforeEach(() => {
  cursors = createCursors();
  val = {some: 1};
})

it(`setByCursor, object, root`, () => {

  const obj = {
    a: cursors.push('c1',
      val
    ),
    b: {}
  };

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual({a: {some: 2}, b: {}});

});

it(`setByCursor, object, middle`, () => {

  const obj = {
    a: {
      b: cursors.push('c1',
        val
      ),
    },
    c: {}
  };

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual({
    a: {
      b: {some: 2}
    },
    c: {}
  });

});

it(`setByCursor, object, tip`, () => {

  const obj = {
    a: {
      b: cursors.push('c1',
        val
      )
    }
  };

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual({
    a: {
      b: {some: 2}
    }
  });

});

it(`setByCursor, object, not found`, () => {

  cursors.push('c1', {some: 1})

  const obj = {a: {b: {}}};

  expect(setByCursor(obj, cursors['c1']));

  expect(obj).toEqual({a: {b: {}}});

});

it(`setByCursor, array, root`, () => {

  const obj = [
    cursors.push('c1',
      val
    ),
    {}
  ];

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual([{some: 2}, {}]);

});

it(`setByCursor, array, middle`, () => {

  const obj = [
    {},
    cursors.push('c1',
      val
    ),
    {}
  ];

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual([{}, {some: 2}, {}]);

});

it(`setByCursor, array, tip`, () => {

  const obj = [
    {},
    {},
    cursors.push('c1',
      val
    )
  ];

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual([{}, {}, {some: 2}]);

});

it(`setByCursor, array, not found`, () => {

  cursors.push('c1', val);

  const obj = [{}, {}];

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual([{}, {}]);

});

it(`setByCursor, mixed, found`, () => {

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

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual({
    a: {
      b: [
        {},
        {some: 2},
        {}
      ],
      c: {}
    }
  });

});

it(`setByCursor, mixed, not found`, () => {

  cursors.push('c1', val);

  const obj = {
    a: {
      b: [{}, {}],
      c: {}
    }
  };

  setByCursor(obj, cursors['c1'], {some: 2});

  expect(obj).toEqual({
    a: {
      b: [{}, {}],
      c: {}
    }
  });

});

it(`setByCursor, nested, found`, () => {

  const obj = {
    a: cursors.push('c1', {
      b: cursors.push('c11', {
        c: [{}, cursors.push('c111', {some: 1})],
        d: {}
      })
    })
  };

  setByCursor(obj, cursors['c111'], {});

  expect(obj).toEqual({
    a: {
      b: {
        c: [{}, {}],
        d: {}
      }
    }
  });

  setByCursor(obj, cursors['c1'], {});

  expect(obj).toEqual({
    a: {}
  });

});

it(`setByCursor, nested, not found`, () => {

  const obj = cursors.push('c1', {
    a: cursors.push('c11', {
      b: [{}, cursors.push('c111', {some: 1})],
      c: {}
    })
  });

  cursors.push('c2', {some: 2});

  setByCursor(obj, cursors['c2'], {});

  expect(obj).toEqual({
    a: {
      b: [{}, {some: 1}],
      c: {},
    }
  });

});
