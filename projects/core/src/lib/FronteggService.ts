export abstract class FronteggService<STATE = any, ACTIONS = any> {

  public loaded: boolean;

  public abstract setActions(key: string, actions: ACTIONS): void;

  public abstract setState(state: STATE, action: any): void;
}
