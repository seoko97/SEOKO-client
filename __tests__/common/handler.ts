import { HttpResponse, http } from "msw";

const handlers = {
  getUserSuccess: http.get("http://localhost:4000/api/users", () => {
    return HttpResponse.json({ username: "John Doe" });
  }),
  getUserFailed: http.get("http://localhost:4000/api/users", () => {
    return HttpResponse.json({ username: null });
  }),
};

const handlerArray = Object.values(handlers);

export { handlers, handlerArray };
