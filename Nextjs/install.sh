#!/bin/sh
yarn install

if [[ $? == '0' ]]
	then
		echo "install ok start NextjsApp in DevMode"
		yarn dev
	else
		echo 'Something Bad ! install failed'
fi