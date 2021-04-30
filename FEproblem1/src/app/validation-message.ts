export interface ValidationMessage {
	controlName:string;
	validation:Array<
	{
	type:string,
	message:string
    }
	>;
	
}
