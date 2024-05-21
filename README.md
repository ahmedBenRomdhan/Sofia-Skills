# Sofia Skills 
I fixed backend bugs and improvement ui elements in this application during my summer internship at Sofiatech which helps track employers skills 

## Tech stack:
- Node
- Express
- Angular
- Mysql
- Docker

### Requirements
You have to install docker and docker-compose on your machine to run this application.   

On your windows machine you have to install Docker Desktop   
* https://docs.docker.com/desktop/install/windows-install/  


### Usage in Dev environment
Clone dev branch on your local repository  
* git clone https://github.com/ahmedBenRomdhan/Sofia-Skills.git

Modify .env file with your proper variables.  

Open your source code and launch application with this command  

`docker-compose -f docker-compose.dev.yml up --build`  

> **_NOTE:_**    You use --build option to create your images, once done you can just use this command  
`docker-compose -f docker-compose.dev.yml up`
