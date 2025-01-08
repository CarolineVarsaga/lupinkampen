import { badWords } from "../../../models/badWords";

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex =
  /^(?=.*[a-zåäö])(?=.*\d)[A-Za-zåäöÅÄÖ\d@$!%*?&-]{8,}$/;

export const validateUsername = (username: string): string => {
  const isBadWord = badWords.some((badWord) =>
    username.toLowerCase().includes(badWord.toLowerCase())
  );
  if (isBadWord) {
    return "Användarnamnet är olämpligt. Vänligen välj ett annat namn.";
  }
  return "";
};
