declare module 'webfontloader' {
  const webfontloader: {
    load: (config: { google?: { families: string[] }; custom?: { families: string[]; urls: string[] } }) => void;
  };
  export default webfontloader;
}
