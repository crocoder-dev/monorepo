import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("typescript", typescript);

const Code = ({ children, language }) => {
  return (
    <SyntaxHighlighter language={language} style={okaidia}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
