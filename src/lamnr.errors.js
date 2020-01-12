export class LamnrError extends Error {
  constructor(message, { directive, meta, ...rest }) {
    super(message);
    this.name = `LAMNR => ${ meta.flow.name } in Row: ${ meta.index } line ${ directive.id } `;
    console.warn({ meta, directive, ...rest }); 
  }
}
