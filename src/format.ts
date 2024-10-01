/**
 * Image formats.
 */
export type ImageFormat =
  | "jpeg"
  | "png"
  | "gif"
  | "bmp"
  | "webm"
  | "webp"
  | "unknown";

/**
 * Get image format from file byte array.
 * @param bytes Byte array of file data.
 * @returns Name of the image format as string.
 */
export function getImageFormat(bytes: Uint8Array): ImageFormat {
  if (bytes[0] === 255 && bytes[1] === 216) {
    return "jpeg";
  } else if (
    bytes[0] === 137 &&
    bytes[1] === 80 &&
    bytes[2] === 78 &&
    bytes[3] === 71
  ) {
    return "png";
  } else if (
    bytes[0] === 71 &&
    bytes[1] === 73 &&
    bytes[2] === 70 &&
    bytes[3] === 56 &&
    (bytes[4] === 55 || bytes[4] === 57) &&
    bytes[5] === 97
  ) {
    return "gif";
  } else if (bytes[0] === 66 && bytes[1] === 77) {
    return "bmp";
  } else if (
    bytes[0] === 82 &&
    bytes[1] === 73 &&
    bytes[2] === 70 &&
    bytes[3] === 70 &&
    bytes[8] === 87 &&
    bytes[9] === 69 &&
    bytes[10] === 66 &&
    bytes[11] === 80
  ) {
    return "webp";
  } else {
    console.log(bytes);
    console.warn(
      `Unknown image format. Please open an issue in https://github.com/retraigo/image-size`
    );
    return "unknown";
  }
}
