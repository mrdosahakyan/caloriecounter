import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export const parseMarkdownFile = async (fileName: string): Promise<string> => {
  const filePath = path.join(process.cwd(), "docs", `${fileName}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(fileContent);

  return processedContent.toString();
};
