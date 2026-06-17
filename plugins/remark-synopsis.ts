// Remark plugin: derive a plain-text synopsis from an MDX document's body and
// expose it as `export const synopsis`. The excerpt is everything before the
// `{/* truncate */}` marker (or the whole body if absent). Deriving from the
// parsed AST avoids the brittleness of regex-stripping the raw source.

interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
  data?: { estree?: unknown };
}

interface Root extends MdNode {
  type: "root";
  children: MdNode[];
}

// Node types whose text content should not appear in the synopsis.
const SKIP = new Set([
  "yaml", // frontmatter
  "code", // fenced code blocks
  "mdxjsEsm", // import/export statements
  "mdxFlowExpression", // {/* ... */} and other block expressions
  "mdxTextExpression", // inline {expressions}
  "mdxJsxFlowElement", // <Component> blocks
  "mdxJsxTextElement", // inline <jsx>
  "thematicBreak",
]);

function toText(node: MdNode): string {
  if (SKIP.has(node.type)) return "";
  if (node.type === "text" || node.type === "inlineCode") return node.value ?? "";
  if (node.children) return node.children.map(toText).join(" ");
  return "";
}

function isTruncateMarker(node: MdNode): boolean {
  return node.type === "mdxFlowExpression" && (node.value ?? "").includes("truncate");
}

// Build an `mdxjsEsm` node for `export const <name> = <value>`.
function exportConst(name: string, value: string): MdNode {
  return {
    type: "mdxjsEsm",
    value: `export const ${name} = ${JSON.stringify(value)}`,
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ExportNamedDeclaration",
            specifiers: [],
            source: null,
            declaration: {
              type: "VariableDeclaration",
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name },
                  init: { type: "Literal", value, raw: JSON.stringify(value) },
                },
              ],
            },
          },
        ],
      },
    },
  };
}

export interface RemarkSynopsisOptions {
  maxLength?: number;
}

export default function remarkSynopsis(options: RemarkSynopsisOptions = {}) {
  const maxLength = options.maxLength ?? 500;

  return (tree: Root) => {
    const cutoff = tree.children.findIndex(isTruncateMarker);
    const body = cutoff === -1 ? tree.children : tree.children.slice(0, cutoff);

    const text = body.map(toText).join(" ").replace(/\s+/g, " ").trim();

    const synopsis =
      text.length <= maxLength ? text : text.slice(0, maxLength).replace(/\s+\S*$/, "");

    tree.children.unshift(exportConst("synopsis", synopsis));
  };
}
