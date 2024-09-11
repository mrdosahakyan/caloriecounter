import { FC } from "react";
import { parseMarkdownFile } from "../lib/parseMarkdown";

const RefundPage: FC = async () => {
  const contentHtml = await parseMarkdownFile("refund");

  return (
    <div
      className="static-page-container"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};

export default RefundPage;
