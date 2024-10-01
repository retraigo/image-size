import type { ImageFormat } from "./format.ts";

/**
 * Get dimensions of an image.
 * @param bytes ByteArray with image data data.
 * @param format Format of the image.
 * @returns An object with width and height.
 */
export function getImageSize(
  bytes: Uint8Array,
  format: ImageFormat
): { width: number; height: number } {
  const res = { width: 0, height: 0 };
  switch (format) {
    case "jpeg":
      [res.width, res.height] = getImageSizeJpeg(bytes);
      break;
    case "png":
      [res.width, res.height] = getImageSizePng(bytes);
      break;
    case "gif":
      [res.width, res.height] = getImageSizeGif(bytes);
      break;
    case "bmp":
      [res.width, res.height] = getImageSizeBmp(bytes);
      break;
    case "webp":
      [res.width, res.height] = getImageSizeWebp(bytes);
      break;
    case "unknown":
    default:
      break;
  }
  return res;
}
function getImageSizeGif(bytes: Uint8Array): [number, number] {
  return [bytes[6] | (bytes[7] << 8), bytes[8] | (bytes[9] << 8)];
}

function getImageSizeBmp(bytes: Uint8Array): [number, number] {
  return [
    bytes[18] | (bytes[19] << 8) | (bytes[20] << 16) | (bytes[21] << 24),
    bytes[22] | (bytes[23] << 8) | (bytes[24] << 16) | (bytes[25] << 24),
  ];
}

function getImageSizePng(bytes: Uint8Array): [number, number] {
  const res: [number, number] = [0, 0];
  let offset = 8;

  while (offset < bytes.length) {
    const length =
      (bytes[offset] << 24) |
      (bytes[offset + 1] << 16) |
      (bytes[offset + 2] << 8) |
      bytes[offset + 3];

    const type = String.fromCharCode(
      bytes[offset + 4],
      bytes[offset + 5],
      bytes[offset + 6],
      bytes[offset + 7]
    );

    if (type === "IHDR") {
      const width =
        (bytes[offset + 8] << 24) |
        (bytes[offset + 9] << 16) |
        (bytes[offset + 10] << 8) |
        bytes[offset + 11];

      const height =
        (bytes[offset + 12] << 24) |
        (bytes[offset + 13] << 16) |
        (bytes[offset + 14] << 8) |
        bytes[offset + 15];

      res[0] = width;
      res[1] = height;
      break;
    }
    offset += length + 12;
  }
  return res;
}

function getImageSizeWebp(bytes: Uint8Array): [number, number] {
  const res: [number, number] = [0, 0];

  let offset = 12;
  while (offset < bytes.length) {
    const chunkID = String.fromCharCode(...bytes.slice(offset, offset + 4));

    const chunkSize =
      (bytes[offset + 4] << 0) |
      (bytes[offset + 5] << 8) |
      (bytes[offset + 6] << 16) |
      (bytes[offset + 7] << 24);
    if (chunkID === "VP8X") {
      const width =
        ((bytes[offset + 12] << 0) |
          (bytes[offset + 13] << 8) |
          (bytes[offset + 14] << 16)) +
        1;
      const height =
        ((bytes[offset + 15] << 0) |
          (bytes[offset + 16] << 8) |
          (bytes[offset + 17] << 16)) +
        1;

      res[0] = width;
      res[1] = height;
      break;
    } else {
      // Move to the next chunk
      offset += chunkSize + 8;
    }
  }
  return res;
}

function getImageSizeJpeg(bytes: Uint8Array): [number, number] {
  const res: [number, number] = [0, 0];

  let offset = 2;

  while (offset < bytes.length) {
    if (bytes[offset] === 0xff) {
      const marker = bytes[offset + 1];
      if (
        (marker >= 0xc0 && marker <= 0xcf) ||
        (marker >= 0xc0 && marker <= 0xcf)
      ) {
        const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
        const width = (bytes[offset + 7] << 8) | bytes[offset + 8];

        res[0] = width;
        res[1] = height;
        break;
      }
      offset += 2 + ((bytes[offset + 2] << 8) | bytes[offset + 3]);
    } else {
      offset++;
    }
  }
  return res;
}
