export class LoadingModel<T> {

  static empty = <T>() => new LoadingModel<T>(false, false, false, undefined)

  static success<T>(success?: T): LoadingModel<T> {
    return new LoadingModel(false, false, true, success)
  }

  static error<T>(error?: Error, optionalSuccess?: T): LoadingModel<T> {
    return new LoadingModel<T>(false, true, false, optionalSuccess, error)
  }

  loading = (success: T = this.success) => new LoadingModel(true, false, this.hasSuccess, success)

  public get success(): T {
    return this._success as T
  }

  public get optionalSuccess(): T | undefined {
    return this._success
  }

  constructor(
    public isLoading: boolean,
    private hasError: boolean,
    private hasSuccess: boolean,
    private _success?: T,
    public error?: Error) {
  }

  isEmpty = () => !this.isSuccess() && !this.isError()
  isSuccess = () => this.hasSuccess
  isError = () => this.hasError

  public toString = () => `Loading: ${this.isLoading}, Success: ${this.hasSuccess}:**${this._success}**, ` +
    `Error: ${this.hasError}:${this.error}`
}

/**
 * Wraps an object that conforms to LoadingModel to restore object.
 */
export const wrapLoading = <T extends any>(loading: any): LoadingModel<T> => {
  if (loading instanceof LoadingModel) {
    return loading
  } else {
    if (!loading) {
      return LoadingModel.empty()
    } else {
      return new LoadingModel(
        loading.isLoading || false,
        loading.hasError || false,
        loading.hasSuccess || false,
        loading._success,
        loading.error)
    }
  }
}
