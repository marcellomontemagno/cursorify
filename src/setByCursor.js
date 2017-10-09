export default function setByCursor (obj, cursor, newValue) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value === cursor.value) {
      cursor.value = newValue;
      obj[key] = newValue;
    } else if (typeof value === "object") {
      setByCursor(value, cursor, newValue);
    }
  }
}
