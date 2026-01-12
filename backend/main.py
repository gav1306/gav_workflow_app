from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineRequest(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


def is_dag(nodes: list[dict], edges: list[dict]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG).
    A DAG is a graph with no cycles - you can't start from a node and come back to it.
    
    We use Kahn's Algorithm (Topological Sort):
    1. Count incoming edges for each node
    2. Start with nodes that have no incoming edges
    3. Remove those nodes and reduce counts for their neighbors
    4. If we can process all nodes, there's no cycle = it's a DAG
    """
    
    # Empty graph is a valid DAG
    if not nodes:
        return True

    # Step 1: Get all node IDs
    all_node_ids = set()
    for node in nodes:
        all_node_ids.add(node["id"])
    
    # Step 2: Build the graph structure
    # - neighbors: who does each node point to?
    # - incoming_count: how many edges point TO each node?
    neighbors = {}
    incoming_count = {}
    
    for node_id in all_node_ids:
        neighbors[node_id] = []
        incoming_count[node_id] = 0
    
    # Step 3: Fill in the connections from edges
    for edge in edges:
        source = edge.get("source")  # where edge starts
        target = edge.get("target")  # where edge ends
        
        # Only count edges between valid nodes
        if source in all_node_ids and target in all_node_ids:
            neighbors[source].append(target)
            incoming_count[target] += 1
    
    # Step 4: Find starting nodes (nodes with no incoming edges)
    nodes_to_process = []
    for node_id in all_node_ids:
        if incoming_count[node_id] == 0:
            nodes_to_process.append(node_id)
    
    # Step 5: Process nodes one by one
    processed_count = 0
    
    while len(nodes_to_process) > 0:
        # Take one node from the list
        current_node = nodes_to_process.pop(0)
        processed_count += 1
        
        # For each neighbor, reduce their incoming count
        for neighbor in neighbors[current_node]:
            incoming_count[neighbor] -= 1
            
            # If neighbor now has no incoming edges, add to process list
            if incoming_count[neighbor] == 0:
                nodes_to_process.append(neighbor)
    
    # Step 6: If we processed all nodes, there's no cycle = it's a DAG
    # If some nodes couldn't be processed, there's a cycle = not a DAG
    return processed_count == len(all_node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest) -> PipelineResponse:
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag_result
    )
