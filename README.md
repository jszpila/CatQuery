# CatQuery
An API for cats!

## Installation
Do the usual:

    npm install

## Usage
### Environment
Make sure you have the following environment variables set: 

| Key | Description | Default
|---  |--- | ---
| CATS_DB_HOST | URI of MySQL server  | localhost
| CATS_DB_PORT | MySQL server's port | 3306
| CATS_DB_NAME | Name of database to use for CatQuery | cats
| CATS_DB_USER | Database's username | test
| CATS_DB_PASS | Database user's password | test
| CATS_SHARED_SECRET | String to use for generating authentication token  | test
| CATS_PORT | Port to run the application on | 3000

### Database
Run sql/cats.sql in the mysql cli or in mysql workbench to set up the scheme. No stub data for now, sorry :(

### Up and Running
    npm start

also start your mysql server, if it's not already running

### Testing
    npm test

### Endpoints
_<sup>*</sup> denotes optional field_

#### POST */cat/login*  
Login to CatQuery  

##### Request Body
| Parameter | Type   |
|-----------|--------|
| username  | String |
| password  | String |

##### Returns 

| Field      | Type           |
|------------|----------------|
| authToken  | Java Web Token |


#### POST */cat/register*  
Register a cat

##### Request Body
| Parameter             | Type   |
|-----------------------|--------|
| birthdate<sup>*</sup> | Date   |
| breed<sup>*</sup>     | String |
| imageUrl<sup>*</sup>  | String |
| name                  | String |
| password              | String |
| username              | String |
| weight                | Float  |

##### Returns
nothing

#### GET */cats/random*
Gets a random cat

##### Headers
| Parameter    | Type           |
|--------------|----------------|
| Bearer Token | Java Web Token |

##### Request Body
None

##### Returns
| Fields    | Type   |
|-----------|--------|
| breed     | String |
| imageUrl  | String |
| name      | String |

#### GET */cats/*
##### Headers
| Parameter    | Type           |
|--------------|----------------|
| Bearer Token | Java Web Token |

##### Request Body
| Parameter             | Type   |
|-----------------------|--------|
| id<sup>*</sup>        | String |
| name<sup>*</sup>      | String |
| username<sup>*</sup>  | String |

##### Returns
Array of cats, ordered by user's `lastSeenAt`, in descending order:
| Fields    | Type   |
|-----------|--------|
| birthdate | Date   |
| breed     | String |
| imageUrl  | String |
| name      | String |
| username  | String |
| weight    | Float  |
| id        | Int    |