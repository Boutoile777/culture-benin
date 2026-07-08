import type { PlaceGuessChallenge } from "@/domain/entities/PlaceGuessChallenge";

export interface PlaceGuessRepository {
  getChallenges(): Promise<PlaceGuessChallenge[]>;
}
