import {ValidationMessage} from './validation-message';

export const ValidationMessageList:ValidationMessage[]= [
{
	controlName:'Destination1',
	validation:[
      { type: 'invalidAutocompleteObject', message: 'Destination 1 name not recognized. Click one of the autocomplete options.' },
      { type: 'required', message: 'Destination 1 is required.' }
    ]
},
{
	controlName:'Destination2',
	validation:[
      { type: 'invalidAutocompleteObject', message: 'Destination 2 name not recognized. Click one of the autocomplete options.' },
      { type: 'required', message: 'Destination 2 is required.' }
    ]
},
{
	controlName:'Destination3',
	validation:[
      { type: 'invalidAutocompleteObject', message: 'Destination 3 name not recognized. Click one of the autocomplete options.' },
      { type: 'required', message: 'Destination 3 is required.' }
    ]
},
{
	controlName:'Destination4',
	validation:[
      { type: 'invalidAutocompleteObject', message: 'Destination 4 name not recognized. Click one of the autocomplete options.' },
      { type: 'required', message: 'Destination 4 is required.' }
    ]
},
{
controlName:'Search',
  validation:[
      { type: 'required', message: 'Please Select all Required Fields.' }
    ]
}
];
