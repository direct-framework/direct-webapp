<!-- markdownlint-disable MD041 -->

[![GitHub](https://img.shields.io/github/license/direct-framework/direct-webapp)](https://raw.githubusercontent.com/direct-framework/direct-webapp/main/LICENSE)
[![Test and build](https://github.com/direct-framework/direct-webapp/actions/workflows/ci.yml/badge.svg)](https://github.com/direct-framework/direct-webapp/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/direct-framework/direct-webapp/graph/badge.svg?token=56K64XN243)](https://codecov.io/gh/direct-framework/direct-webapp)

# DIRECT Framework Webapp

A Django webapp implementing the [DIRECT competencies framework](https://github.com/direct-framework/digital-research-competencies-framework/) as a website that can:

- Allow browsing of all the skills.
- Allow people to score their own skills and view their skill wheels.
- Display and link the professional development resources curated for each skill.

This Django project uses:

- [`pip-tools`] for packaging and dependency management.
- [`pre-commit`](https://pre-commit.com/) for various linting, formatting and static type checking. Pre-commit hooks are automatically kept updated with [pre-commit.ci](https://pre-commit.ci).
- [`pytest`](https://pytest.org/) and [GitHub Actions](https://github.com/features/actions).

[`pip-tools`] is chosen as a lightweight dependency manager that adheres to the [latest standards](https://peps.python.org/pep-0621/) using `pyproject.toml`.

## Related links

- [DIRECT framework](https://github.com/direct-framework/digital-research-competencies-framework#about)
- [History of the project - including competency wheels UI](https://github.com/direct-framework/digital-research-competencies-framework#history)
- [Skills and competencies - definitions](https://github.com/direct-framework/digital-research-competencies-framework#competency-framework)
- [Contributors](https://github.com/direct-framework/digital-research-competencies-framework#contributors)

## Current Status

- [x] Initial research
- [x] Initial development <-- We are here
- [ ] Minimum viable product
- [ ] Alpha release
- [ ] Feature-complete release

## Installation

To get started:

1. Create and activate a [virtual environment](https://docs.python.org/3/library/venv.html):

   ```bash
   python -m venv .venv
   source .venv/bin/activate # with Powershell on Windows: `.venv\Scripts\Activate.ps1`
   ```

2. Install development requirements:

   ```bash
   pip install -r dev-requirements.txt
   ```

3. (Optionally) install tools for building documentation:

   ```bash
   pip install -r doc-requirements.txt
   ```

4. Install the git hooks:

   ```bash
   pre-commit install
   ```

5. Run the webapp:

   ```bash
   python manage.py runserver
   ```

   When running the webapp for the first time you may get a warning similar to:

   `You have 19 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, main, sessions.`

   If this is the case, stop your webapp (with CONTROL-C) and apply the migrations with:

   ```bash
   python manage.py migrate
   ```

   then restart it.

6. Run the tests:

   ```bash
   pytest
   ```

7. Create an admin account to access admin backend:

   ```bash
   python manage.py createsuperuser
   ```

8. To populate the db with Categories and Skills from a yaml or json version of the framework

   ```bash
   python -m scripts.populate_db [-j data.json]|[-y data.yaml]
   ```

### Installation with Docker

The app can be run within a Docker container and a `docker-compose.yml` file is provided
to make this easy for development.

Requirements:

1. You have a modern version of [Docker](https://docs.docker.com/desktop/) installed.
2. You have a JSON version of the framework saved at `data/skills-competencies-framework.json`.

To launch the server run:

```bash
docker compose up
```

The app will be available at <http://127.0.0.1:8000/> <!-- markdown-link-check-disable-line -->

As above, create a superuser with

```bash
docker compose exec app python manage.py createsuperuser
```

The framework should be automatically loaded into the database.

## Updating Dependencies

To add or remove dependencies:

1. Edit the `dependencies` variables in the `pyproject.toml` file (aim to keep development tools separate from the project requirements).
2. Update the requirements files:
   - `pip-compile` for `requirements.txt` - the project requirements.
   - `pip-compile --extra dev -o dev-requirements.txt` for the development requirements.
   - `pip-compile --extra doc -o doc-requirements.txt` for the documentation tools.
3. Sync the files with your installation (install packages):
   - `pip-sync *requirements.txt`

To upgrade pinned versions, use the `--upgrade` flag with `pip-compile`.

Versions can be restricted from updating within the `pyproject.toml` using standard python package version specifiers, i.e. `"black<23"` or `"pip-tools!=6.12.2"`

[`pip-tools`]: https://pip-tools.readthedocs.io/en/latest/

## Working with NPM

This project includes an NPM-based setup for managing front-end assets like styles, scripts, and other resources. The `package.json` file contains predefined scripts to help with building and managing assets. You don't need to run these NPM commands if you are developing the Django app locally. You should only run these commands when needed, for example if you are changing javascript dependencies or modifying SCSS files.

### Prerequisites

Ensure you have Node.js (v16 or higher) and NPM installed. You can verify their installation with:

```bash
npm version
```

### Installing Dependencies

After cloning the repository, navigate to the project directory and install the required NPM dependencies:

```bash
npm install
```

### Building all frontend assets

To build all styles, scripts, and vendor files, run:

```bash
npm run build
```

The above script performs all the following tasks, which are available as individual commands:

- **Build Expanded Styles**: `npm run styles:expanded` (builds expanded human-readable css files)
- **Build Minified Styles**: `npm run styles:minified` (builds minified css files, optimised for production)
- **Build Expanded Scripts**: `npm run scripts:expanded` (builds expanded human-readable javascript files)
- **Build Minified Scripts**: `npm run scripts:minified` (builds minified javascript files, optimised for production)
- **Build Vendor Files**: `npm run vendor` (bundles and optimises third-party libraries)

```bash
npm run styles:expanded
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://horsfall.dev"><img src="https://avatars.githubusercontent.com/u/1079934?v=4?s=100" width="100px;" alt="Dave Horsfall"/><br /><sub><b>Dave Horsfall</b></sub></a><br /><a href="#design-davehorsfall" title="Design">🎨</a> <a href="#code-davehorsfall" title="Code">💻</a> <a href="#projectManagement-davehorsfall" title="Project Management">📆</a> <a href="#maintenance-davehorsfall" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AdrianDAlessandro"><img src="https://avatars.githubusercontent.com/u/40875798?v=4?s=100" width="100px;" alt="Adrian D'Alessandro"/><br /><sub><b>Adrian D'Alessandro</b></sub></a><br /><a href="#design-AdrianDAlessandro" title="Design">🎨</a> <a href="#code-AdrianDAlessandro" title="Code">💻</a> <a href="#test-AdrianDAlessandro" title="Tests">⚠️</a> <a href="#maintenance-AdrianDAlessandro" title="Maintenance">🚧</a> <a href="#projectManagement-AdrianDAlessandro" title="Project Management">📆</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TinyMarsh"><img src="https://avatars.githubusercontent.com/u/13540127?v=4?s=100" width="100px;" alt="Ryan"/><br /><sub><b>Ryan</b></sub></a><br /><a href="#code-TinyMarsh" title="Code">💻</a> <a href="#infra-TinyMarsh" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#tool-TinyMarsh" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tdjames1"><img src="https://avatars.githubusercontent.com/u/10053102?v=4?s=100" width="100px;" alt="T D James"/><br /><sub><b>T D James</b></sub></a><br /><a href="#code-tdjames1" title="Code">💻</a> <a href="#test-tdjames1" title="Tests">⚠️</a> <a href="#maintenance-tdjames1" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/connoraird"><img src="https://avatars.githubusercontent.com/u/61978554?v=4?s=100" width="100px;" alt="Connor Aird"/><br /><sub><b>Connor Aird</b></sub></a><br /><a href="#code-connoraird" title="Code">💻</a> <a href="#test-connoraird" title="Tests">⚠️</a> <a href="#maintenance-connoraird" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://personalpages.manchester.ac.uk/staff/Andrew.Gait/"><img src="https://avatars.githubusercontent.com/u/13529420?v=4?s=100" width="100px;" alt="Andrew Gait"/><br /><sub><b>Andrew Gait</b></sub></a><br /><a href="#ideas-andrewgait" title="Ideas, Planning, & Feedback">🤔</a> <a href="#code-andrewgait" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://brynnoelubald.com/"><img src="https://avatars.githubusercontent.com/u/55503826?v=4?s=100" width="100px;" alt="Bryn Noel Ubald"/><br /><sub><b>Bryn Noel Ubald</b></sub></a><br /><a href="#tool-bnubald" title="Tools">🔧</a> <a href="#code-bnubald" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jklebes"><img src="https://avatars.githubusercontent.com/u/11175421?v=4?s=100" width="100px;" alt="Jason Klebes"/><br /><sub><b>Jason Klebes</b></sub></a><br /><a href="#bug-jklebes" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sbland"><img src="https://avatars.githubusercontent.com/u/4863319?v=4?s=100" width="100px;" alt="sbland"/><br /><sub><b>sbland</b></sub></a><br /><a href="#code-sbland" title="Code">💻</a> <a href="#design-sbland" title="Design">🎨</a> <a href="#ideas-sbland" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-sbland" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/barneydobson"><img src="https://avatars.githubusercontent.com/u/29261471?v=4?s=100" width="100px;" alt="barneydobson"/><br /><sub><b>barneydobson</b></sub></a><br /><a href="#code-barneydobson" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/anenadic/professional-cv"><img src="https://avatars.githubusercontent.com/u/631719?v=4?s=100" width="100px;" alt="Aleksandra Nenadic"/><br /><sub><b>Aleksandra Nenadic</b></sub></a><br /><a href="#code-anenadic" title="Code">💻</a> <a href="#maintenance-anenadic" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SaranjeetKaur"><img src="https://avatars.githubusercontent.com/u/28556616?v=4?s=100" width="100px;" alt="Saranjeet Kaur"/><br /><sub><b>Saranjeet Kaur</b></sub></a><br /><a href="#maintenance-saranjeetkaur" title="Maintenance">🚧</a> <a href="#code-saranjeetkaur" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/apps/github-actions"><img src="https://avatars.githubusercontent.com/in/15368?v=4?s=100" width="100px;" alt="github-actions[bot]"/><br /><sub><b>github-actions[bot]</b></sub></a><br /><a href="#maintenance-github-actions[bot]" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/apps/pre-commit-ci"><img src="https://avatars.githubusercontent.com/in/68672?v=4?s=100" width="100px;" alt="pre-commit-ci[bot]"/><br /><sub><b>pre-commit-ci[bot]</b></sub></a><br /><a href="#code-pre-commit-ci[bot]" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/amangoel185"><img src="https://avatars.githubusercontent.com/u/10528392?v=4?s=100" width="100px;" alt="Aman Goel"/><br /><sub><b>Aman Goel</b></sub></a><br /><a href="#maintenance-amangoel185" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PhilReedData"><img src="https://avatars.githubusercontent.com/u/25770348?v=4?s=100" width="100px;" alt="Phil Reed"/><br /><sub><b>Phil Reed</b></sub></a><br /><a href="#maintenance-philreeddata" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://tbyhdgs.info"><img src="https://avatars.githubusercontent.com/u/9694524?v=4?s=100" width="100px;" alt="Toby Hodges"/><br /><sub><b>Toby Hodges</b></sub></a><br /><a href="#code-tobyhodges" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/GeoDaoyu"><img src="https://avatars.githubusercontent.com/u/34641603?v=4?s=100" width="100px;" alt="geodaoyu"/><br /><sub><b>geodaoyu</b></sub></a><br /><a href="#code-geodaoyu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cc-a"><img src="https://avatars.githubusercontent.com/u/16690296?v=4?s=100" width="100px;" alt="Christopher Cave-Ayland"/><br /><sub><b>Christopher Cave-Ayland</b></sub></a><br /><a href="#maintenance-cc-a" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Sahil590"><img src="https://avatars.githubusercontent.com/u/56438860?v=4?s=100" width="100px;" alt="Sahil Raja"/><br /><sub><b>Sahil Raja</b></sub></a><br /><a href="#maintenance-sahil590" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
