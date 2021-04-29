export interface ValidationMessage {
	controlName:string;
	error:[
	{
	type:string,
	message:string
    }
	];
	
}
