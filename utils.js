const body = document.body

export function getLabelAndHint(entryLabel, entryObj) {
	let label =
		'label' in entryObj
			? entryObj.label
			: entryLabel?.charAt(0)?.toUpperCase() + entryLabel?.slice(1) ?? ''
	let hint = 'hint' in entryObj ? entryObj.hint : ''
	return [label, hint]
}

export function renderDate(entryLabel, entryObj) {
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

export function renderSelect(entryLabel, entryObj) {
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

export function createOption([value, text]) {
	const option = document.createElement('option')
	option.value = value
	option.textContent = text
	return option
}

export function renderSchema(entryLabel, entryObj) {
	console.log('renderSchema function')
	console.log('')

	const [labelText, hint] = getLabelAndHint(entryLabel, entryObj)

	const schema = entryObj.schema

	const legend = document.createElement('legend')
	legend.textContent = labelText

	const fieldSet = document.createElement('fieldset')

	console.log(schema)
}

export function renderDefault() {}
