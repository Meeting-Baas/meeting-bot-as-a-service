import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const baasApiKeyAtom = atomWithStorage('baasApiKey', "");
export const openAIApiKeyAtom = atomWithStorage('openAIApiKey', "");

export const serverAvailablityAtom = atom<"server" | "local" | "error">("error");

export const meetingsAtom = atomWithStorage<{ bot_id: string, name: string, attendees: string[], createdAt: Date; }[]>('meetings', []);