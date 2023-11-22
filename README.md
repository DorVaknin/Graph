# Graph
A JavaScript graph library for managing node relationships in hierarchical structures. Features include node creation, edge linking with roles, ancestor tracking, and automated graph building from JSON data. Optimized for processing GCP permission structures

# JavaScript Graph Library for Hierarchical Structures

This library is a comprehensive solution for managing and visualizing node relationships in hierarchical data structures. It's particularly optimized for handling GCP permission data, allowing easy manipulation and querying of complex relationships.

## Features`

- **Node Management**: Efficiently create and manage nodes with unique identifiers and types.
- **Edge Linking**: Define relationships between nodes with roles, capturing complex hierarchical data.
- **Ancestor Tracking**: Maintain and retrieve ancestor information for each node, crucial for understanding inherited permissions.
- **JSON Data Integration**: Seamlessly build and populate the graph from JSON data, particularly tailored for GCP permission structures.

## Getting Started

To use this library, clone the repo and include the main classes in your project.

```javascript
const Graph = require('./path_to_graph_class');
// Use the Graph class as demonstrated in the provided examples
Usage
Creating a Graph
javascript
Copy code
const graph = new Graph();
Adding Nodes and Edges
javascript
Copy code
graph.addNode('node_id', 'node_type');
graph.addEdge('source_id', 'target_id', 'role');
Working with Ancestors
javascript
Copy code
graph.setAncestors('node_id', ancestorsArray);
graph.connectAncestors('node_id', ancestorsArray);
Extracting Information
javascript
Copy code
let extractedId = graph.extract('stringToExtractFrom', 'extractionType');
Examples
Refer to the provided examples for detailed usage.

Contributing
Contributions, issues, and feature requests are welcome. Feel free to check issues page for open issues or submit new ones.
