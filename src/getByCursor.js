export default function getByCursor (obj, cursor) {
  obj = obj || {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value === cursor.value) {
      return value;
    } else if (typeof value === "object") {
      const result = getByCursor(value, cursor);
      if (result) {
        return result;
      }
    }
  }
}
