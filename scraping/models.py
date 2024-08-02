from dataclasses import dataclass
import datetime


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
    date: datetime.date
    host: str
