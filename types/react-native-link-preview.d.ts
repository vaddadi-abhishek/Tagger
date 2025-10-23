declare module 'react-native-link-preview' {
  export function getPreview(
    text: string,
    options?: {
      imagesPropertyType?: string;
      headers?: Record<string, string>;
    }
  ): Promise<{
    url: string;
    title?: string;
    description?: string;
    images?: string[];
    mediaType?: string;
    contentType?: string;
    favicons?: string[];
  }>;
}
