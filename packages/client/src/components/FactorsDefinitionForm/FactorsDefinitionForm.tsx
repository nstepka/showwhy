/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { IComboBoxOption } from '@fluentui/react'
import { memo } from 'react'
import styled from 'styled-components'
import { useFactorsDefinitionForm } from './hooks'
import { PageType, CausalFactor, Experiment, OptionalId } from '~types'

interface FactorsDefinitionFormProps {
	factor?: CausalFactor
	showLevel?: boolean | undefined
	defineQuestion?: Experiment
	pageType: PageType
	variables?: IComboBoxOption[]
	onAdd?: (factor: OptionalId<CausalFactor>) => void
	onChange?: (f: Partial<CausalFactor>) => void
}

export const FactorsDefinitionForm: React.FC<FactorsDefinitionFormProps> = memo(
	function FactorsDefinitionForm({
		factor,
		defineQuestion,
		onAdd,
		onChange,
		showLevel = true,
		pageType,
		variables,
	}) {
		const { level, description, variable } = useFactorsDefinitionForm({
			factor,
			experiment: defineQuestion,
			onChange,
			onAdd,
			pageType,
			variables,
		})

		return (
			<Container showLevel={!!showLevel}>
				{showLevel ? level : null}
				{variable}
				{description}
			</Container>
		)
	},
)

const Container = styled.form<{ showLevel: boolean | undefined }>`
	display: grid;
	grid-template-columns: ${({ showLevel }) =>
		showLevel ? '15% 25% 60%' : '30% 70%'};
	align-items: center;
	padding: 0.5rem 0.2rem;
	border-radius: 0 0 3px 3px;
	background-color: #f1f1f1;
	margin-top: 0.1rem;
`
