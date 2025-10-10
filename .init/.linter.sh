#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-to-do-list-175208-175218/to_do_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

