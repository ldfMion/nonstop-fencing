from dataclasses import dataclass


@dataclass
class PartialScores:
    foil: int
    epee: int
    saber: int


@dataclass
class MatchSide:
    name: str
    overall: int
    partials: PartialScores


@dataclass
class Match:
    side_A: MatchSide
    side_B: MatchSide
