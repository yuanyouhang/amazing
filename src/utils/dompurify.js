import DOMPurify from 'dompurify'
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

export default function purify(mdString) {
  // remove the most common zerowidth characters from the start of the file
  // 预防 XSS attacks
  return DOMPurify.sanitize(marked.parse(mdString.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"")))
}