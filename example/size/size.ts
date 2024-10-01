import { getImageInfo } from "@retraigo/image-size"

const files = Deno.readDirSync("example/size");

for (const file of files) {
  if (file.name === "size.ts") continue;
  console.log(`\nReading\t${file.name}`);
  const fileContent = Deno.readFileSync(`example/size/${file.name}`);
  const info = getImageInfo(fileContent)
  console.log(`Format:\t${info.format}`);
  console.log(`Size:\t${info.width}x${info.height}`);
}
