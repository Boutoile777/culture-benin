export interface PlaceGuessOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface PlaceGuessChallenge {
  id: string;
  image: string;
  options: PlaceGuessOption[];
}
