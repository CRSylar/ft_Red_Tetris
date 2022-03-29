#!/bin/bash
yarn install

if [[ $? == '0' ]]
	then
		echo "install ok start NextjsApp in DevMode"
		yarn add prisma
		npx prisma migrate dev --name containerMigration
		npx prisma generate
		yarn dev
	else
		echo 'Something Bad ! install failed'
fi
