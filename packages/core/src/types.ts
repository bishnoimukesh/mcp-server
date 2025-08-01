export type ComponentMeta = {
    name: string;
    version: string;
    tags?: string[];
    themes?: string[];
  };
  
  export type ComponentData = {
    code: {
      tsx: string;
      css?: string;
    };
    previewUrl?: string;
    metadata: ComponentMeta;
  };
  