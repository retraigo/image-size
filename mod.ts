import { getImageFormat, type ImageFormat } from "./src/format.ts";
import { getImageSize } from "./src/size.ts";

type ImageInfo = {
  width: number;
  height: number;
  format: ImageFormat;
  shape: () => [number, number];
};

/**
 * Get image format and size from byte array.
 * @param bytes Byte array of image file.
 * @returns Image width, height, format.
 */
export function getImageInfo(bytes: Uint8Array): ImageInfo {
  const format = getImageFormat(bytes);
  const size = getImageSize(bytes, format);
  return {
    width: size.width,
    height: size.height,
    format,
    shape() {
      return [size.width, size.height];
    },
  };
}
