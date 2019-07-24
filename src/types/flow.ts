export interface Step {
  id: string;
  call?: ((any) => any) | Promise<any>;
  store?: string;
  dispatch?: {
    type: string;
    [key: string]: any;
  };
  args?: any;
}

export interface Flow {
  [index: number]: Step;
}