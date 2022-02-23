import {useState} from "react";
import {createStage} from "../Utility";

export const useStage = () => {

	const [stage, setStage] = useState(createStage())

	return [stage, setStage];
}