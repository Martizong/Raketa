import * as utils from './utils.js'

const schema = {
	birthdate: {
		type: 'date',
		label: 'Date of birth',
		hint: 'We will send you a gift!',
	},
	gender: {
		type: 'select',
		options: [
			[0, 'Male'],
			[1, 'Female'],
			[9, 'Do not specify'],
		],
		placeholder: 'Please select',
	},
	address: {
		type: 'schema',
		schema: {
			zip: {
				type: 'text',
				pattern: '[1-9]{1}[0-9]{3}',
			},
			street: {
				type: 'textarea',
			},
		},
	},
}

const entries = Object.entries(schema)

function renderEntry([key, options]) {
	switch (options.type) {
		case 'date':
			utils.renderDate(key, options)
			break
		case 'select':
			utils.renderSelect(key, options)
			break
		case 'schema':
			utils.renderSchema(key, options)
			break
		default:
			utils.renderDefault()
			break
	}
}

entries.forEach(renderEntry)
