const makeJson = (differenceTree) => {
  const iter = (tree) => {
    const reducedTree = tree
      .reduce((acc, node) => {
        if (node.type === 'added' || node.type === 'removed' || node.type === 'unchanged' || node.type === 'changed') {
          return { ...acc, [node.key]: node.type };
        }
        return { ...acc, [node.key]: iter(node.value) };
      }, {});
    return reducedTree;
  };
  return JSON.stringify(iter(differenceTree));
};

export default makeJson;
