import { Store } from "./store";

export class isLoading extends Store<Boolean> {
  private static instance: isLoading;

  private constructor() {
    super();
  }
  static getInstance() {
    if (!isLoading.instance) {
      isLoading.instance = new isLoading();
    }
    return isLoading.instance;
  }
  setLoading = (isLoading: Boolean) => {
    this.store(isLoading);
  };
  getLoading = (): Boolean => this.get();
}
