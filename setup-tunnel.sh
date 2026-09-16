#!/usr/bin/env bash
# RETIRED — do not run.
#
# This predates wildcard subdomain routing. The lodge now maps
# {app-name}.{domain} to the app automatically, so this app is reachable at
# deck.woltspace.com purely because the app is named "deck".
#
# Running this would add a second, explicit tunnel ingress pointing straight
# at :4010, bypassing the lodge's router and its app lifecycle. Kept only as
# a record of how the hostname used to be wired.
#
echo "retired — deck.woltspace.com is handled by wildcard subdomain routing" >&2
exit 1
