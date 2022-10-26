/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DefaultButton, FocusZone } from '@fluentui/react'
import { memo } from 'react'
import styled from 'styled-components'

import { icons } from './EdgeItem.styles.js'
import {
	useOnAddAll,
	useOnFlip,
	useOnPin,
	useOnRemove,
	useOnRenderItem,
} from './EdgeList.hooks.js'
import type { EdgeListProps } from './EdgeList.types.js'

export const EdgeList: React.FC<EdgeListProps> = memo(function EdgeList({
	relationships,
	variable,
	onSelect,
	constraints,
	onUpdateConstraints,
}) {
	// const groupedList = groupByEffectType(relationships, variable.columnName)

	const onPin = useOnPin(constraints, onUpdateConstraints)
	const onRemove = useOnRemove(constraints, onUpdateConstraints)
	const onFlip = useOnFlip(constraints, onUpdateConstraints)
	const onAddAll = useOnAddAll(
		constraints,
		relationships,
		onUpdateConstraints,
		variable,
	)

	const renderItem = useOnRenderItem(
		onSelect,
		onFlip,
		onPin,
		onRemove,
		variable,
		constraints,
	)

	return (
		<FocusZone>
			<ButtonsContainer>
				<DefaultButton
					iconProps={icons.causes}
					onClick={() => onAddAll('causes')}
				>
					All as causes
				</DefaultButton>
				<DefaultButton
					iconProps={icons.causedBy}
					onClick={() => onAddAll('effects')}
				>
					All as caused
				</DefaultButton>
			</ButtonsContainer>
			{relationships.map(relationship => {
				return <div key={relationship.key}>{renderItem(relationship)}</div>
			})}
		</FocusZone>
	)
})

const ButtonsContainer = styled.div`
	width: 100%;
`
