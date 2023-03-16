import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import docker from 'react-syntax-highlighter/dist/cjs/languages/prism/docker';


SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('docker', docker);


const Code = ({ children }) => {
  const className = children.props.className || '';
  const matches = className.match(/language-(?<language>.*)/);
  return (
    <SyntaxHighlighter
      language={matches?.groups?.language ? matches.groups.language : ''}
      style={okaidia}
    >
      {children.props.children}
    </SyntaxHighlighter>
  );
};

export default Code;
