# Fixtures

This folder contains Django [fixtures](https://docs.djangoproject.com/en/6.0/topics/db/fixtures/#fixtures-explanation) - files that contain the serialized contents of the database. These can be used to quickly load data into a freshly initialised database (in development or in production).

## Creating / updating the fixtures

The fixtures were originally created by the following process:

1. manually gather the CSV files from <https://github.com/direct-framework/digital-research-competencies-framework/tree/main/framework>
2. load each CSV into a fresh dev database through the Django admin interface. Ordering is important as some tables reference others:
    1. competency domains
    1. competencies
    1. providers
    1. learning resources
    1. skill levels
    1. tools, languages, and methodologies
    1. skills
3. on the command line, "dump" the data to json in fixture format: `python manage.py dumpdata -o direct_webapp/fixtures/data.json main --exclude main.user`
    * `-o` sets the output location to `direct_webapp/fixtures/data.json`
    * `main` selects the app to export
    * `--exclude` selects models to exclude from the export (in this case the user table)

The fixtures can then be loaded in a fresh database with `python manage.py loaddata direct_webapp/fixtures/framework-2-0.json`.

The process can be repeated to update the fixtures. In future a script could be developed to automate updating the fixture when the framework is updated, if we decide to keep them in sync.
