#!/bin/sh
yarn install

if [[ $? == '0' ]]
	then
		echo "install ok start Server in DevMode" && yarn start:dev
	else
		echo 'Something Bad ! install failed'
fi