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

function renderEntry([entryLabel, entryObj]) {
	switch ('type' in entryObj ? entryObj.type : '') {
		case 'date':
			console.log('switch case date')
			console.log('')
			utils.renderDate(entryLabel, entryObj)
			break
		case 'select':
			console.log('switch case select')
			console.log('')
			utils.renderSelect(entryLabel, entryObj)
			break
		case 'schema':
			console.log('switch case schema')
			console.log('')
			utils.renderSchema(entryLabel, entryObj)
			break
		default:
			console.log('switch case default')
			console.log('')
			utils.renderDefault()
			break
	}
}

entries.forEach(renderEntry)
