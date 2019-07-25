export interface Step {
  id: string;
  call?: ((any) => any) | Promise<any>;
  store?: string;
  dispatch?: {
    type: string;
    [key: string]: any;
  };
  args?: any;
  wait?: {
    on: string;
    async?: boolean;
  },
  pushFlow?: (any) => (any) => Flow;
}

export interface Flow {
  [index: number]: Step;
}