#!/bin/sh
set -e

echo "Running migrations..."
python manage.py migrate --noinput

echo "Loading framework into Database..."
python -m scripts.populate_db -j data/skills-competencies-framework.json

echo "Starting Gunicorn..."
exec "$@"
