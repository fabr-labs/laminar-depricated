export function gotoStep(id, flow) {
  return id ? flow.slice(flow.findIndex(step => step.id === id)) : flow;
}