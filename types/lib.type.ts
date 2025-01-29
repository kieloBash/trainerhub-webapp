import { Sport, User } from "@prisma/client";

export type UserType = User & {
  sport?: SportType;
};
export type SportType = Sport & {};
export type SessionType = Sport & {};
