# image-size

Get image format and image size from bytes.

## Usage

```ts
import { getImageInfo } from "jsr:@retraigo/image-size";

const image = Deno.readFileSync("test.png");

console.log(getImageInfo(image));
/**
 * {
 *      format: "png",
 *      width: 1280,
 *      height: 720,
 * }
 */
```