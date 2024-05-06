## Outpost

> **Warning**
> This app is a work in progress and shouldn't be considered production ready. It uses new technologies that are yet to be stable such as Server Actions and Drizzle ORM.

## About

Online marketplace built using Next.js App Router, which allows users to purchase products, sign up and list their own products for sale. Users can create a seller profile, manage products and collect payment.

Key features:

- Next.js App Router with React Server Components
- Intercepted routes (with parallel routing) for product quick view and new product creation in admin
- Server Actions for mutations
- Planetscale MySQL database with Drizzle ORM
- UploadThing for typesafe file uploads (e.g., product images)
- User authentication with Clerk
- Stripe Connect integration for marketplace payments (including platform fees and seller payouts)

## Demo

To demo the checkout experience, checkout with a test card number such as `4242 4242 4242 4242` and use any future date for the expiration and any 3 digits for the CVC. You will only be able to checkout with products from sellers that have a Stripe account connected to their store (such as [Toy Box](https://outpost.mechanikadesign.com/products?seller=toy-box)). You can also create your own seller account and connect it to Stripe for the full experience.

> **Note**
> Live demo no longer works as Planetscale dropped their free tier for mySQL hosting. I've yet to migrate to a new platform.

![outpost_homepage_1](https://github.com/warrengalyen/Outpost/assets/16408188/b3ac5e3f-0319-4077-9993-0bbc94be683e)
![outpost_homepage_2](https://github.com/warrengalyen/Outpost/assets/16408188/36889fc0-dd31-4075-aa21-65b2c7b89078)

## Running the app

Follow the below steps to run the app locally:

1. Create a database in PlanetScale.
2. Create a local `.env` file with the variables as per the `.env.example` file.
3. Run `npm install`.
4. Generate a migration with `npx drizzle-kit generate:mysql`. This creates a new folder called `migrations-folder` in the root which contains the SQL queries to create the database tables. Migrations are automatically synced with the database through the migration function in `db.ts`. Alternatively, you can run the generated SQL queries from the migration manually through the PlanetScale console and remove the migration function in `db.ts`.
5. Run `npm run dev` to open the app in development mode.

That's it. You should now be able to access the app at `http://localhost:3000`.

### Notes

- When generating the migration for the first time with Drizzle, ensure that the `migrations-folder` in the root is empty or doesn't exist.

### Storybook

Storybook has been added to this app, however, hasn't been actively worked on since the initial creation of the app. Regardless, it can be ran using the following commands:

1. Run the tailwind build script to create an output file for tailwind classes (after it's ran and completed, you may have to 'kill' the terminal (ie `ctrl + c`) to stop the process if it doesn't automatically stop).

   `npm run tailwind`

2. Run Storybook (this will use the tailwind output file created in the previous step and run on `http://localhost:6006`)

   `npm run storybook`

## Troubleshooting

If you see an error relating to a table not existing in PlanetScale (likely being thrown in `app/(storefront)/(main)/page.tsx` as this is the first use of the database), this is due to the database not being in sync. Revisit the 'running the app' steps above and check the 'Insights' tab in PlanetScale to check that table creation queries have ran.
