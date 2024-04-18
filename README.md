# Whole documentation
[Sutairu documentation](https://docs.google.com/document/d/1qAOUsqrAk1I9rTDvbv2dH3OvIv1MVOP06cIqHcnIDow/edit?usp=sharing)

# Sutairu web-app

## Overview
**Sutairu** is a front-end app (**SPA**) for **selling** and **managing** products like clothes and decor.
The **application** allows **visitors** to **browse** through the **products catalogs**. **Users** may **register** with an **email** and **password** which allows them to **ctreate** their **own personal profile**. **Users with profiles** can also **edit** or **delete** their own
**accounts** at any time + personalised them with uploading their own profile picture.

![Home page](https://github.com/sNOBODYs/SutairuShop/assets/80042389/14337a87-6af8-485b-aa49-c92f42c06c88)

The **SPA**"**Sutairu**" is an app for **shopping** japanesse stok, like **various clothes** and **decor**.
  - Technologies: JavaScript, HTML,CSS,Node.js,Express.js,Redux,MongoDB,Firebase,Nodemailer,Jest and others

## Pages and permissions

**All users** :lock:
- :pushpin: Home `/home`
  
  ![Home page](https://github.com/sNOBODYs/SutairuShop/assets/80042389/14337a87-6af8-485b-aa49-c92f42c06c88)
  
- :pushpin: Product page `/{main category/sub category}`

  ![Screenshot 2024-03-30 172616](https://github.com/sNOBODYs/SutairuShop/assets/80042389/c3d8ae02-dbed-4774-ad31-738b545b89f4)
  
- :pushpin: Product details `/products/:id`

  ![Screenshot 2024-03-30 173446](https://github.com/sNOBODYs/SutairuShop/assets/80042389/1c93bc0e-72ee-419b-ad22-38903eb08333)
  
- :pushpin: Login `/login`
  
  ![Screenshot 2024-03-30 154740](https://github.com/sNOBODYs/SutairuShop/assets/80042389/d7ac6daa-5aa2-4570-8325-1ba4048392ae)
  
- :pushpin: Register `/signup`
  
  ![Screenshot 2024-03-30 155919](https://github.com/sNOBODYs/SutairuShop/assets/80042389/a6b70f30-b08a-48af-ba1f-3024fcf61aa6)
  
- :pushpin: Contact us `/contact-us`
  
  ![Screenshot 2024-04-14 220106](https://github.com/sNOBODYs/SutairuShop/assets/80042389/1969bb15-9cd6-4eaa-bc2e-3b6b27090ec6)
  
- :pushpin: About us `/about-us`
  
  ![Screenshot 2024-04-14 215622](https://github.com/sNOBODYs/SutairuShop/assets/80042389/da34c028-b9cc-4cfa-b67c-6b219995edaf)

  ## Authentication users :lock_with_ink_pen:
  
- :pushpin: Home `/home`
- :pushpin: Product page `/{main category/sub category}`
- :pushpin: Product details `/products/:id`
- :pushpin: About us `/about-us`
- :pushpin: Contact us `/contact-us`
- :pushpin: Profile: `/account`
- 
  ![Screenshot 2024-04-14 221823](https://github.com/sNOBODYs/SutairuShop/assets/80042389/1b1ad1d2-26f5-4de4-8607-916e4f84854a)
  
- :pushpin: Update Profile `/update-profile`
- 
  ![Screenshot 2024-03-30 161723](https://github.com/sNOBODYs/SutairuShop/assets/80042389/92ee900e-3553-4154-b0df-b64517134a71)
  
- :pushpin: Cart component

  ![Screenshot 2024-03-30 164252](https://github.com/sNOBODYs/SutairuShop/assets/80042389/bf1496a2-4a73-45c2-a7bb-2aaa83538b5c)

  ## Admin users :lock_with_ink_pen:
- :pushpin: Admin page `/dashboard/admin`
- 
  ![Screenshot 2024-04-14 220526](https://github.com/sNOBODYs/SutairuShop/assets/80042389/70371b2e-90a6-4ba1-8360-8f75b7a1a4ce)
  
- :pushpin: Home `/home`
- :pushpin: Product page `/{main category/sub category}`
- :pushpin: Product details `/products/:id`
- :pushpin: About us `/about-us`
- :pushpin: Contact us `/contact-us`
- :pushpin: Profile: `/account`
- :pushpin: Profile: `/account`
- :pushpin: Cart component
- :pushpin: Update Profile `/update-profile`

## How to start the the backend server?

- :pushpin: First you must install all dependencies included in the **package.json** file by typing `npm install` in a **terminal**. Then you must **start the server**  by typing `npm run dev` in the **terminal** in the **root**.

After that the server will run on http:/localhost:3000 URL.

## How to start the the frontend?

- :pushpin: Firstly you must install all dependencies included in the **package.json** file **my-app** by firstly typing `cd .\my-app\` and tnen `npm install` in the same **folder**. Then you must **start the server**  by typing `npm start` in the **terminal** in the **my-app**. The frontend will be running on http:/localhost:3001 URL.
- :pushpin: For the link between the server and the frontend, you need to add the link for the frontend in the **cors** integration in the **backend**. Next you should add for every fetch in the code the developer link for the backend for the fetching to work.
- :pushpin: Backend cors integration
  
  ![image](https://github.com/sNOBODYs/SutairuShop/assets/80042389/78b90f1d-8f79-4432-be1a-385ee2073bda)
  
- :pushpin: Frontend fetch

  ![image](https://github.com/sNOBODYs/SutairuShop/assets/80042389/c0de782c-1130-43f7-a40f-ea44cf6fd343)

## Executing the Tests

Before running the test suite, make sure a **backend server** is **operational**, and the application can be found at the **root** of its **network address**. To **start**  the included **dev-server**, open a **terminal** in the folder containing **package.json** and execute: `npm run dev`

This is a one-time operation unless you **terminate** the **server** at any point. It can be **restarted** with the same command as above. To **execute** the **test**, open a new terminal (do not close the terminal, running the web server instance) in the folder containing **package.json** and execute: `npm run test`

**Test result** will be desplayed in the **terminal**, along detailed information about encountered problems. 
You can perform this operation as many times as it is necessary by re-running the above command.

![image](https://github.com/sNOBODYs/SutairuShop/assets/80042389/c802fa8c-85b8-4999-85cb-db51d9ad79ea)
