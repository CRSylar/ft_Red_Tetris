import React from 'react';
import withAuth from "./HOC/WithAuth";
import MatchComponent from "../components/MatchComponent";

function Match (props) {
	return (
		withAuth(MatchComponent)
	);
}

export default Match;