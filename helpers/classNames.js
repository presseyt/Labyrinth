
export default function classNames(base, optional) {
  let classes = base;
  if (optional instanceof Object) {
    Object.keys(optional).forEach(key => {
      if (optional[key]) classes += (' ' + key);
    });
  }
  return classes;
}