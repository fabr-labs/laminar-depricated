export function unhandledError({ id, args, meta, error }) {
  console.table({
    message: error.message,
    flow: meta.flow.name,
    directive: id,
    args,
   });
  throw error;
}
