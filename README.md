# React-Redux Application Boilerplate

In this repository you will find an efficient, easily understandable React-redux boilerplate.

## Main purpose

The main purpose of this repository is to mninimize the app setup time to start coding as soon as possible and to provide a robust, well organized folder/file structure for your application.

Please note that i don't recommend such a structure for beginners or small projects although it would be great to get familiar with it as soon as possible.


## Requirements
    - Understanding of react workflow.
    - Understanding of Redux and react-redux key concepts.

## Getting Started:

### Cloning repository

    - Clone the repository on your machine using :  git clone https://github.com/HediBenFraj/React-Redux-Boilerplate.git
    - navigate to project directory and run : npm install
    - start the application by running : npm start
    - ( Optional ) : change the DOMAIN_URL constant in ./_constants/server.constants.js to an api with authentication metod to replicate my experience.

### Required dependencies 

### Folder/File structure 

    __src
     |
     |__ _actions
     |        |__ <module>.actions.js 
     |        |__ index.js
     |
     |__ _constants
     |        |__ <module>.constants.js
     |        |__ index.js
     |
     |__ _helpers
     |        |__ store.js
     |        |__ history.js
     |        |__ index.js
     |         
     |__ _reducers
     |        |__ <module>.reducer.js
     |        |__ index.js
     |
     |__ _services
     |        |
     |        |__ <module>.service.js
     |
     |__ Assets
     |
     |__ Components
     |        |__ <Component>
     |                 |_ <Component>.test.js 
     |                 |_ <Component>.css
     |                 |_ <component>.js
     |                 |_ index.js
     |__ index.js

### Undestanding the Folder/File structure

    - ./<folder>/index.js

#### actions

The index.js files in each folder are only used for east of referencing modules while importing.

    - ./src/actions  

This folder will house our redux action creators.
    
    - ./src/actions/<module>.actions.js

This file will have the implementation of our actions.