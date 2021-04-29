class NodeCache {
  public static getInstance() {
    if (!NodeCache.instance) {
      NodeCache.instance = new Map<string, any>();
    }
    return NodeCache.instance;
  }
  private static instance: Map<string, any>;

  private constructor() { }

  public get(key: string): any {
    return NodeCache.instance.get(key);
  }
  public set(key: string, value: any): void {
    NodeCache.instance.set(key, value);
  }
  public delete(key: string): void {
    NodeCache.instance.delete(key);
  }
}

export default NodeCache.getInstance();
