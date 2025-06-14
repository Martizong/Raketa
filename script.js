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

const body = document.body
const entries = Object.entries(schema)

function renderEntry([entryLabel, entryObj]) {
	switch ('type' in entryObj ? entryObj.type : '') {
		case 'date':
			console.log('switch case date')
			console.log('')
			renderDate(entryLabel, entryObj)
			break
		case 'select':
			console.log('switch case select')
			console.log('')
			renderSelect(entryLabel, entryObj)
			break
		case 'schema':
			console.log('switch case schema')
			console.log('')
			renderSchema(entryLabel, entryObj)
			break
		default:
			break
	}
}

function getLabelAndHint(entryLabel, entryObj) {
	let label =
		'label' in entryObj
			? entryObj.label
			: entryLabel?.charAt(0)?.toUpperCase() + entryLabel?.slice(1) ?? ''
	let hint = 'hint' in entryObj ? entryObj.hint : ''
	return [label, hint]
}

function renderDate(entryLabel, entryObj) {
	console.log('renderDate function')
	console.log('')

	const [labelText, hint] = getLabelAndHint(entryLabel, entryObj)

	const wrapperDiv = document.createElement('div')
	wrapperDiv.id = 'date-wrapper'

	const label = document.createElement('label')
	label.setAttribute('for', entryLabel)
	label.textContent = labelText

	const input = document.createElement('input')
	input.type = 'date'
	input.name = entryLabel
	input.id = entryLabel

	const hintDiv = document.createElement('div')
	hintDiv.textContent = hint

	wrapperDiv.appendChild(label)
	wrapperDiv.appendChild(input)
	if (hint) wrapperDiv.appendChild(hintDiv)
	body.appendChild(wrapperDiv)
}

function renderSelect(entryLabel, entryObj) {
	console.log('renderSelect function')
	console.log('')

	const [labelText, hint] = getLabelAndHint(entryLabel, entryObj)

	const wrapperDiv = document.createElement('div')
	wrapperDiv.id = 'select-wrapper'

	const options = entryObj.options.map(createOption)

	const placeholderText = entryObj.placeholder

	const label = document.createElement('label')
	label.setAttribute('for', entryLabel)
	label.textContent = labelText

	const select = document.createElement('select')
	select.name = entryLabel
	select.id = entryLabel

	const placeholderElement = document.createElement('option')
	placeholderElement.textContent = placeholderText
	placeholderElement.value = ''

	select.appendChild(placeholderElement)
	options.forEach((option) => select.appendChild(option))
	wrapperDiv.appendChild(select)
	body.appendChild(wrapperDiv)
}

function createOption([value, text]) {
	const option = document.createElement('option')
	option.value = value
	option.textContent = text
	return option
}

function renderSchema(entryLabel, entryObj) {
	console.log('renderSchema function')
	console.log('')

	const [labelText, hint] = getLabelAndHint(entryLabel, entryObj)

	const wrapperDiv = document.createElement('div')
	wrapperDiv.id = 'schema-wrapper'

	const legend = document.createElement('legend')
	legend.textContent = labelText

	const fieldSet = document.createElement('fieldset')
}

function renderDefault() {}

entries.forEach(renderEntry)
