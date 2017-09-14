/* SystemJS module definition */
declare var module: NodeModule;

// Allow .json files imports
declare module '*.json';

interface NodeModule {
  id: string;
}
