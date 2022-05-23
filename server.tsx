import application, {
  h,
  response,
} from "https://deno.land/x/fastro@v0.59.0/server/mod.ts";
import ssr from "https://deno.land/x/fastro@v0.59.0/server/ssr.ts";
import App from "./app.tsx";
import Hello from "./hello/app.tsx";

const appPage = ssr(<App />);
const helloPage = ssr(<Hello />).dir("./hello");

const app = application()
  .static("/static")
  .page("/", appPage, () => {
    return response()
      .ssr(appPage)
      .title("Hello world")
      .meta(`name="viewport" content="width=device-width"`)
      .render();
  })
  .page("/hello", helloPage, (req: Request) => {
    return response(req)
      .ssr(helloPage)
      .title("Click me")
      .meta(`charset="utf-8"`)
      .meta(`name="viewport" content="width=device-width"`)
      .script(`(function (){console.log("hello")})();`)
      .style(`body {background-color: powderblue;}`)
      .render();
  });

console.log("Listening on: http://localhost:8000");

await app.serve();
