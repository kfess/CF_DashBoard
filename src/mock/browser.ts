import { setupWorker } from "msw";
import { handlers } from "@mock/handlers";

export const worker = setupWorker(...handlers);
