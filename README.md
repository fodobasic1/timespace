
# Spica Time app

A frontend application that allows you to browse through employees and presence. 
Also, you can add a new employee. 





## Tech Stack

**Client:** Angular 13, Bootstrap, Ng-Bootstrap, SASS, ngrx

**Server:** TimeAPI


## Prerequisites

To deploy this project on your local machine you have to install following :
- Chrome browser
- [Node](https://nodejs.org/en/) (this includes necessary npm)
- Angular CLI :
  - Open terminal window and run following command
```bash
  npm install -g @angular/cli
```


## Run Locally

After downloading and installing required, clone [git repository](https://github.com/fodobasic1/timespace)
```bash
  git clone https://github.com/fodobasic1/timespace.git
```

Navigate into the root directory 
```bash
  cd timeapp
```

Install node modules
```bash
  npm install
```

Run this application 
```bash
  ng serve
```

Before accessing our application, we will need to create an instance of Chrome that has disabled web security.
The reason behind this is to bypass te CORS required from TimeAPI.

1. Kill all instances of Chrome browser
2. Right click on your desktop - Add New Shortcut
3. Add the target as "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
4. Click OK
5. Open that Shortcut
6. Launch http://localhost:4200  in it

## Credentials

| Username | Password     | Api GUID                |
| :-------- | :------- | :------------------------- |
| `demo` | `demo` | BEF98198-891D-4894-9327-A5E2D279D7CB |
