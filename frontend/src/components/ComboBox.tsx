import React from 'react';

import './ComboBox.css';

interface Props{
	label: string;
	placeholder: string;
	items: string[];
	onChangeBox: (value: string) => void;
}

function ComboBox(props: Props) {
	const { label, placeholder, items, onChangeBox } = props;
	
	const options = items.map((item) => {
		return(
			<option value = {item}>{item}</option>
		);
	});
	
	return (
		<div className = 'ComboBox'>
			<label>{label}</label>
			<select onChange = {(e) => onChangeBox(e.target.value)} id="pet-select">
				<option value = {placeholder}>{placeholder}</option>
				{options}
			</select>
		</div>
	  )
}

export default ComboBox;