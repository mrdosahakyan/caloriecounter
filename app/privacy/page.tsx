import { FC } from "react";
import { parseMarkdownFile } from "../lib/parseMarkdown";

const PrivacyPage: FC = async () => {
  const contentHtml = await parseMarkdownFile("policy");

  return (
    <div
      className="static-page-container"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};

export default PrivacyPage;
