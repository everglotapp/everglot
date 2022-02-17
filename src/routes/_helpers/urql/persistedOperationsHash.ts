import persistedOperations from "../../../graphql.client.json"

import type { DocumentNode, OperationDefinitionNode } from "graphql"

export async function generateHash(
    _query: string,
    document: DocumentNode
): Promise<string> {
    // Note that we're assuming that the first definition is a operation
    // definition rather than a FragmentDefinitionNode.
    // Also we're ignoring the query variable meaning that we
    // cannot just use raw query strings. To change that, return its hash.
    const operationName = (document?.definitions[0] as OperationDefinitionNode)
        ?.name?.value
    if (operationName) {
        return persistedOperations[
            operationName as keyof typeof persistedOperations
        ]
    }
    throw new Error("Failed to resolve persisted operation hash")
}
export default generateHash
