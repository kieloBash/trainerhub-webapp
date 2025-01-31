import { Sport, TrainerProfile, User, UserProfile } from "@prisma/client";

export type UserType = User & {
  trainee: TraineeProfileType;
  trainer: TrainerProfileType;
};

export type TraineeProfileType = UserProfile & {
  sport: SportType;
};
export type TrainerProfileType = TrainerProfile & {
  sport: SportType;
};
export type SportType = Sport & {};
export type SessionType = Sport & {};
