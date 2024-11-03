import { defineFunction } from "@aws-amplify/backend";

export const contactFormFunction = defineFunction({
  name: "contactformfunction",
  entry: "./handler.ts"
});
