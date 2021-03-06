export default function createCursors () {

  let cursors = {};

  Object.defineProperty(cursors, "push", {
    enumerable: false,
    value: function (name, value) {
      if (typeof value !== "object" && typeof value !== "function") {
        throw new Error('you can only create cursors for objects and functions');
      }
      if (cursors[name] !== undefined) {
        throw new Error('a cursor with name [' + name + '] already exists');
      }
      cursors[name] = {name, value};
      return value;
    }
  });

  return cursors;

}
