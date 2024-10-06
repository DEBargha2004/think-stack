import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ActionError = { error: string };
export type DefaultActionResponse = { message: string };
export type ServerActionResponse<T = DefaultActionResponse> =
  | ActionError
  | undefined
  | T;

export function isActionError(
  error: ServerActionResponse<any>,
): error is ActionError {
  return Boolean(error && "error" in error && error?.error);
}
