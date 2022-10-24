/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	DirectionalHint,
	Icon,
	Slider,
	Text,
	TooltipDelay,
	TooltipHost,
} from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import { memo } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import type { ThresholdSliderProps } from './ThresholdSlider.types.js'

export const ThresholdSlider: React.FC<ThresholdSliderProps> = memo(
	function ThresholdSlider({ label, helpText, width, thresholdState }) {
		const [threshold, setThreshold] = useRecoilState(thresholdState)
		const tooltipId = useId('tooltip')
		return (
			<Container style={{ width: width ?? '100%' }}>
				<Text variant="small">
					{label}
					{helpText && (
						<TooltipHost
							delay={TooltipDelay.zero}
							id={tooltipId}
							content={helpText}
							directionalHint={DirectionalHint.bottomCenter}
						>
							<Icon style={iconStyle} iconName="info" />
						</TooltipHost>
					)}
				</Text>
				<Slider
					max={1.0}
					value={threshold}
					step={0.01}
					styles={{
						valueLabel: { fontSize: '8pt' },
						slideBox: { padding: 0, flex: 1 },
					}}
					onChange={setThreshold}
				/>
			</Container>
		)
	},
)

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

const iconStyle = {
	verticalAlign: 'bottom',
	marginLeft: '5px',
	cursor: 'pointer',
}
