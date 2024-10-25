## Description

### Touristic Agency Catalog

This project is a comprehensive catalog for managing information on touristic agencies and their available tours. It allows users to create, edit, and view details for agencies and tours. Key functionalities include:

- Agency Management: Add new agencies to the catalog, edit existing agency details, and view agency profiles.    
- Tour Management: Add tours and associate them with specific agencies, edit tour details, and manage existing tour information.     
- Filtering & Sorting: Search and filter tours based on various criteria, and sort results to quickly locate specific information.    

This project provides an organized, user-friendly platform to help users browse, manage, and optimize information related to touristic agencies and their offerings.

## Prerequisites

To run the project, you need to install [docker-compose](https://docs.docker.com/compose/)

## Running the project

Open the terminal

In the terminal, go to the project directory and execute the command:
```bash
docker-compose up
```
The first launch of the project may take several minutes
Subsequent launches will take a few seconds

Wait until you see `[NestApplication] Nest application successfully started` in the terminal

Open the project in browser: http://localhost:3000

Auth credentials:

user - `admin`
password - `NureKharkiv`

### OpenApi 

After the project has been launched, OpenApi specification is available here: http://localhost:3000/api

## Running the tests

(Before running the tests you need to launch the project according to the instructions above)

To run the tests, you need:

Open a separate terminal

In the terminal, go to the project directory and execute the command:
```bash
docker-compose exec app sh -c "npm run test:e2e"
```
