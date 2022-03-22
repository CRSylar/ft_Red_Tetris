import  { PrismaClientKnownRequestError}  from "@prisma/client/runtime";

let errorMap = new Map(
	[
		// too long value
		["P2000" , ( res, e ) => res.status(406).json({message: e.message})],

		// The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist
		["P2001" , ( res, e ) => res.status(406).json({message: e.message})],

		// Unique constraint failed on the {constraint}
		["P2002" , ( res, e ) => res.status(406).json({message: e.message})],

		// Foreign key constraint failed on the field: {field_name}
		["P2003" , ( res, e ) => res.status(406).json({message: e.message})],

		// A constraint failed on the database: {database_error}
		["P2004" , ( res, e ) => res.status(406).json({message: e.message})],

		// The value {field_value} stored in the database for the field {field_name} is invalid for the field's type
		["P2005" , ( res, e ) => res.status(406).json({message: e.message})],

		// The provided value {field_value} for {model_name} field {field_name} is not valid
		["P2006" , ( res, e ) => res.status(406).json({message: e.message})],

		// Data validation error {database_error}
		["P2007" , ( res, e ) => res.status(406).json({message: e.message})],

		// Failed to parse the query {query_parsing_error} at {query_position}
		["P2008" , ( res, e ) => res.status(406).json({message: e.message})],

		// Failed to validate the query: {query_validation_error} at {query_position}
		["P2009" , ( res, e ) => res.status(406).json({message: e.message})],

		// Raw query failed. Code: {code}. Message: {message}
		["P2010" , ( res, e ) => res.status(406).json({message: e.message})],

		// Null constraint violation on the {constraint}
		["P2011" , ( res, e ) => res.status(406).json({message: e.message})],

		// Missing a required value at {path}
		["P2012" , ( res, e ) => res.status(406).json({message: e.message})],

		// Missing the required argument {argument_name} for field {field_name} on {object_name}
		["P2013" , ( res, e ) => res.status(406).json({message: e.message})],

		// The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models
		["P2014" , ( res, e ) => res.status(406).json({message: e.message})],

		// A related record could not be found. {details}
		["P2015" , ( res, e ) => res.status(406).json({message: e.message})],

		// Query interpretation error. {details}
		["P2016" , ( res, e ) => res.status(406).json({message: e.message})],

		// The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.
		["P2017" , ( res, e ) => res.status(406).json({message: e.message})],

		// The required connected records were not found. {details}
		["P2018" , ( res, e ) => res.status(406).json({message: e.message})],
	]
)

function dispatchError(res, error) {
	if (error instanceof PrismaClientKnownRequestError) {
		if (errorMap.get(error.code))
			return errorMap.get(error.code)(res,error)
	}
		return res.status(502).json({message: error.message})
}


export default function errorDispatcher(res, error) {
	return dispatchError(res, error)
}