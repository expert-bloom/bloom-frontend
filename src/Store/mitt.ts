import { EventEmitter } from 'events';

import mitt from 'mitt';

export default class GlobalMitt extends EventEmitter {
  private static Instance: GlobalMitt;
  static emitter = mitt();

  private constructor() {
    super();
  }

  static GetInstance() {
    if (!this.Instance) {
      this.Instance = new GlobalMitt();
      return this.Instance;
    } else {
      return this.Instance;
    }
  }
}
