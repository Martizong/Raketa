const body = document.getElementById('App')

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

export function renderDate(key, { label, hint, ...attributes }) {
	const wrapperDiv = document.createElement('div')
	wrapperDiv.id = 'date-wrapper'

	const labelElement = document.createElement('label')
	labelElement.setAttribute('for', key)
	labelElement.textContent = label ? label : getLabel(key)

	const inputElement = document.createElement('input')
	inputElement.type = 'date'
	inputElement.name = key
	inputElement.id = key
	Object.entries(attributes).forEach(([attribute, value]) =>
		inputElement.setAttribute(attribute, value)
	)

	wrapperDiv.appendChild(labelElement)
	wrapperDiv.appendChild(inputElement)

	if (hint) {
		const hintDiv = document.createElement('div')
		hintDiv.textContent = hint
		wrapperDiv.appendChild(hintDiv)
	}
	body.appendChild(wrapperDiv)
}

export function renderSelect(
	key,
	{ label, hint, options, placeholder, ...attributes }
) {
	const wrapperDiv = document.createElement('div')
	wrapperDiv.id = 'select-wrapper'

	const labelElement = document.createElement('label')
	labelElement.setAttribute('for', key)
	labelElement.textContent = label ? label : getLabel(key)

	const selectElement = document.createElement('select')
	selectElement.name = key
	selectElement.id = key

	const placeholderOption = document.createElement('option')
	placeholderOption.value = ''
	placeholderOption.textContent = placeholder

	selectElement.appendChild(placeholderOption)

	options.forEach(([value, text]) => {
		const option = document.createElement('option')
		option.value = value
		option.textContent = text
		selectElement.appendChild(option)
	})

	Object.entries(attributes).forEach(([attribute, value]) =>
		selectElement.setAttribute(attribute, value)
	)

	wrapperDiv.appendChild(labelElement)
	wrapperDiv.appendChild(selectElement)

	if (hint) {
		const hintDiv = document.createElement('div')
		hintDiv.textContent = hint
		wrapperDiv.appendChild(hintDiv)
	}
	body.appendChild(wrapperDiv)
}

export function renderSchema(key, { label, hint, schema }) {
	const fieldSetElement = document.createElement('fieldset')

	const legend = document.createElement('legend')
	legend.textContent = label ? label : getLabel(key)

	fieldSetElement.appendChild(legend)

	Object.entries(schema).forEach(([inputKey, { type, ...attObj }]) => {
		const wrapperDiv = document.createElement('div')

		const label = document.createElement('label')
		label.setAttribute('for', `${key}[${inputKey}]`)
		label.textContent = getLabel(inputKey)

		let input

		if (type === 'textarea') {
			input = document.createElement('textarea')
		} else {
			input = document.createElement('input')
		}

		switch (type) {
			case 'textarea':
				break
			case 'text':
				break
			default:
				break
		}

		input.name = `${key}[${inputKey}]`
		input.id = `${key}[${inputKey}]`
		Object.entries(attObj).forEach(([attribute, value]) =>
			input.setAttribute(attribute, value)
		)

		wrapperDiv.appendChild(label)
		wrapperDiv.appendChild(input)

		fieldSetElement.appendChild(wrapperDiv)
	})

	if (hint) {
		const hintDiv = document.createElement('div')
		hintDiv.textContent = hint
		fieldSetElement.appendChild(hintDiv)
	}

	body.appendChild(fieldSetElement)
}

const getLabel = (str) => `${str.charAt(0)?.toUpperCase()}${str.slice(1)}`

function renderEntry([key, options]) {
	switch (options.type) {
		case 'date':
			renderDate(key, options)
			break
		case 'select':
			renderSelect(key, options)
			break
		case 'schema':
			renderSchema(key, options)
			break
		default:
			break
	}
}

Object.entries(schema).forEach(renderEntry)
