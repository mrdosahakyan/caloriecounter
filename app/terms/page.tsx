import { FC } from "react";
import { parseMarkdownFile } from "../lib/parseMarkdown";

const TermsPage: FC = async () => {
  const contentHtml = await parseMarkdownFile("terms");

  return (
    <div
      className="static-page-container"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};

export default TermsPage;
