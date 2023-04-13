# CS52 SA2: Vite My Mouse!

[deployed url](https://vite-my-mouse.onrender.com/)

## Env Description

I set up a project (from scratch)
and configured Vite to bundle the project.
I then configured ESLint to detect linting errors and automatically
fix them on save, as well as Sass for website styling.
Overall, everything went smoothly.

> **Note**
> 
> I set up my repositories in a folder (call it `workspace`).
> My vite project initially wouldn't run, and I discovered
> it was because the repository's parent directory had an empty
> `package.json` file.
> Is this always an issue, and if so &mdash;
> is there ever a way to tell `vite` not to look beyond the current directory
> (going "up" the directory structure)?
>
> I can see a scenario where we do _not_ want the parent's configurations,
> if any, interfering with our configurations.

## What Worked Well

Vite! :zap:

## What Didn't

Nothing

## Extra Credit

I tried to deploy to Heroku but it wanted permission
to _all_ repositories in the organization.
I don't think that's a good idea.

## Screenshots

### Base 

![vite site](assets/vite-image.png)

### Slightly nicer visual design

![nicer-design](assets/nicer-design.png)
