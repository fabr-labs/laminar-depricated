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
  pushFlow?: (any) => (any) => {
    flow: Flow;
  };
  saveResponse?: string;
  useResponse?: string;
  get?: string;
  put?: { url: string, body: {
    [key: string]: any;
  }};
  post?: { url: string, body: {
    [key: string]: any;
  }};
  delete?: { url: string, body: {
    [key: string]: any;
  }};
  validate?: (any) => any;  
}

export interface Flow {
  [index: number]: Step;
}