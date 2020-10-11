export const statsMiddleware = ({ subscribe, log }) => {
  function perf_observer(list, observer) {
    
    if (log) {
      // console.group(`%c! LAMINAR PERF`, `color: green; font-size:11px; font-weight: bold;`);
      // console.table(list.getEntries().map(({ detail, startTime, duration }) => ({ ...detail, startTime, duration  })));
      console.groupEnd();
    }

    if (subscribe) subscribe(list);
  }

  const observer2 = new PerformanceObserver(perf_observer);
  observer2.observe({entryTypes: ["measure"]});

  return next => async ({ directive, meta }) => {
    const { startTime } = window.performance.mark('START_FLOW_STEP');
    const result = await next({ directive, meta });

    // console.log(this);
    // console.log(directive);
  
    window.performance.measure('FLOW_STEP_PERF', {
      detail: { directive: directive.id, i: meta.index, args: JSON.stringify(directive.args) },
      start: startTime,
    }); 
    return result;
  };
}
