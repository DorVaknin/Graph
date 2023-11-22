class Node {
    constructor(id, asset_type) {
      this.id = id;
      this.asset_type = asset_type;
      this.edges = [];
      this.ancestors = [];
    }
    
    addEdge(targetNode, role) {
      this.edges.push({ targetNode, role });
    }
  }

  class Graph {
    constructor() {
      this.nodes = {};
    }

    addNode(id, asset_type) {
      if (!this.nodes[id]) {
        this.nodes[id] = new Node(id, asset_type);
      }
    }

    addEdge(sourceId, targetId, role) {
      const sourceNode = this.nodes[sourceId];
      const targetNode = this.nodes[targetId];

      if (sourceNode && targetNode) {
        sourceNode.addEdge(targetNode, role);
      }
    }

    setAncestors(id, ancestors) {
      if (this.nodes[id]) {
        this.nodes[id].ancestors = ancestors;
      }
    }

    getNode(id) {
      return this.nodes[id];
    }

    connectAncestors(id, ancestors) {
      let childId = this.extract(id, 'uniqueId');
      let parentId, parentResourceObjectType, childResourceObjectType;

      ancestors.forEach((ancestor, index) => {
        parentId = this.extract(ancestor, 'uniqueId');
        parentResourceObjectType = this.extract(ancestor, 'ancestorsResourceType');


        if (!this.getNode(parentId)) {
          this.addNode(parentId, parentResourceObjectType);
        }

        if (index === 0 && !this.getNode(childId)) {
          childResourceObjectType = this.extract(ancestor, 'ancestorsResourceType');
          this.addNode(childId, childResourceObjectType);
        }

        this.addEdge(parentId, childId, 'ancestor');
        childId = parentId;
      });
    }

    getAncestors(id) {
      const node = this.getNode(id);
      return node.ancestors;
    }


    extract(str, type) {
      const delimiter = type === 'entityType' ? ':' : '/';
      const parts = str.split(delimiter);

      switch (type) {
          case 'uniqueId':
          case 'assetTypeResourceType':
              return parts[parts.length - 1];
          case 'entityType':
          case 'ancestorsResourceType':
              return parts[0];
          default:
              throw new Error('Invalid extraction type');
      }
  }
}

// Read JSON data from GCPPermission.json
const graphData = require('./GCPPermission.json');

// Building the graph from the JSON data
const graph = new Graph();

graphData.forEach(data => {
  const id = graph.extract(data.name, 'uniqueId');
  graph.addNode(id, graph.extract(data.asset_type, 'assetTypeResourceType'));
  data.iam_policy.bindings.forEach(binding => {
    binding.members.forEach(entity => {
      graph.addNode(entity, graph.extract(entity, 'entityType'));
      graph.addEdge(id, entity, binding.role);
    });
  });
  graph.setAncestors(id, data.ancestors);
  graph.connectAncestors(id, data.ancestors);
});