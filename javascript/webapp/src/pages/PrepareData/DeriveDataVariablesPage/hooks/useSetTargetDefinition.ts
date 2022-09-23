/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { Definition } from '@showwhy/types'
import { useCallback } from 'react'

import { useSaveDefinition } from '~hooks'
import { useDefinitions } from '~state'

export function useSetTargetDefinition(): (
	selectedDefinitionId: string,
	column: string,
) => boolean {
	const definitions = useDefinitions()
	const saveDefinition = useSaveDefinition()

	return useCallback(
		(selectedDefinitionId: string, column: string) => {
			const all: Definition[] = [...definitions]

			const newDefinition = {
				...all?.find(x => x.id === selectedDefinitionId),
			} as Definition

			if (newDefinition) {
				newDefinition.column =
					newDefinition.column === column ? undefined : column
			}

			saveDefinition(newDefinition)
			return !!newDefinition.column
		},
		[saveDefinition, definitions],
	)
}
