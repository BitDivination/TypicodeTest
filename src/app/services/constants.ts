import { InjectionToken, Provider } from "@angular/core";

/**
 * Abstract out the API Base to a constant to be injected into each of the API Domain services instances
 */
export const API_BASE: InjectionToken<string> = new InjectionToken<string>("apiBaseUrl");
export const API_BASE_PROVIDER: Provider = { provide: API_BASE, useValue: "https://jsonplaceholder.typicode.com" };