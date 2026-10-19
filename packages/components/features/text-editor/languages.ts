import bash from 'highlight.js/lib/languages/bash';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import { createLowlight } from 'lowlight';

/**
 * Code-block languages offered by the editor — the single source for both the toolbar's language
 * picker and the grammars registered with lowlight. Only these grammars are bundled (instead of
 * lowlight's 37-language `common` set); a code block tagged with any other language still renders,
 * just without syntax highlighting.
 */
export const CODE_LANGUAGES = [
  { label: 'Plain text', value: 'plaintext', grammar: plaintext },
  { label: 'JavaScript', value: 'javascript', grammar: javascript },
  { label: 'TypeScript', value: 'typescript', grammar: typescript },
  { label: 'Python', value: 'python', grammar: python },
  { label: 'Java', value: 'java', grammar: java },
  { label: 'C#', value: 'csharp', grammar: csharp },
  { label: 'C++', value: 'cpp', grammar: cpp },
  { label: 'Go', value: 'go', grammar: go },
  { label: 'Rust', value: 'rust', grammar: rust },
  { label: 'PHP', value: 'php', grammar: php },
  { label: 'Ruby', value: 'ruby', grammar: ruby },
  { label: 'Swift', value: 'swift', grammar: swift },
  { label: 'Kotlin', value: 'kotlin', grammar: kotlin },
  { label: 'SQL', value: 'sql', grammar: sql },
  { label: 'Bash', value: 'bash', grammar: bash },
  { label: 'JSON', value: 'json', grammar: json },
  { label: 'YAML', value: 'yaml', grammar: yaml },
  { label: 'CSS', value: 'css', grammar: css },
  { label: 'HTML/XML', value: 'xml', grammar: xml },
  { label: 'Markdown', value: 'markdown', grammar: markdown },
] as const;

/** Lowlight registry holding only the {@link CODE_LANGUAGES} grammars — built once at module scope. */
export const lowlight = createLowlight(Object.fromEntries(CODE_LANGUAGES.map(({ value, grammar }) => [value, grammar])));
