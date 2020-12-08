export abstract class FronteggService<STATE = any, ACTIONS = any> {
  public pluginLoaded: boolean;

  public abstract setActions(key: string, actions: ACTIONS): void;
}
