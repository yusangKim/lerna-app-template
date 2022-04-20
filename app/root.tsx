import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData
} from "@remix-run/react";
import { useEffect } from "react";
import packageJson from "../package.json";
import styles from "./styles/tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function loader() {
  return {
    ENV: {
      API_ENDPOINT: process.env.API_ENDPOINT,
      OAUTH_REFRESH_TOKEN_ENDPOINT: process.env.OAUTH_REFRESH_TOKEN_ENDPOINT,
      LOGIN_PATH: process.env.LOGIN_PATH
    }
  };
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: `Admin V2: ${packageJson.name.split("-")[1].toUpperCase()}`,
  viewport: "width=device-width,initial-scale=1"
});


export function CatchBoundary() {
  const caught = useCatch();

  useEffect(() => {
    if (caught.status === 404) {
      window.location.href = window.location.pathname;
    }
  }, [caught]);

  if (caught.status === 404) return null;
  return (
    <html> <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
