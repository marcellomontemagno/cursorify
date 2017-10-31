export default function deleteByCursor (obj, cursor) {

  let prevKey;
  let prevObj;

  function doDeleteByCursor (obj, cursor) {
    obj = obj || {};
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      prevKey = key;
      prevObj = obj;
      if (value === cursor.value) {
        if (Array.isArray(prevObj)) {
          prevObj.splice(key, 1);
        } else {
          delete prevObj[prevKey];
        }
      } else if (typeof value === "object") {
        doDeleteByCursor(value, cursor);
      }
    }
  }

  doDeleteByCursor(obj, cursor);

}
