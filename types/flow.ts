export interface Step {
  id: string;
  call?: ((any) => any) | Promise<any>;
  calls?: Step[];
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
  put?: string | { url: string, body: {
    [key: string]: any;
  }};
  post?: string | { url: string, body: {
    [key: string]: any;
  }};
  delete?: { url: string, body: {
    [key: string]: any;
  }};
  validate?: (any) => any;  
  reduce?: (any) => any;
  onError?: ((any) => void)[];
  as?: string;
  dto?: (any) => any;
}

export interface Flow {
  [index: number]: Step;
}