#!/bin/bash

if test ${#*} -ne 1
then
	echo "Usage: $0 SERVER_URL"
	exit -1
fi

while true
do
	curl --data "hostname=$HOSTNAME&ip=$(curl http://automation.whatismyip.com/n09230945.asp)" $1
	sleep 3600
done

