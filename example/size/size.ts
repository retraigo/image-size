import { getImageFormat } from "../../src/util/format.ts";
import { getImageSize } from "../../src/util/image_size.ts";

const files = Deno.readDirSync("test/size");

for (const file of files) {
  if (file.name === "size.ts") continue;
  console.log(`Reading\t${file.name}`);
  const fileContent = Deno.readFileSync(`test/size/${file.name}`);
  const format = getImageFormat(fileContent);
  console.log(`Format:\t${format}`);
  const dimensions = getImageSize(fileContent, format);
  console.log(`Size:\t${dimensions.width}x${dimensions.height}`);
}
