import 'server-only';
import {cache} from "react";
import {updateSession, verifySession} from "@/lib/session";
import {env} from "@/env";
import {cookieGenerator} from "@/lib/utils";
import {handleError} from "@/lib/error";

export function fetchAction<T>(url: string, errorMessage?: string, options?: {
  queryParams?: {
    [key: string]: unknown;
  }, bodyObject?: {
    [key: string]: unknown;
  },
  method?: "GET" | "POST" | "PUT" | "DELETE",
  logResponse?: boolean,
  logData?: boolean,
}): () => Promise<T> {
  return cache(async () => {
    const {
      queryParams,
      bodyObject,
      logResponse = false,
      logData = false,
      method = bodyObject ? "POST" : "GET"
    } = options ?? {};
    try {
      const {refresh_token, access_token, userId} = await verifySession();

      let fetchUrl = url.replace(':userId', userId);

      if (queryParams) {
        fetchUrl += '?';
        for (const key in queryParams) {
          fetchUrl += `${key}=${queryParams[key]}&`;
        }
        fetchUrl = fetchUrl.slice(0, -1);
      }

      const res = await fetch(
        env.API_URL + fetchUrl,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookieGenerator(access_token, refresh_token),
          },
          body: bodyObject ? JSON.stringify(bodyObject) : undefined,
        }
      );

      {
        logResponse && console.log(res);
      }

      const {error, data} = await res.json();
      if (!res.ok || error) {
        return handleError(error);
      }

      void updateSession(res); // update session in case the token is refreshed

      {
        logData && console.log(data);
      }

      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error(errorMessage ?? 'Failed to fetch data');
    }
  })
};