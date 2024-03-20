import { z } from "zod";
import { MovieDataSchema } from "../components/types";

type Response<Type> =
  | {
      success: true;
      status: number;
      data: Type;
    }
  | {
      success: false;
      status: number | null;
    };

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export const safeFetch = async <Schema extends z.ZodTypeAny>(config: {
  method: Method;
  url: string;
  schema: Schema;
  payload?: any;
}): Promise<Response<z.infer<typeof config.schema>>> => {
  const { method, url, schema, payload } = config;
  try {
    const response = await fetch(url, {
      method,
      headers: payload
        ? {
            "Content-Type": "application/JSON",
          }
        : {},
      body: payload ? JSON.stringify(payload) : undefined,
    });
    if (response.status >= 500)
      return { success: false, status: response.status };
    if (response.status >= 400)
      return { success: false, status: response.status };

    const data = await response.json();
    const result = schema.safeParse(data);
    console.log("boiler4");
    console.log(data);
    console.log(data);
    if (!result.success) {
      console.log(result.error);
      return { success: false, status: response.status };
    }
    console.log(response.status);
    return { data: result.data, success: true, status: response.status };
  } catch (error) {
    return { success: false, status: null };
  }
};

export const getMovies = () =>
  safeFetch({
    method: "GET",
    url: `http://localhost:7000/api/movies`,
    schema: MovieDataSchema,
  });
