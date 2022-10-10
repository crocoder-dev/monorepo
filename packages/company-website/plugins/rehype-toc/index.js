import { visit } from 'unist-util-visit';

const isPlainObject = (value) => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return (
    prototype === null
    || prototype === Object.prototype
    || Object.getPrototypeOf(prototype) === null
  )
  && !(Symbol.toStringTag in value)
  && !(Symbol.iterator in value);
};

const toEstree = (value, options = {}) => {
  if (typeof value === 'number' || typeof value === 'string') {
    return { type: 'Literal', value };
  }
  if (Array.isArray(value)) {
    const elements = [];
    for (let i = 0; i < value.length; i += 1) {
      elements.push(i in value ? toEstree(value[i], options) : null);
    }
    return { type: 'ArrayExpression', elements };
  }
  if (options.instanceAsObject || isPlainObject(value)) {
    return {
      type: 'ObjectExpression',
      properties: Object.entries(value).map(([name, val]) => ({
        type: 'Property',
        method: false,
        shorthand: false,
        computed: false,
        kind: 'init',
        key: toEstree(name, options),
        value: toEstree(val, options),
      })),
    };
  }

  throw new TypeError(`Unsupported value: ${String(value)}`);
};

const getHeadingRank = (node) => {
  if (!node || !node.type === 'element' || !node.tagName) {
    return null;
  }

  const name = node.tagName.toLowerCase();

  if (name.length === 2 && name[0] === 'h' && Number(name[1] > 0 && Number(name[1] < 7))) {
    return Number(name[1]);
  }

  return null;
};

const getTextConentRecursive = (node) => {
  const result = [];

  for (let index = 0; index < node.children.length; index += 1) {
    const childNode = node.children[index];
    if (childNode.type === 'text') {
      result[index] = childNode.value;
    } else if (childNode.children) {
      result[index] = getTextConentRecursive(childNode);
    } else {
      result[index] = '';
    }
  }
  return result.join('');
};

const getTextConent = (node) => {
  if (node.children) {
    return getTextConentRecursive(node);
  }

  return node.value || '';
};

const createTree = (headings) => {
  const root = { rank: 0, children: [] };
  const parents = [];
  let previous = root;
  headings.forEach((heading) => {
    if (heading.rank > previous.rank) {
      if (previous.children === undefined) {
        previous.children = [];
      }
      parents.push(previous);
    } else if (heading.rank < previous.rank) {
      while (parents[parents.length - 1].rank >= heading.rank) {
        parents.pop();
      }
    }
    parents[parents.length - 1].children.push(heading);
    previous = heading;
  });

  return root.children;
};

const transform = (tree, vfile) => {
  const headings = [];

  visit(tree, 'element', (node) => {
    const rank = getHeadingRank(node);

    if (rank != null) {
      const heading = {
        rank,
        value: getTextConent(node),
      };
      if (node.properties !== undefined && node.properties.id != null) {
        heading.id = node.properties.id;
      }
      headings.push(heading);
    }
  });

  // eslint-disable-next-line no-param-reassign
  vfile.data.toc = createTree(headings) || [];

  tree.children.unshift({
    type: 'mdxjsEsm',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: 'toc' },
                  init: toEstree(vfile.data.toc),
                },
              ],
            },
          },
        ],
      },
    },
  });
};

export default () => transform;
