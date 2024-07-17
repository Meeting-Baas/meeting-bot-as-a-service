import { RecordingInfo, ServerAvailability } from "@/lib/utils";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Define the API key atoms
export const baasApiKeyAtom = atomWithStorage("baasApiKey", "");
export const openAIApiKeyAtom = atomWithStorage("openAIApiKey", "");
export const gladiaApiKeyAtom = atomWithStorage("gladiaApiKey", "");

// Define the server availability atom, useful not to call the API
// too many times, for instance table storage view
export const serverAvailabilityAtom = atom<ServerAvailability>("error");

// Define the meetings atom with storage
export const meetingsAtom = atomWithStorage<RecordingInfo[]>("meetings", []);
