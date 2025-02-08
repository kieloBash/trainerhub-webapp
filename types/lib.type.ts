import { Sport, TrainerProfile, User, UserProfile } from "@prisma/client";

export type UserType = User & {
  trainee: TraineeProfileType;
  trainer: TrainerProfileType;
};

export type TraineeProfileType = UserProfile & {
  sports: SportType[];
};
export type TrainerProfileType = TrainerProfile & {
  sports: SportType[];
};
export type SportType = Sport & {};
export type SessionType = Sport & {};
