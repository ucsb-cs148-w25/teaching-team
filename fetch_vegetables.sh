#!/bin/bash

# Fetch data from the PostgreSQL database
psql $DATABASE_URL -c "SELECT json_agg(vegetables) FROM vegetables;" -t -A
