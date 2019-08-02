export function gotoStep(id, ary) {
  return ary.slice(ary.findIndex(step => step.id === id));
}