import {writable} from "svelte/store";

// Personal Information
export const storedName = writable("");
export const storedEmail = writable("");
export const storedPhoneNumber = writable("");

// Plan
export const storedPlan = writable("arcade");
export const storedYearly = writable(true);

// Addons
export const storedAddons = writable([])